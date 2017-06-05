(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes', ['app.homework.subjects.assignment.classes.class'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assignment.classes', {
        abstract: true,
        url: '/classes',
        ncyBreadcrumb: {
          label: 'Classes',
          skip: true,
        }
      });
  }
})();
