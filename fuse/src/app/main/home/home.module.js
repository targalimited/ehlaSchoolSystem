(function () {
  'use strict';

  angular
    .module('app.home', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.home', {
        url: '/home',
        views: {
          'content@app': {
            templateUrl: 'app/main/home/home.html',
            controller: 'HomeController as vm'
          }
        },
        resolve: {
          HomeData: function (msApi) {
            return msApi.resolve('home@get');
          }
        }
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/home');

    // Api
    msApiProvider.register('home', ['app/data/home/home.json']);

    // Navigation
    msNavigationServiceProvider.saveItem('fuse', {
      group: true,
      weight: 1,
      hidden: true,
    });
    msNavigationServiceProvider.saveItem('fuse.home', {
      title: 'Home',
      icon: 'icon-home',
      state: 'app.home',
      /*stateParams: {
       'param1': 'page'
       },*/
      translate: 'HOME.HOME_NAV',
      weight: 1
    });
  }
})();
