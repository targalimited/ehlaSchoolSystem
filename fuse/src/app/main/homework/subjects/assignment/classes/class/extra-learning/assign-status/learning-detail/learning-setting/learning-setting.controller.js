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
    vm.isEditable = true;
    vm.data = _.cloneDeep(msUtils.exerciseList);
    vm.topicsSearch = '';
    vm.selectedCategories = ['-1'],
      $scope.expanded = {};
    _.each(vm.data, function (v) {
      if (v.child && v.child.length) {
        $scope.expanded[v.id] = true;
      }
    });
    $scope.toggleCheck = tableTree.toggleCheck(vm);
    $scope.isAllChecked = tableTree.isAllChecked(vm);
    $scope.toggleCheckAll = tableTree.toggleCheckAll(vm);
    $scope.isAllExpanded = tableTree.isAllExpanded(vm, $scope.expanded);
    $scope.toggleExpand = tableTree.toggleExpand(vm, $scope.expanded);
    $scope.toggleExpandAll = tableTree.toggleExpandAll(vm, $scope.expanded);
    $scope.propagateCheckFromParent = tableTree.propagateCheckFromParent(vm);
    $scope.verifyAllParentsCheckStatus = tableTree.verifyAllParentsCheckStatus(vm);
    $scope.applyFilter = tableTree.applyFilter(vm);
    $scope.applyFilter();

    vm.showTutor = function (v) {
      v.isShowTutor = !v.isShowTutor;
      v.tutors = [v.tutor];
    }

    vm.preview = function (video) {
      video.isPreview = !video.isPreview;

      if (video.isPreview) {
        if (!video.player) {
          var media = video.media[0];
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

      return $q.all([
        Restangular.service('itemApi/get_by_ids').post({params: {ids: [breadcrumbs.learningId]}}),
        Restangular.service('itemApi/get_related_items_by_item_id').post({params: {id: breadcrumbs.learningId}}),
      ]).then(function (results) {
        var r = results;
        vm.detail = r[0].plain().data[0];
        vm.detail.theme_chosen = _.trimStart(_.reduce(vm.detail.theme, function (result, v) {
          return result + ', ' + v.name_en;
        }, ''), ', ');
        breadcrumbs.learningDetail = vm.detail;
        vm.extendedLearning = r[1].plain().data;
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
