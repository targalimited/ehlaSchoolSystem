(function () {
  'use strict';

  angular
    .module('fuse')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $timeout, $interval, $translate, $state) {

    $(document).ready(function(){
      $interval(adjustBreadcrumbWidth, 1000);
    });
    function adjustBreadcrumbWidth() {
      // revamp: calculate each block width and decide if show the ellipsis block
      var bWidth = $('.breadcrumb-wrapper').outerWidth();
      var homeWidth = $('.breadcrumb-home').outerWidth(true);
      var menu = $('.breadcrumb-skip-menu');
      var menuWidth = menu.outerWidth(true);
      bWidth -= homeWidth + menuWidth;
      // var length = $('.breadcrumb > span.br-item').length;
      // console.log('bWidth', bWidth);
      var elements = [];
      var skippedMenuItem = [];
      $('.breadcrumb > span.br-item').each(function () {
        elements.push({
          element: $(this),
          width: $(this).outerWidth(true)
        });
      })
      var isShowSkipMenu = false;
      _.each(_.reverse(elements), function (e) {
        bWidth -= e.width;
        // console.log('m width', bWidth);
        if (bWidth <= 0) {
          e.element.is(':visible') && e.element.hide();
          var anchor = e.element.find('a');
          skippedMenuItem.push({
            href: !anchor.attr('disabled') ? anchor.attr('href') : '',
            text: e.element.find('a div').text()
          });
          isShowSkipMenu = true;
        } else {
          !e.element.is(':visible') && e.element.show();
        }
      });

      if (isShowSkipMenu) {
        !menu.is(':visible') && menu.show();
      } else {
        menu.is(':visible') && menu.hide();
      }

      $rootScope.$broadcast('$breadcrumbMenuResize', skippedMenuItem);
    }

    try {
      $rootScope.user = JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      console.log(e);
    }

    // Activate loading indicator
    var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      $rootScope.loadingProgress = true;

      var accessToken = localStorage.getItem('access_token');
      console.log(accessToken, toState)
      if (!accessToken && (toState.authenticate || _.isUndefined(toState.authenticate))) {
        $timeout(function () {
          $rootScope.loadingProgress = false;
          $state.go('app.login');
        });
      } else if (accessToken && toState.name === 'app.login') {
        $timeout(function () {
          $rootScope.loadingProgress = false;
          $state.go('app.home')
        });
      }
    });

    // De-activate loading indicator
    var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function () {
      $timeout(function () {
        $rootScope.loadingProgress = false;
        $rootScope.language = $translate.use();
        console.log('language', $rootScope.language);
      });
    });

    // Store state in the root scope for easy access
    $rootScope.state = $state;

    // Cleanup
    $rootScope.$on('$destroy', function () {
      stateChangeStartEvent();
      stateChangeSuccessEvent();
    });

    $rootScope.isOfRoles = function (roleNames) {
      // console.log($rootScope.user)
      //$rootScope.user.userGroup.title = 'Teacher'
      return _.some(roleNames, function (roleName) {
        return $rootScope.user.userGroup.title === roleName;
      });
    }
  }
})();
