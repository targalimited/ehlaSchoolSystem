(function () {
  'use strict';

  angular
    .module('app.reports.class.weakness',
      ['app.reports.class.weakness.students'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.reports.class.weakness', {
        abstract: true,
        url: '/weaknesses/:weaknessId',
        ncyBreadcrumb: {
          label: 'Weakness {{breadcrumbs.weakness.name}}',
        },
      });
  }
})();
