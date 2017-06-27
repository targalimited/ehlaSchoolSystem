(function () {
  'use strict';

  angular
    .module('app.settings.academic-year.curriculums.curriculum',
      ['app.settings.academic-year.curriculums.curriculum.subjects'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.settings.academic-year.curriculums.curriculum', {
        abstract: true,
        url: '/:curriculum',
          ncyBreadcrumb: {
              label: '{{breadcrumbs.curriculum}}'
          },
      });
  }
})();
