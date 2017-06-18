(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.videos.video-weakness',
      ['app.homework.subjects.assignment.classes.class.videos.video-weakness.video-progress'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assignment.classes.class.videos.video-weakness', {
        abstract: true,
        url: '/weakness/:weaknessId',
        ncyBreadcrumb: {
          label: '{{breadcrumbs.weakness.truncatedName}}',
        },
      });
  }
})();


