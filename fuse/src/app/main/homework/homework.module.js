(function () {
  'use strict';

  angular
    .module('app.homework', ['app.homework.subjects'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.homework', {
        url: '/homework',
        views: {
          'content@app': {
            templateUrl: 'app/main/homework/homework.html',
            controller: 'HomeworkController as vm'
          }
        },
        ncyBreadcrumb: {
          label: '{{ "HOMEWORK1.HOMEWORK_NAV" | translate }}'
        },
        authenticate: true,
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/homework');


    // Navigation

    msNavigationServiceProvider.saveItem('fuse.homework', {
      title: 'Homework',
      icon: 'icon-book-open',
      state: 'app.homework',
      /*stateParams: {
       'param1': 'page'
       },*/
      translate: 'HOMEWORK1.HOMEWORK_NAV',
      weight: 2
    });
  }
})();
