(function () {
  'use strict';

  angular
    .module('app.settings.academic-year', ['app.settings.academic-year.curriculums'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.settings.academic-year', {
        url: '/academic-year',
        views: {
          'content@app': {
            templateUrl: 'app/main/settings/academic-year/academic-year.html',
            controller: 'AcademicYearController as vm'
          }
        },
        resolve: {
          breadcrumbs: function (breadcrumb, $stateParams) {
            return breadcrumb.getBreadCrumbs($stateParams);
          },
        },
        ncyBreadcrumb: {
          label: 'Academic Year'
        },
        authenticate: true,
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/settings/academic-year');
  }
})();
