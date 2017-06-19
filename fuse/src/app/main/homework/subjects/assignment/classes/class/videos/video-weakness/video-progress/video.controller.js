(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.videos.video-weakness.video-progress',
      ['datatables', 'datatables.buttons'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assignment.classes.class.videos.video-weakness.video-progress', {
        url: '/progress',
        views: {
          'content@app': {
            templateUrl: 'app/main/homework/subjects/assignment/classes/class/videos/video-weakness/video-progress/video.html',
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
          label: 'Progress',
        },
        authenticate: true,
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment/classes/class/videos/video-weakness/video-progress');

    // Api
    msApiProvider.register('video', ['app/data/video/video.json']);
  }
})();

(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.videos.video-weakness.video-progress')
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

    var minutes = Math.ceil(Math.random() * 30);
    minutes = minutes < 5 ? 5 : minutes;
    var total = minutes;

    vm.randomVideoProgress = function (node) {
      // total
      node.total = total;
      node.lastViewingTime = moment().add(-(Math.ceil(Math.random() * 10)), 'days').toDate();
      node.totalCompleted = Math.ceil(total * Math.random());
      node.progressPercentage = Math.ceil(node.totalCompleted / total * 100);
    };

    vm.back = function () {
      $state.go('app.homework.subjects.assignment.classes.class.videos')
    }

  }
})();
