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
                    breadcrumbs: function (breadcrumb, $stateParams) {
                        return breadcrumb.getBreadCrumbs($stateParams);
                    },
                },
                ncyBreadcrumb: {
                  label: 'Subjects'
                },
                authenticate: true,
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/homework/subjects');
    }
})();
