(function () {
  'use strict';

  angular
    .module('app.pilot.english.category', [
      'ui.tree',
			'app.pilot.english.category.item'
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider) {
    // State
    $stateProvider
      .state('app.pilot.english.category', {
        url: '/category/:classId/:categoryId',
        views: {
          'content@app': {
            templateUrl: 'app/main/pilot/english/category/category.html',
            controller: 'CategoryController as vm'
          }
        },
        ncyBreadcrumb: {
          label: 'category',
        },
        authenticate: true,
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/pilot/english/category');
  }
})();