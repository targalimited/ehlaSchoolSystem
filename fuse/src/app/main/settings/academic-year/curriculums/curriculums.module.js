(function () {
  'use strict';

  angular
    .module('app.settings.academic-year.curriculums', ['app.settings.academic-year.curriculums.curriculum'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.settings.academic-year.curriculums', {
        url: '/:academicId/curriculums',
        views: {
          'content@app': {
            templateUrl: 'app/main/settings/academic-year/curriculums/curriculums.html',
            controller: 'CurriculumsController as vm'
          }
        },
        ncyBreadcrumb: {
          label: 'Curriculums'
        },
        authenticate: true,
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/settings/academic-year/curriculums');
  }
})();
