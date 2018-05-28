(function () {
    'use strict';

    angular
        .module('app.pilot.english', ['app.pilot.english.category'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
        // State
        $stateProvider
            .state('app.pilot.english', {
                url: '/english',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/pilot/english/english.html',
                        controller: 'EnglishController as vm'
                    }
                },
                ncyBreadcrumb: {
                    label: 'English'
                },
                authenticate: true,
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pilot/english');
    }
})();
