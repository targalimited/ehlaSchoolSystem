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
        authenticate: true,
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
      weight: 6,
      hidden: function () {
        try {
          var user = JSON.parse(localStorage.getItem('user'));
          //user.userGroup.title = 'Principal'
          //console.log(user.userGroup.title)
          return _.some(user.roles, function (role) {
            return role.name === 'Teacher';
          })
        } catch (e) {
          return true;
        }
      }
    });

    msNavigationServiceProvider.saveItem('fuse.settings.academic-year', {
      title: 'Academic Year',
      translate: 'SETTINGS.ACADEMIC_YEAR_NAV',
      state: 'app.settings.academic-year',
    });
    /*msNavigationServiceProvider.saveItem('fuse.settings.levels', {
      title: 'Levels',
      state: 'app.settings.levels',
    });*/
    msNavigationServiceProvider.saveItem('fuse.settings.subjects', {
      title: 'Subjects',
      translate: 'SETTINGS.SUBJECTS_NAV',
      state: 'app.settings.subjects',
    });
    msNavigationServiceProvider.saveItem('fuse.settings.classes', {
      title: 'Classes',
      translate: 'SETTINGS.CLASSES_NAV',
      state: 'app.settings.classes',
    });
  }
})();
