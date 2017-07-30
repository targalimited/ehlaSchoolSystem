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

    vm.initExerciseTree = function () {
      $scope.expanded = [];
      $scope.toggleCheck = [];
      $scope.isAllChecked = [];
      $scope.toggleCheckAll = [];
      $scope.isAllExpanded = [];
      $scope.toggleExpand = [];
      $scope.toggleExpandAll = [];
      $scope.propagateCheckFromParent = [];
      $scope.verifyAllParentsCheckStatus = [];
      $scope.applyFilter = [];
      _.each(vm.extendedLearning, function (learning, i) {
        $scope.expanded[i] = {};
        if (learning.detail && learning.detail.length) {
          $scope.expanded[i][learning.detail[0].id] = true;
        }
        $scope.toggleCheck[i] = tableTree.toggleCheck({ data: learning.detail }, $scope.expanded[i]);
        $scope.isAllChecked[i] = tableTree.isAllChecked({ data: learning.detail }, $scope.expanded[i]);
        $scope.toggleCheckAll[i] = tableTree.toggleCheckAll({ data: learning.detail }, $scope.expanded[i]);
        $scope.isAllExpanded[i] = tableTree.isAllExpanded({ data: learning.detail }, $scope.expanded[i]);
        $scope.toggleExpand[i] = tableTree.toggleExpand({ data: learning.detail }, $scope.expanded[i]);
        $scope.toggleExpandAll[i] = tableTree.toggleExpandAll({ data: learning.detail }, $scope.expanded[i]);
        $scope.propagateCheckFromParent[i] = tableTree.propagateCheckFromParent({ data: learning.detail }, $scope.expanded[i]);
        $scope.verifyAllParentsCheckStatus[i] = tableTree.verifyAllParentsCheckStatus({ data: learning.detail }, $scope.expanded[i]);
        $scope.applyFilter[i] = tableTree.applyFilter({ data: learning.detail }, $scope.expanded[i]);
        $scope.applyFilter[i]();
      })

      // $scope.expandedReport = {};
      $scope.toggleCheckReport = tableTree.toggleCheck(vm, $scope.expandedReport);
      $scope.isAllCheckedReport = tableTree.isAllChecked(vm, $scope.expandedReport);
      $scope.toggleCheckAllReport = tableTree.toggleCheckAll(vm, $scope.expandedReport);
      $scope.isAllExpandedReport = tableTree.isAllExpanded(vm, $scope.expandedReport);
      $scope.toggleExpandReport = tableTree.toggleExpand(vm, $scope.expandedReport);
      $scope.toggleExpandAllReport = tableTree.toggleExpandAll(vm, $scope.expandedReport);
      $scope.propagateCheckFromParentReport = tableTree.propagateCheckFromParent(vm, $scope.expandedReport);
      $scope.verifyAllParentsCheckStatusReport = tableTree.verifyAllParentsCheckStatus(vm, $scope.expandedReport);
      $scope.applyFilterReport = tableTree.applyFilter(vm, $scope.expandedReport);
      $scope.applyFilterReport();

      $scope.expandedExercise = {};
      $scope.toggleCheckExercise = tableTree.toggleCheck({ data: vm.exerciseList }, $scope.expandedExercise);
      $scope.isAllCheckedExercise = tableTree.isAllChecked({ data: vm.exerciseList }, $scope.expandedExercise);
      $scope.toggleCheckAllExercise = tableTree.toggleCheckAll({ data: vm.exerciseList }, $scope.expandedExercise);
      $scope.isAllExpandedExercise = tableTree.isAllExpanded({ data: vm.exerciseList }, $scope.expandedExercise);
      $scope.toggleExpandExercise = tableTree.toggleExpand({ data: vm.exerciseList }, $scope.expandedExercise);
      $scope.toggleExpandAllExercise = tableTree.toggleExpandAll({ data: vm.exerciseList }, $scope.expandedExercise);
      $scope.propagateCheckFromParentExercise = tableTree.propagateCheckFromParent({ data: vm.exerciseList }, $scope.expandedExercise);
      $scope.verifyAllParentsCheckStatusExercise = tableTree.verifyAllParentsCheckStatus({ data: vm.exerciseList }, $scope.expandedExercise);
      $scope.applyFilterExercise = tableTree.applyFilter({ data: vm.exerciseList }, $scope.expandedExercise);
      $scope.applyFilterExercise();
    }


    $scope.translations = {};
    if (breadcrumbs.learningType === 'reading') {
      $scope.translations = {
        preview: 'Preview',
        exercise: 'Exercise'
      };
    } else {
      $scope.translations = {
        preview: 'Topic',
        exercise: 'Progressive Writing Revision'
      };
    }

    vm.documents = [
      { name: 'Getting Starting',
        download: 'https://docs.google.com/document/d/1cnjDpWgweW44PYzYyDnyq9fkBxBatB13iwiER9hmjwo/export?format=doc',
        preview: 'https://docs.google.com/document/d/1cnjDpWgweW44PYzYyDnyq9fkBxBatB13iwiER9hmjwo/edit?usp=sharing' },
      { name: 'EHLA User Manual',
        download: 'https://docs.google.com/document/d/1cnjDpWgweW44PYzYyDnyq9fkBxBatB13iwiER9hmjwo/export?format=doc',
        preview: 'https://docs.google.com/document/d/1cnjDpWgweW44PYzYyDnyq9fkBxBatB13iwiER9hmjwo/edit?usp=sharing' },
      { name: 'Class Assignments',
        download: 'https://docs.google.com/document/d/1cnjDpWgweW44PYzYyDnyq9fkBxBatB13iwiER9hmjwo/export?format=doc',
        preview: 'https://docs.google.com/document/d/1cnjDpWgweW44PYzYyDnyq9fkBxBatB13iwiER9hmjwo/edit?usp=sharing' },
      { name: 'Settings',
        download: 'https://docs.google.com/document/d/1cnjDpWgweW44PYzYyDnyq9fkBxBatB13iwiER9hmjwo/export?format=doc',
        preview: 'https://docs.google.com/document/d/1cnjDpWgweW44PYzYyDnyq9fkBxBatB13iwiER9hmjwo/edit?usp=sharing' },
      { name: 'Reading Assignments',
        download: 'https://docs.google.com/document/d/1cnjDpWgweW44PYzYyDnyq9fkBxBatB13iwiER9hmjwo/export?format=doc',
        preview: 'https://docs.google.com/document/d/1cnjDpWgweW44PYzYyDnyq9fkBxBatB13iwiER9hmjwo/edit?usp=sharing' },
      { name: 'Import and Export',
        download: 'https://docs.google.com/document/d/1cnjDpWgweW44PYzYyDnyq9fkBxBatB13iwiER9hmjwo/export?format=doc',
        preview: 'https://docs.google.com/document/d/1cnjDpWgweW44PYzYyDnyq9fkBxBatB13iwiER9hmjwo/edit?usp=sharing' },
    ];

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

    vm.tutorialVideoStatsChange = function (node, prop, val) {
      if (node.name === 'Tutorial Video' || node.name_en === 'Video Global Setting') {
        _.each(node.child, function (c) {
          c[prop] = c[prop] !== val && !_.isUndefined(c[prop]) ? c[prop] : node[prop];
        })
      }
    }

    vm.trustSrc = function (src, isImage) {
      // res.result.data[0]['preview_en']
      if (src.indexOf('http://') !== -1 && isImage) {
        src = '<img src="' + src + '" style="max-height:40px;"/>';
      }
      return $sce.trustAsHtml(src);
    };

    vm.htmlToPlaintext = function (text) {
      return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }

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
          _.each(vm.extendedLearning, function (learning) {
            if (learning.detail && learning.detail.length) {
              _.each(learning.detail, function (item) {
                item.child = [];
              });
              learning.detail = [
                { id: Math.floor(Math.random() * 10000), name_en: 'Video Global Setting', name_zh: 'Video Global Setting', child: learning.detail }
              ];
            }
          });

          var matches = msUtils.getMatches(vm.detail['preview_' + $rootScope.language] || vm.detail.preview);
          if (breadcrumbs.learningType === 'writing') {
            _.each(vm.exerciseList, function (e) {
              matches = matches.concat(e.tutorial_video_ids);
              e.child = [
                { id: 0, name: 'Article', child: [] },
                { id: 1, name: 'Revision Exercise', child: [] },
              ]
            });
          }

          return Restangular.service('itemApi/get_by_ids').post({ params: { ids: matches } });
        })
        .then(function (results) {
          vm.videoList = results.plain().data;
          msUtils.fixPreviewVideo(vm.videoList);
          if (breadcrumbs.learningType === 'writing') {
            _.each(vm.exerciseList, function (e) {
              var vl = _.intersectionWith(vm.videoList, e.tutorial_video_ids, function (a, b) {
                a.child = [];
                return parseInt(a.id) === parseInt(b);
              });
              e.child.push({ id: 2, name: 'Tutorial Video', child: vl || [] })
            });
            console.log('breadcrumbs.vm.exerciseList', vm.exerciseList);
          }
          $timeout(function () {
            $($('button.md-accordion-toggle').get(0)).trigger('click');
          });
        })
        .catch(function (err) {
          console.log('err', err);
        })
        .finally(function () {
          console.log('breadcrumbs.learningDetail', vm.detail);
          vm.initExerciseTree();
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
          $scope.expandedReport = {};
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
              $scope.expandedReport[w.id] = true;
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
          $scope.isConsoidatedReportReady = true;
        })
        .catch(function (err) {
          console.error('Cannot login', err);
        })
        .finally((function () {
          // console.log('$scope.expanded', $scope.expanded);
          vm.initExerciseTree();
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
