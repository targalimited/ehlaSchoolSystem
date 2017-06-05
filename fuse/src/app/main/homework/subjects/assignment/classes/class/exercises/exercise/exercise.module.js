(function () {
    'use strict';

    angular
        .module('app.homework.subjects.assignment.classes.class.exercises.exercise', ['ui.tree'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider) {
        // State
        $stateProvider
            .state('app.homework.subjects.assignment.classes.class.exercises.exercise', {
                url: '/:exerciseId',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/homework/subjects/assignment/classes/class/exercises/exercise/exercise.html',
                        controller: 'ExerciseController as vm'
                    }
                },
                resolve: {
                    breadcrumbs: function (breadcrumb, $stateParams) {
                        return breadcrumb.getBreadCrumbs($stateParams);
                    },
                },
                ncyBreadcrumb: {
                    label: '{{action}}',
                },
                authenticate: true,
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment/classes/class/exercises/exercise');
    }
})();
