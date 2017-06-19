
(function ()
{
    'use strict';

    angular
        .module('app.homework.subjects.assignment.classes.class.consolidated-report',
            ['app.homework.subjects.assignment.classes.class.consolidated-report.consolidated-report-weakness', 'nvd3', 'datatables', 'datatables.buttons'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.homework.subjects.assignment.classes.class.consolidated-report', {
                url    : '/reports',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/homework/subjects/assignment/classes/class/consolidated-report/consolidated-report.html',
                        controller : 'ConsolidatedReportController as vm'
                    }
                },
                resolve: {
                    breadcrumbs: function (breadcrumb, $stateParams) {
                        return breadcrumb.getBreadCrumbs($stateParams);
                    },
                },
                ncyBreadcrumb: {
                  label: 'Consolidated Report'
                },
                authenticate: true,
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment/classes/class/consolidated-report');
    }
})();


