(function () {
  'use strict';

  angular
    .module('app.reports.class',
      ['app.reports.class.weakness'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.reports.class', {
        abstract: true,
        url: '/classes/:classId',
        ncyBreadcrumb: {
          label: 'Class {{breadcrumbs.class.c_name}}',
        },
      });
  }
})();
