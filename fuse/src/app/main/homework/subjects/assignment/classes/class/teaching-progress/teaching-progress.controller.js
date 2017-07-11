(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.teaching-progress', ['ui.tree'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assignment.classes.class.teaching-progress', {
        url: '/teaching-progress',
        views: {
          'content@app': {
            templateUrl: 'app/main/homework/subjects/assignment/classes/class/teaching-progress/teaching-progress.html',
            controller: 'TeachingProgressController as vm'
          }
        },
        resolve: {
          breadcrumbs: function (breadcrumb, $stateParams) {
            return breadcrumb.getBreadCrumbs($stateParams);
          },
        },
        ncyBreadcrumb: {
          label: 'Teaching Progress Update',
        },
        authenticate: true,
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment/classes/class/teaching-progress');
  }
})();


(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.teaching-progress')
    .controller('TeachingProgressController', TeachingProgressController);

  /** @ngInject */
  function TeachingProgressController(breadcrumbs, breadcrumb, generalMessage, msUtils, loadingScreen, tableTree, $scope, $state, $q, Restangular) {
    var vm = this;
    $scope.breadcrumbs = breadcrumbs;
    $scope.currentDate = new Date();
    vm.displaySchoolLevels = msUtils.displaySchoolLevels;

    $scope.init = function () {
      $scope.loading = true;
      breadcrumb.getCurriculumWeaknessList(breadcrumbs.teacherId, breadcrumbs.subjectId, breadcrumbs.classId)
        .then(function (results) {
          var weaknessList = results.curriculum;
          var progress = results.progress;

          (function prepare(weaknessList) {
            var data = { checkedIds: [] };
            _.each(weaknessList, function (weakness) {
              if (weakness.child && weakness.child.length) {
                var result = prepare(weakness.child);
                if (result.checkedIds && result.checkedIds.length > 0) {
                  $scope.expanded[weakness.id] = true;
                  if (_.some(result.checkedIds, function (status) {
                      return status === 'partlyChecked';
                    }) || result.checkedIds.length !== weakness.child.length) {
                    weakness.checkStatus = 'partlyChecked';
                    data.checkedIds.push('partlyChecked');
                  } else {
                    weakness.checkStatus = 'checked';
                    data.checkedIds.push('checked');
                  }
                }
              } else {
                var a = _.some(progress, function (p) {
                  return parseInt(weakness.id) === p.weakness_id;
                });

                if (a) {
                  data.checkedIds.push('checked');
                  weakness.checkStatus = 'checked';
                  weakness.question_qty = a.question_qty;
                }
              }
            });

            return data;
          })(weaknessList);

          vm.categories = results.categories;

          vm.data = weaknessList;
          console.log(vm.data)

          $scope.applyFilter();
        })
        .catch(function (err) {
          console.error('Cannot login', err);
        })
        .finally(function () {
          $scope.loading = false;
        });
    }

    $scope.update = function () {
      var checkedWeaknessId = [];
      (function getChecked(data) {
        _.each(data, function (d) {
          if (d.child && d.child.length) {
            getChecked(d.child);
          } else if (d.checkStatus === 'checked') {
            checkedWeaknessId.push(d.id);
          }
        })
      })(vm.data);

      loadingScreen.showLoadingScreen();
      Restangular.all('teachers/' + breadcrumbs.teacherId + '/subjects/' + breadcrumbs.subjectId + '/classes/' + breadcrumbs.classId + '/teacherClassSubject').customPUT({ data: checkedWeaknessId })
        .then(function (res) {
          console.log(res);
          generalMessage.showMessageToast('success', 'Teaching Progress Update save successfully.')
        })
        .catch(function (err) {
          console.error('Cannot login', err);
          generalMessage.showMessageToast('error', 'Teaching Progress Update save unsuccessfully.')
        })
        .finally(function () {
          loadingScreen.hideLoadingScreen();
        })
    }

    $scope.back = function () {
      $state.go("app.homework.subjects.assignment");
    }


    vm.selectedCategories = ['-1'];
    vm.categories = [];
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


    $scope.init();
  }
})();
