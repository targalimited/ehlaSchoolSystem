(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.extra-learning.assign-status.learning-detail.learning-setting', [
      'ui.tree',
      'app.homework.subjects.assignment.classes.class.extra-learning.assign-status.learning-detail.learning-setting.consolidated-report-weakness'
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
  function LearningSettingController($timeout, $q, $sce, $rootScope, breadcrumb, breadcrumbs, msUtils, tableTree, loadingScreen, Restangular, $scope, $state, $mdDialog) {
    var vm = this;
    $scope.breadcrumbs = breadcrumbs;
    vm.detail = breadcrumbs.learningDetail;
    vm.isEditable = true;
    $scope.section = 'unassigned';
    vm.topicsSearch = '';
    vm.selectedCategories = ['-1'],
      $scope.isConsoidatedReportReady = false;
    $scope.expanded = {};
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
      $scope.exerciseAPI = '';
      switch(true) {
        case breadcrumbs.learningType === 'reading':
          $scope.exerciseAPI = 'readingApi/get_exercises';
          break;
        case breadcrumbs.learningType === 'writing':
          $scope.exerciseAPI = 'writingApi/get_levels';
          break;
      }

      loadingScreen.showLoadingScreen();
      return $q.all([
        Restangular.service('itemApi/get_related_items_by_item_id').post({ params: { id: breadcrumbs.learningId } }),
        Restangular.service($scope.exerciseAPI).post({ params: { id: $state.params.refId } }),
      ])
        .then(function (results) {
          vm.extendedLearning = results[0].plain().data;
          vm.exerciseList = results[1].plain().data;
          console.log('exerciseList', vm.exerciseList);
          console.log('vm.extendedLearning', vm.extendedLearning);
          var matches = msUtils.getMatches(vm.detail['preview_' + $rootScope.language] || vm.detail.preview);
          return Restangular.service('itemApi/get_by_ids').post({ params: { ids: matches } });
        })
        .then(function (results) {
          vm.videoList = results.plain().data;
          msUtils.fixPreviewVideo(vm.videoList);
          $scope.applyFilter();
          $timeout(function () {
            $($('button.md-accordion-toggle').get(0)).trigger('click');
          });
        })
        .catch(function (err) {
          console.log('err', err);
        })
        .finally(function () {
          loadingScreen.hideLoadingScreen();
        })
    }


    vm.switchSection = function (section) {
      _.each(vm.videoList, function (v) {
        v.player && v.player.pause();
      });

      if (section === 'consolidated-report') {
        $scope.getConsolidatedReport();
      }
    }

    vm.showGraph = breadcrumb.showErrorBarChart;

    $scope.getConsolidatedReport = function () {
      if ($scope.isConsoidatedReportReady) {
        return;
      }

      loadingScreen.showLoadingScreen();
      $q.all([
        breadcrumb.getCurriculumWeaknessList(breadcrumbs.teacherId, breadcrumbs.subjectId, breadcrumbs.classId),
        Restangular.one('teachers', breadcrumbs.teacherId).one('subjects', breadcrumbs.subjectId).one('classes', breadcrumbs.classId).one('result', 'consolidatedReport').get(),
      ])
        .then(function (results) {
          var wk = results[0].curriculum;
          var result = results[1].plain().data;
          console.log(result);

          var r = breadcrumb.getConsolidatedReport(result);

          if (!r.length) {
            $scope.loading = false;
            return;
          }

          vm.categories = [];
          (function check(wk) {
            _.each(wk, function (w) {
              $scope.expanded[w.id] = true;
              if (w.child && w.child.length) {
                check(w.child);
              } else {
                var found = _.find(r, function (fw) {
                  //console.log('parseInt(w.id) === parseInt(fw.weakness_id)', parseInt(w.id), parseInt(fw.weakness_id), parseInt(w.id) === parseInt(fw.weakness_id));
                  return parseInt(w.id) === parseInt(fw.weakness_id);
                });
                if (found) {
                  vm.categories.push({
                    id: w.categoryId,
                    name_en: w.parentNameEN,
                    name_zh: w.parentNameZH,
                  });
                  w.checkStatus = 'checked';
                  _.assign(w, found);
                }
              }
            })
          })(wk);

          vm.data = wk;
          vm.categories = _.uniqBy(vm.categories, 'id');
          $scope.applyFilter();
          $scope.isConsoidatedReportReady = true;
        })
        .catch(function (err) {
          console.error('Cannot login', err);
        })
        .finally((function () {
          console.log('$scope.expanded', $scope.expanded);
          loadingScreen.hideLoadingScreen();
        }));
    };

    vm.viewStudents = function (item) {
      $state.go('app.homework.subjects.assignment.classes.class.extra-learning.assign-status.learning-detail.learning-setting.consolidated-report-weakness.student-report', {
        weaknessId: item.id
      });
    }

    vm.init();
  }
})();
