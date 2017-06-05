(function ()
{
    'use strict';

    angular
        .module('app.settings.curriculums.curriculum.subjects', [ 'app.settings.curriculums.curriculum.subjects.subject' ])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider)
    {
        // State
        $stateProvider
            .state('app.settings.curriculums.curriculum.subjects', {
                url    : '/subjects',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/settings/curriculums/curriculum/subjects/subjects.html',
                        controller : 'CurriculumsSubjectsController as vm'
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
        $translatePartialLoaderProvider.addPart('app/main/settings/curriculums/curriculum/subjects');
    }
})();
