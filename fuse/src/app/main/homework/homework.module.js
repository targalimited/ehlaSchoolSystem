(function ()
{
    'use strict';

    angular
        .module('app.homework', [ 'app.homework.subjects' ])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.homework', {
                url    : '/homework',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/homework/homework.html',
                        controller : 'HomeworkController as vm'
                    }
                },
                resolve: {
                    HomeworkData: function (msApi)
                    {
                        return msApi.resolve('homework@get');
                    }
                },
                ncyBreadcrumb: {
                  label: 'Homework'
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/homework');

        // Api
        msApiProvider.register('homework', ['app/data/homework/homework.json']);

        // Navigation

        msNavigationServiceProvider.saveItem('fuse.homework', {
            title    : 'Homework',
            icon     : 'icon-book-open',
            state    : 'app.homework',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'HOMEWORK.HOMEWORK_NAV',
            weight   : 2
        });
    }
})();
