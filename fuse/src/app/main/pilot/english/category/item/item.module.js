(function () {
  'use strict';

  angular
    .module('app.pilot.english.category.item', [
      'ui.tree',
		])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider) {
    // State
    $stateProvider
      .state('app.pilot.english.category.item', {
        url: '/item/:itemId',
        views: {
          'content@app': {
            templateUrl: 'app/main/pilot/english/category/item/item.html',
            controller: 'ItemController as vm'
          }
        },
        ncyBreadcrumb: {label: 'Item'},
        authenticate: true,
      });

  }
})();

