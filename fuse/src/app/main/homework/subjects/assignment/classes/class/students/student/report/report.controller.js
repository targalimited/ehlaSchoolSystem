(function ()
{
    'use strict';

    angular
        .module('app.homework.subjects.assignment.classes.class.students.student.report', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.homework.subjects.assignment.classes.class.students.student.report', {
                url    : '/report',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/homework/subjects/assignment/classes/class/students/student/report/report.html',
                        controller : 'ReportController as vm'
                    }
                },
                resolve: {
                    breadcrumbs: function (breadcrumb, $stateParams) {
                        return breadcrumb.getBreadCrumbs($stateParams);
                    },
                },
                ncyBreadcrumb: {
                    label: 'Report'
                },
                authenticate: true,
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment/classes/class/students/student/report');
    }
})();


(function ()
{
    'use strict';

    angular
        .module('app.homework.subjects.assignment.classes.class.students.student.report')
        .controller('ReportController', ReportController);

    /** @ngInject */
    function ReportController($scope, breadcrumbs)
    {
      $scope.breadcrumbs = breadcrumbs;
        var vm = this;

        // Data
        vm.report = [];


        // Methods
      vm.switchSection = function (section) {
        $scope.section = section;
      }
        //////////
    }
})();
