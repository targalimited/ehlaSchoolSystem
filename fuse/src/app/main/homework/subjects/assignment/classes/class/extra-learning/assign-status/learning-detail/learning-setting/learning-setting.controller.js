(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.extra-learning.assign-status.learning-detail.learning-setting', [
      'ui.tree',
      //'app.homework.subjects.assignment.classes.class.extra-learning.learning-setting.learning-settings'
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assignment.classes.class.extra-learning.assign-status.learning-detail.learning-setting', {
        url: '/settings',
        views: {
          'content@app': {
            templateUrl: 'app/main/homework/subjects/assignment/classes/class/extra-learning/assign-status/learning-detail/learning-setting/learning-setting.html',
            controller: 'LearningSettingController as vm'
          }
        },
        resolve: {
          breadcrumbs: function (breadcrumb, $stateParams) {
            return breadcrumb.getBreadCrumbs($stateParams);
          },
        },
        ncyBreadcrumb: {
          label: 'Settings',
        },
        authenticate: true,
      });

    // Translation
    // $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment/classes/class/extra-learning');
  }
})();


(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.extra-learning.assign-status.learning-detail.learning-setting')
    .controller('LearningSettingController', LearningSettingController);

  /** @ngInject */
  function LearningSettingController($q, $sce, $rootScope, breadcrumb, breadcrumbs, msUtils, tableTree, loadingScreen, Restangular, $scope, $state, $mdDialog) {
    var vm = this;
    $scope.breadcrumbs = breadcrumbs;
    vm.detail = breadcrumbs.learningDetail;
    vm.isEditable = true;
    $scope.section = 'unassigned';
    vm.data = _.cloneDeep(msUtils.exerciseList);
    vm.topicsSearch = '';
    vm.selectedCategories = ['-1'],
      $scope.expanded = {};
    _.each(vm.data, function (v) {
      if (v.child && v.child.length) {
        $scope.expanded[v.id] = true;
      }
    });
    $scope.toggleCheck = tableTree.toggleCheck(vm, $scope.expanded);
    $scope.isAllChecked = tableTree.isAllChecked(vm, $scope.expanded);
    $scope.toggleCheckAll = tableTree.toggleCheckAll(vm, $scope.expanded);
    $scope.isAllExpanded = tableTree.isAllExpanded(vm, $scope.expanded);
    $scope.toggleExpand = tableTree.toggleExpand(vm, $scope.expanded);
    $scope.toggleExpandAll = tableTree.toggleExpandAll(vm, $scope.expanded);
    $scope.propagateCheckFromParent = tableTree.propagateCheckFromParent(vm, $scope.expanded);
    $scope.verifyAllParentsCheckStatus = tableTree.verifyAllParentsCheckStatus(vm, $scope.expanded);
    $scope.applyFilter = tableTree.applyFilter(vm, $scope.expanded);
    $scope.applyFilter();

    vm.back = function () {
      $state.go('app.homework.subjects.assignment.classes.class.extra-learning')
    }

    vm.switchSection = function () {
      _.each(vm.videoList, function (v) {
        v.player && v.player.pause();
      });
    }

    vm.showTutor = function (v) {
      v.isShowTutor = !v.isShowTutor;
      v.isPreview = false;
      v.player && v.player.pause();
      v.tutors = [v.tutor];
    }

    vm.preview = function (video) {
      video.isPreview = !video.isPreview;
      video.isShowTutor = false;

      if (video.isPreview) {
        if (!video.player) {
          var media = video.media[0];
          console.log('video.media', media);
          video.player = new Clappr.Player({
            source: media.file_path_hls || media.file_path,
            parentId: "#video" + video.id,
            poster: 'assets/images/backgrounds/home_banner.png',
            width: '100%',
            height: 500,
          });
        }
        video.player.play();
      } else {
        video.player.pause();
      }
    };

    vm.trustSrc = function (src) {
      // res.result.data[0]['preview_en']
      return $sce.trustAsHtml(src);
    };

    vm.displayLanguage = msUtils.displayLanguage;

    vm.init = function () {
      loadingScreen.showLoadingScreen();
      //itemApi/get_related_items_by_item_id
      return Restangular.service('itemApi/get_related_items_by_item_id').post({params: {id: breadcrumbs.learningId}})
      .then(function (results) {
        vm.extendedLearning = results.plain().data;
        console.log('vm.extendedLearning', vm.extendedLearning);
        var matches = msUtils.getMatches(vm.detail['preview_' + $rootScope.language]);
        return Restangular.service('itemApi/get_by_ids').post({ params: { ids: matches } });
      })
        .then(function (results) {
          vm.videoList = results.plain().data;
          msUtils.fixPreviewVideo(vm.videoList);
        })
        .catch(function (err) {
          console.log('err', err);
        })
        .finally(function () {
          loadingScreen.hideLoadingScreen();
        })
    }

    vm.init();
  }
})();
