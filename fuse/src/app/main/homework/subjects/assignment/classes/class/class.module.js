(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class',
      ['app.homework.subjects.assignment.classes.class.exercises',
        'app.homework.subjects.assignment.classes.class.teaching-progress',
        'app.homework.subjects.assignment.classes.class.videos',
          'app.homework.subjects.assignment.classes.class.consolidated-report',
          'app.homework.subjects.assignment.classes.class.students'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assignment.classes.class', {
        abstract: true,
        url: '/:classId',
        ncyBreadcrumb: {
          label: 'Class {{breadcrumbs.class.c_name}}',
        },
      });
  }
})();
