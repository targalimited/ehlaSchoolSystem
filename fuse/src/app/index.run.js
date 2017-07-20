(function () {
  'use strict';

  angular
    .module('fuse')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $timeout, $translate, $state) {
    $(document).ready(function(){
      $(window).resize(function() {
        // revamp: calculate each block width and decide if show the ellipsis block

        var bWidth = $('.breadcrumb-wrapper').outerWidth();
        var length = $('.breadcrumb > span.br-item').length;
        console.log('bWidth', bWidth, 'length', length);
        _.each(_.range(0, 20), function (numOfItems) {
          var padding = 250;
          var lower = numOfItems * 170 + padding;
          var upper = (numOfItems + 1) * 170 + padding;
          if (bWidth >= lower && bWidth < upper && length > numOfItems + 1) {
            $('.breadcrumb > span:not(.breadcrumb-home)').hide();
            $('.breadcrumb .breadcrumb-skip-menu').show();
            $('.breadcrumb > span.br-item:nth-last-child(-n+' + (numOfItems + 1) + ')').show();
          }
        });
      });

      // on breadcrumb element br-item created or removed, re-render
      // elList.addEventListener('DOMNodeInserted', updateCount, false);
      // elList.addEventListener('DOMNodeRemoved', updateCount, false);

    });

    try {
      $rootScope.user = JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      console.log(e);
    }

    // Activate loading indicator
    var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      $rootScope.loadingProgress = true;

      var accessToken = localStorage.getItem('access_token');
      if (!accessToken && toState.authenticate) {
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
  }
})();
