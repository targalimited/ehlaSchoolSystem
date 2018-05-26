(function () {
  'use strict';

  angular
    .module('app.users.user', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.users.user', {
        url: '/:userId',
        views: {
          'content@app': {
            templateUrl: 'app/main/users/user/user.html',
            controller: 'UserController as vm'
          }
        },
        resolve: {
          breadcrumbs: function (breadcrumb, $stateParams) {
            return breadcrumb.getBreadCrumbs($stateParams);
          },
        },
        authenticate: true,
        ncyBreadcrumb: {
          label: '{{action}}'
        },
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/users/user');
    
  }
})();
