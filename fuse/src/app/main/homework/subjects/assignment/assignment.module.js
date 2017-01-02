(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment', ['app.homework.subjects.assignment.exercises'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assignment', {
        url: '/:subject/assignment',
        views: {
          'content@app': {
            templateUrl: 'app/main/homework/subjects/assignment/assignment.html',
            controller: 'AssignmentController as vm'
          }
        },
        resolve: {
          AssignmentData: function (msApi) {
            return msApi.resolve('assignment@get');
          },
        },
        ncyBreadcrumb: {
          label: '{{breadcrumbs.subject}}'
        },
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment');

    // Api
    msApiProvider.register('assignment', ['app/data/assignment/assignment.json']);
  }
})();
