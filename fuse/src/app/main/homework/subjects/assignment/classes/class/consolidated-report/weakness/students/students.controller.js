(function ()
{
    'use strict';

    angular
        .module('app.homework.subjects.assignment.classes.class.consolidated-report.weakness.students', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.homework.subjects.assignment.classes.class.consolidated-report.weakness.students', {
                url    : '/students',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/homework/subjects/assignment/classes/class/consolidated-report/weakness/students/students.html',
                        controller : 'StudentsController as vm'
                    }
                },
                resolve: {
                    breadcrumbs: function (breadcrumb, $stateParams) {
                        return breadcrumb.getBreadCrumbs($stateParams);
                    },
                    StudentsData: function (msApi)
                    {
                        return msApi.resolve('students@get');
                    }
                },
                ncyBreadcrumb: {
                    label: 'Weakness Report'
                },
                authenticate: true,
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment/classes/class/consolidated-report/weakness/students');

        // Api
        msApiProvider.register('students', ['app/data/students/students.json']);
    }
})();



(function ()
{
    'use strict';

    angular
        .module('app.homework.subjects.assignment.classes.class.consolidated-report.weakness.students')
        .controller('StudentsController', StudentsController);

    /** @ngInject */
    function StudentsController($state, StudentsData, breadcrumbs, $scope)
    {
        var vm = this;

        $scope.breadcrumbs = breadcrumbs;
        // Data
        vm.students = StudentsData.data;

        vm.history = [{
            date: '2017-03-19 00:12:38',
            name: 'Assignment 1'
        },{
            date: '2017-03-19 00:12:38',
            name: 'Assignment 2'
        },{
            date: '2017-03-19 00:12:38',
            name: 'Assignment 3'
        },{
            date: '2017-03-19 00:12:38',
            name: 'Assignment 4'
        },{
            date: '2017-03-19 00:12:38',
            name: 'Assignment 5'
        }]

        //////////

        vm.back = function () {
            $state.go('app.homework.subjects.assignment.classes.class.consolidated-report')
        }
    }
})();
