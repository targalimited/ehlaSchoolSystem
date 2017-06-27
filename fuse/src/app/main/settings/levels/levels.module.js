(function () {
  'use strict';

  angular
    .module('app.settings.levels', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.settings.levels', {
        url: '/levels',
        views: {
          'content@app': {
            templateUrl: 'app/main/settings/levels/levels.html',
            controller: 'LevelsController as vm'
          }
        },
        resolve: {
          breadcrumbs: function (breadcrumb, $stateParams) {
            return breadcrumb.getBreadCrumbs($stateParams);
          },
        },
        ncyBreadcrumb: {
          label: 'Levels'
        },
        authenticate: true,
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/settings/levels');
  }
})();
