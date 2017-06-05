(function () {
    'use strict';

    angular
        .module('app.homework.subjects.assignment.classes.class.exercises',
            ['app.homework.subjects.assignment.classes.class.exercises.exercise', 'datatables', 'datatables.buttons'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
        // State
        $stateProvider
            .state('app.homework.subjects.assignment.classes.class.exercises', {
                url: '/type/:exerciseType',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/homework/subjects/assignment/classes/class/exercises/exercises.html',
                        controller: 'ExercisesController as vm'
                    }
                },
                resolve: {
                    breadcrumbs: function (breadcrumb, $stateParams) {
                        return breadcrumb.getBreadCrumbs($stateParams);
                    },
                },
                ncyBreadcrumb: {
                    label: '{{breadcrumbs.exerciseType}}',
                },
                authenticate: true,
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment/classes/class/exercises');
    }
})();

(function () {
    'use strict';

    angular
        .module('app.homework.subjects.assignment.classes.class.exercises')
        .controller('ExercisesController', ExercisesController);

    /** @ngInject */
    function ExercisesController(breadcrumbs, $state, $scope, generalMessage, loadingScreen, Restangular) {
        var vm = this;
        $scope.breadcrumbs = breadcrumbs;
        $scope.title = _.upperFirst(breadcrumbs.exerciseType);
        $scope.titleSingular = $scope.title.slice(0, $scope.title.length - 1)
        $scope.assignmentName = $scope.titleSingular.toLowerCase();

        $scope.init = function () {
            $scope.loading = true;
            Restangular.one('teachers', breadcrumbs.teacherId).one('subjects', breadcrumbs.subjectId).one('classes', breadcrumbs.classId).one('assignments', $scope.assignmentName).get()
                .then(function (res) {
                    const result = res.plain();
                    console.log(result);
                    vm.data = result;
                })
                .catch(function (err) {
                    console.error('Cannot login', err);
                })
                .finally(function () {
                    $scope.loading = false;
                });
        }


        $scope.back = function () {
            $state.go('app.homework.subjects.assignment')
        }

        vm.dtOptions = {
            aaSorting: [[5, 'desc']],
            autoWidth: false,
            responsive: true,
        };

        vm.deleteAssignment = function ($event, assignment) {
            generalMessage.showConfirm($event, 'Delete Assignment', 'Are you sure to delete the assignment "' + assignment.name + '"?').then(function () {
                loadingScreen.showLoadingScreen();
                Restangular.all('teachers/' + breadcrumbs.teacherId + '/subjects/' + breadcrumbs.subjectId + '/classes/' + breadcrumbs.classId + '/assignments/' + $scope.assignmentName + '/' + assignment.id).customDELETE()
                    .then(function (res) {
                        console.log(res);
                        generalMessage.showMessageToast('success', 'Assignment delete successfully.')
                    })
                    .catch(function (err) {
                        console.error('Cannot login', err);
                        generalMessage.showMessageToast('error', 'Assignment delete unsuccessfully.')
                    })
                    .finally(function () {
                        loadingScreen.hideLoadingScreen();
                        $scope.init();
                    })
            }, function () {

            })
        }

        vm.viewExerciseDetail = function (exercise) {
            $state.go('app.homework.subjects.assignment.classes.class.exercises.exercise', {exerciseId: exercise ? exercise.id : null})
        };

        $scope.init();
    }
})();
