(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.consolidated-report.weakness', ['app.homework.subjects.assignment.classes.class.consolidated-report.weakness.students'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assignment.classes.class.consolidated-report.weakness', {
        abstract: true,
        url: '/weaknesses/:weaknessId',
        ncyBreadcrumb: {
          label: '{{breadcrumbs.weakness.truncatedName}}',
        },
      });
  }
})();
