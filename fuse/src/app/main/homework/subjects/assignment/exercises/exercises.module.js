(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.exercises', ['app.homework.subjects.assignment.exercises.exercise', 'datatables'])
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
      })
      .state('app.homework.subjects.assignment.classes.class', {
        abstract: true,
        url: '/:class',
        ncyBreadcrumb: {
          label: 'Class {{breadcrumbs.class}}',
        },
      })
      .state('app.homework.subjects.assignment.classes.class.exercises', {
        url: '/exercises',
        views: {
          'content@app': {
            templateUrl: 'app/main/homework/subjects/assignment/exercises/exercises.html',
            controller: 'ExercisesController as vm'
          }
        },
        resolve: {
          ExercisesData: function (msApi) {
            return msApi.resolve('exercises@get');
          },
          state: function ($state) {
            return $state;
          },
        },
        ncyBreadcrumb: {
          label: 'Exercises',
        },
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment/exercises');

    // Api
    msApiProvider.register('exercises', ['app/data/exercises/exercises.json']);
  }
})();
