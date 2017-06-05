(function () {
  'use strict';

  angular
    .module('app.settings.curriculums.curriculum',
      ['app.settings.curriculums.curriculum.subjects'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.settings.curriculums.curriculum', {
        abstract: true,
        url: '/:curriculum',
          ncyBreadcrumb: {
              label: '{{breadcrumbs.curriculum}}'
          },
      });
  }
})();
