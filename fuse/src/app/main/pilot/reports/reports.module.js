(function () {
  'use strict';

  angular
    .module('app.pilot.reports', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.pilot.reports', {
        url: '/reports',
        views: {
          'content@app': {
            templateUrl: 'app/main/pilot/reports/reports.html',
            controller: 'ReportsController as vm'
          }
        },
        resolve: {
          breadcrumbs: function (breadcrumb, $stateParams) {
            return breadcrumb.getBreadCrumbs($stateParams);
          },
        },
        ncyBreadcrumb: {
          label: 'Reports'
        },
        authenticate: true,
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/pilot/reports');
  }
})();
