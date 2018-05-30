(function () {
  'use strict';

  angular
    .module('app.pilot', 
			['app.pilot.choose-items',
			'app.pilot.english',
			'app.pilot.reports',
		])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.pilot', {
        url: '/pilot',
        ncyBreadcrumb: {
          label: 'Pilot 100'
        },
        abstract: true,
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/pilot');


    // Navigation
    msNavigationServiceProvider.saveItem('fuse.pilot', {
      title: 'Pilot',
      icon: 'icon-star',
      translate: 'PILOT.PILOT_NAV',
      weight: 2
    });
    msNavigationServiceProvider.saveItem('fuse.pilot.english', {
      title: 'English',
      state: 'app.pilot.english',
			/*stateParams: {
       'subject': 'english'
       },*/
      translate: 'PILOT.ENGLISH_NAV',
    });		

    msNavigationServiceProvider.saveItem('fuse.pilot.choose-items', {
      title: 'Choose Items',
      state: 'app.pilot.choose-items',
      translate: 'PILOT.CHOOSE_ITEMS_NAV',
    });

    msNavigationServiceProvider.saveItem('fuse.pilot.reports', {
      title: 'Report',
      state: 'app.pilot.reports',
      translate: 'PILOT.REPORT_NAV',
    });
  }
})();
