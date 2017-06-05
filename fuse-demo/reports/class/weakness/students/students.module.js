(function ()
{
    'use strict';

    angular
        .module('app.reports.class.weakness.students', ['app.reports.class.weakness.students.student'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.reports.class.weakness.students', {
                url    : '/students',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/reports/class/weakness/students/students.html',
                        controller : 'StudentsController as vm'
                    }
                },
                resolve: {
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
        $translatePartialLoaderProvider.addPart('app/main/reports/class/weakness/students');

        // Api
        msApiProvider.register('students', ['app/data/students/students.json']);
    }
})();
