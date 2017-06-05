(function ()
{
    'use strict';

    angular
        .module('app.homework.subjects.assignment.classes.class.students', ['app.homework.subjects.assignment.classes.class.students.student'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.homework.subjects.assignment.classes.class.students', {
                url    : '/students',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/homework/subjects/assignment/classes/class/students/students.html',
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
                    label: 'Students'
                },
                authenticate: true,
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment/classes/class/students');

        // Api
        msApiProvider.register('students', ['app/data/students/students.json']);
    }
})();


(function ()
{
    'use strict';

    angular
        .module('app.homework.subjects.assignment.classes.class.students')
        .controller('StudentsController', StudentsController);

    /** @ngInject */
    function StudentsController($state, StudentsData)
    {
        var vm = this;

        // Data
        vm.students = StudentsData.data;


        // Methods
      vm.viewPersonalReport = function (student) {
        $state.go('app.homework.subjects.assignment.classes.class.students.student.report', { studentId: student.id })
      };
        //////////
    }
})();
