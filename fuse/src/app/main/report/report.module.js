(function ()
{
    'use strict';

    angular
        .module('app.report', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.report', {
                url    : '/report',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/report/report.html',
                        controller : 'ReportController as vm'
                    }
                },
                resolve: {
                    ReportData: function (msApi)
                    {
                        return msApi.resolve('report@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/report');

        // Api
        msApiProvider.register('report', ['app/data/report/report.json']);

        // Navigation

        msNavigationServiceProvider.saveItem('fuse.report', {
            title    : 'Report',
            icon     : 'icon-trending-up',
            state    : 'app.report',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'REPORT.REPORT_NAV',
            weight   : 3
        });
    }
})();
