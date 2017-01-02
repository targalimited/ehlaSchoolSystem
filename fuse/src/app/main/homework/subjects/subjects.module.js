(function ()
{
    'use strict';

    angular
        .module('app.homework.subjects', [ 'app.homework.subjects.assignment' ])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider)
    {
        // State
        $stateProvider
            .state('app.homework.subjects', {
                url    : '/subjects',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/homework/subjects/subjects.html',
                        controller : 'SubjectsController as vm'
                    }
                },
                resolve: {
                    SubjectsData: function (msApi)
                    {
                        return msApi.resolve('subjects@get');
                    }
                },
                ncyBreadcrumb: {
                  label: 'Subjects'
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/homework/subjects');

        // Api
        msApiProvider.register('subjects', ['app/data/subjects/subjects.json']);

    }
})();
