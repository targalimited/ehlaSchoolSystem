(function ()
{
    'use strict';

    angular
        .module('app.examination', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.examination', {
                url    : '/examination',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/examination/examination.html',
                        controller : 'ExaminationController as vm'
                    }
                },
                resolve: {
                    ExaminationData: function (msApi)
                    {
                        return msApi.resolve('examination@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/examination');

        // Api
        msApiProvider.register('examination', ['app/data/examination/examination.json']);

        // Navigation

        msNavigationServiceProvider.saveItem('fuse.examination', {
            title    : 'Examination',
            icon     : 'icon-document',
            state    : 'app.examination',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'EXAMINATION.EXAMINATION_NAV',
            weight   : 2
        });
    }
})();
