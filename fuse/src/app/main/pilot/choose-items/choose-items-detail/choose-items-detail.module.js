(function () {
  'use strict';

  angular
    .module('app.pilot.choose-items.choose-items-detail', [
		])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider) {
    // State
    $stateProvider
      .state('app.pilot.choose-items.choose-items-detail', {
        url: '/type/:catGrouper',
        views: {
          'content@app': {
            templateUrl: 'app/main/pilot/choose-items/choose-items-detail/choose-items-detail.html',
            controller: 'ChooseItemsDetailController as vm'
          }
        },
        ncyBreadcrumb: {label: 'ChooseItemsDetail'},
        authenticate: true,
      });

  }
})();

