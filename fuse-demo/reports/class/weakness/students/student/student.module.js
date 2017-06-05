(function () {
  'use strict';

  angular
    .module('app.reports.class.weakness.students.student',
      ['app.reports.class.weakness.students.student.report'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.reports.class.weakness.students.student', {
        abstract: true,
        url: '/:studentId',
        ncyBreadcrumb: {
          label: '{{breadcrumbs.student.name}}',
        },
      });
  }
})();
