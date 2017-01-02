(function ()
{
    'use strict';

    angular
        .module('app.settings', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.settings', {
                url    : '/settings',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/settings/settings.html',
                        controller : 'SettingsController as vm'
                    }
                },
                resolve: {
                    SettingsData: function (msApi)
                    {
                        return msApi.resolve('settings@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/settings');

        // Api
        msApiProvider.register('settings', ['app/data/settings/settings.json']);

        // Navigation

        msNavigationServiceProvider.saveItem('fuse.settings', {
            title    : 'Settings',
            icon     : 'icon-cog',
            state    : 'app.settings',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'SETTINGS.SETTINGS_NAV',
            weight   : 6
        });
    }
})();
