(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.extra-learning.assign-status.learning-detail',
      ['app.homework.subjects.assignment.classes.class.extra-learning.assign-status.learning-detail.learning-setting'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assignment.classes.class.extra-learning.assign-status.learning-detail', {
        abstract: true,
        url: '/:learningId',
        ncyBreadcrumb: {
          label: '{{breadcrumbs.learningDetail["name_" + language]}}',
        },
      });
  }
})();
