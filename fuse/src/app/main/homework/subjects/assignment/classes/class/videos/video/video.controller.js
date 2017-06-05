(function () {
    'use strict';

    angular
        .module('app.homework.subjects.assignment.classes.class.videos.video',
            ['datatables', 'datatables.buttons'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
        // State
        $stateProvider
            .state('app.homework.subjects.assignment.classes.class.videos.video', {
                url: '/:videoId',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/homework/subjects/assignment/classes/class/videos/video/video.html',
                        controller: 'VideoController as vm'
                    }
                },
                resolve: {
                    VideoData: function (msApi) {
                        return msApi.resolve('video@get');
                    },
                    breadcrumbs: function (breadcrumb, $stateParams) {
                        return breadcrumb.getBreadCrumbs($stateParams);
                    },
                },
                ncyBreadcrumb: {
                    label: '{{breadcrumbs.videoId}}',
                },
                authenticate: true,
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment/classes/class/videos/video');

        // Api
        msApiProvider.register('video', ['app/data/video/video.json']);
    }
})();

(function () {
    'use strict';

    angular
        .module('app.homework.subjects.assignment.classes.class.videos.video')
        .controller('VideoController', VideoController);

    /** @ngInject */
    function VideoController(VideoData, breadcrumb, breadcrumbs, $state, $scope) {
        var vm = this;
        $scope.breadcrumbs = breadcrumbs;

        vm.students = VideoData.data;

        vm.dtOptions = {
            autoWidth: false,
            responsive: true,
        };

        vm.randomVideoProgress = function (node) {
            node.totalStudents = 40;
            node.totalCompleted = Math.floor(Math.random() * node.totalStudents);
            node.progressPercentage = Math.ceil(node.totalCompleted / node.totalStudents * 100);
        };

        vm.back = function () {
            $state.go('app.homework.subjects.assignment.classes.class.videos')
        }

    }
})();
