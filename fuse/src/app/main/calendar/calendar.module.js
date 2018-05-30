(function () {
 'use strict';

 angular
  .module('app.calendar',
   [
    // 3rd Party Dependencies
    'ui.calendar'
   ]
  )
  .config(config);

 /** @ngInject */
 function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
  // State
  $stateProvider.state('app.calendar', {
   url: '/calendar',
   views: {
    'content@app': {
     templateUrl: 'app/main/calendar/calendar.html',
     controller: 'CalendarController as vm'
    }
   },
   resolve: {
    breadcrumbs: function (breadcrumb, $stateParams) {
     return breadcrumb.getBreadCrumbs($stateParams);
    },
   },
   ncyBreadcrumb: {
    label: 'Calendar'
   },
   bodyClass: 'calendar'
  });

  // Translation
  $translatePartialLoaderProvider.addPart('app/main/calendar');

  // Navigation

  msNavigationServiceProvider.saveItem('fuse.calendar', {
   title: 'Calendar',
   icon: 'icon-calendar-today',
   state: 'app.calendar',
   stateParams: {
    'param1': 'page'
   },
   translate: 'CALENDAR.CALENDAR_NAV',
   weight: 4,
   hidden: function () {
    return true
   }
  });
 }
})();
