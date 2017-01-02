(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.exercises.exercise', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assignment.classes.class.exercises.exercise', {
        url: '/:exerciseId',
        views: {
          'content@app': {
            templateUrl: 'app/main/homework/subjects/assignment/exercises/exercise/exercise.html',
            controller: 'ExerciseController as vm'
          }
        },
        resolve: {
          ExerciseData: function (msApi) {
            return msApi.resolve('exercise@get');
          },
          state: function ($state) {
            return $state;
          },
        },
        ncyBreadcrumb: {
          label: '{{breadcrumbs.exercise}}',
        },
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment/exercises/exercise');

    // Api
    msApiProvider.register('exercise', ['app/data/exercise/exercise.json']);
  }
})();
