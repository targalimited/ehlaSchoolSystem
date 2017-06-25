(function () {
  'use strict';

  angular
    .module('app.home',
      [
        // 3rd Party Dependencies
        'nvd3',
        'datatables'
      ]
    )
    .config(config);

  /** @ngInject */
  function config($stateProvider, msApiProvider, msNavigationServiceProvider, $translatePartialLoaderProvider) {
    // State
    $stateProvider.state('app.home', {
      url: '/home',
      views: {
        'content@app': {
          templateUrl: 'app/main/home/home.html',
          controller: 'HomeController as vm'
        }
      },
      resolve: {
        DashboardData: function (msApi) {
          return msApi.resolve('dashboard.project@get');
        }
      },
      bodyClass: 'home',
      autheticate: true,
    });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/home');

    // Api
    msApiProvider.register('dashboard.project', ['app/data/dashboard/project/data.json']);

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
