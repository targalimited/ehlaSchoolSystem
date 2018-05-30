(function () {
  'use strict';

  angular
    .module('app.pilot.choose-items', [
			'app.pilot.choose-items.choose-items-detail'
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.pilot.choose-items', {
        url: '/choose-items',
        views: {
          'content@app': {
            templateUrl: 'app/main/pilot/choose-items/choose-items.html',
            controller: 'ChooseItemsController as vm'
          }
        },
        resolve: {
        },
        ncyBreadcrumb: {
          label: 'Choose Items'
        },
        authenticate: true,
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/pilot/choose-items');
  }
})();
