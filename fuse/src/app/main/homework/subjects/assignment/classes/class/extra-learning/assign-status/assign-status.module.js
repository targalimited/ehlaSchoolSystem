(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.extra-learning.assign-status',
      ['app.homework.subjects.assignment.classes.class.extra-learning.assign-status.learning-detail'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assignment.classes.class.extra-learning.assign-status', {
        abstract: true,
        url: '/:assignStatus',
        ncyBreadcrumb: {
          label: '{{breadcrumbs.assignStatus === "unassigned" ? "To Assign" : "Assigned"}}',
        },
      });
  }
})();
