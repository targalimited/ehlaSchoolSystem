(function () {
  'use strict';

  angular
    .module('app.settings', [
      'app.settings.academic-year',
      'app.settings.levels',
      'app.settings.subjects',
      'app.settings.classes',
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.settings', {
        url: '/settings',
        ncyBreadcrumb: {
          label: 'Settings'
        },
        abstract: true,
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/settings');


    // Navigation

    msNavigationServiceProvider.saveItem('fuse.settings', {
      title: 'Settings',
      icon: 'icon-cog',
      /*stateParams: {
       'param1': 'page'
       },*/
      translate: 'SETTINGS.SETTINGS_NAV',
      weight: 6
    });

    msNavigationServiceProvider.saveItem('fuse.settings.academic-year', {
      title: 'Academic Year',
      state: 'app.settings.academic-year',
    });
    msNavigationServiceProvider.saveItem('fuse.settings.levels', {
      title: 'Levels',
      state: 'app.settings.levels',
    });
    msNavigationServiceProvider.saveItem('fuse.settings.subjects', {
      title: 'Subjects',
      state: 'app.settings.subjects',
    });
    msNavigationServiceProvider.saveItem('fuse.settings.classes', {
      title: 'Classes',
      state: 'app.settings.classes',
    });
  }
})();
