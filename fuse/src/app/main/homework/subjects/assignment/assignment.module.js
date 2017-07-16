(function () {
    'use strict';

    angular
        .module('app.homework.subjects.assignment', ['app.homework.subjects.assignment.classes'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
        // State
        $stateProvider
            .state('app.homework.subjects.assignment', {
                url: '/:subjectId/assignment',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/homework/subjects/assignment/assignment.html',
                        controller: 'AssignmentController as vm'
                    }
                },
                resolve: {
                    breadcrumbs: function (breadcrumb, $stateParams) {
                        return breadcrumb.getBreadCrumbs($stateParams);
                    },
                },
                ncyBreadcrumb: {
                    label: '{{breadcrumbs.subject["s_name_" + language]}}'
                },
                authenticate: true,
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment');
    }
})();
