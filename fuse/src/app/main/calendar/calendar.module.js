(function ()
{
    'use strict';

    angular
        .module('app.calendar', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.calendar', {
                url    : '/calendar',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/calendar/calendar.html',
                        controller : 'CalendarController as vm'
                    }
                },
                resolve: {
                    CalendarData: function (msApi)
                    {
                        return msApi.resolve('calendar@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/calendar');

        // Api
        msApiProvider.register('calendar', ['app/data/calendar/calendar.json']);

        // Navigation

        msNavigationServiceProvider.saveItem('fuse.calendar', {
            title    : 'Calendar',
            icon     : 'icon-calendar-today',
            state    : 'app.calendar',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'CALENDAR.CALENDAR_NAV',
            weight   : 4
        });
    }
})();
