(function () {
  'use strict';

  angular
    .module('fuse')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $timeout, $state) {
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
