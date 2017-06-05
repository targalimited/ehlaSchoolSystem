(function () {
  'use strict';

  angular
    .module('app.settings.curriculums', ['app.settings.curriculums.curriculum'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.settings.curriculums', {
        url: '/:academicId/curriculums',
        views: {
          'content@app': {
            templateUrl: 'app/main/settings/curriculums/curriculums.html',
            controller: 'CurriculumsController as vm'
          }
        },
        ncyBreadcrumb: {
          label: 'Curriculums'
        },
        authenticate: true,
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/settings/curriculums');
  }
})();
