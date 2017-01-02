(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assessment', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assessment', {
        url: '/:subject/assessment',
        views: {
          'content@app': {
            templateUrl: 'app/main/homework/subjects/assessment/assessment.html',
            controller: 'AssessmentController as vm'
          }
        },
        resolve: {
          AssessmentData: function (msApi) {
            return msApi.resolve('assessment@get');
          },
          state: function ($state) {
            return $state;
          },
        },
        ncyBreadcrumb: {
          label: 'Assessment',
        },
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assessment');

    // Api
    msApiProvider.register('assessment', ['app/data/assessment/assessment.json']);
  }
})();
