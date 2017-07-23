(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.consolidated-report.consolidated-report-weakness', ['app.homework.subjects.assignment.classes.class.consolidated-report.consolidated-report-weakness.student-report'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assignment.classes.class.consolidated-report.consolidated-report-weakness', {
        abstract: true,
        url: '/weaknesses/:weaknessId',
        ncyBreadcrumb: {
          label: '{{breadcrumbs.weakness["name_" + breadcrumbs.language]}}',
        },
      });
  }
})();
