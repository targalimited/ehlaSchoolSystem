(function () {
  'use strict';

  angular
    .module('app.settings.curriculums.curriculum.subjects.subject',
      ['app.settings.curriculums.curriculum.subjects.subject.level-setting'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.settings.curriculums.curriculum.subjects.subject', {
        abstract: true,
        url: '/:subjectId',
          ncyBreadcrumb: {
              label: '{{breadcrumbs.subject.s_name_en}}'
          },
      });
  }
})();
