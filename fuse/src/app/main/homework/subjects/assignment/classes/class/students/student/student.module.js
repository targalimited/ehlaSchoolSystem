(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.students.student',
      ['app.homework.subjects.assignment.classes.class.students.student.report'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assignment.classes.class.students.student', {
        abstract: true,
        url: '/:studentId',
        ncyBreadcrumb: {
          label: '{{breadcrumbs.student.name}}',
        },
      });
  }
})();
