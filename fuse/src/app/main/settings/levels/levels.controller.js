(function () {
  'use strict';

  angular
    .module('app.settings.levels')
    .controller('LevelsController', LevelsController);

  /** @ngInject */
  function LevelsController(tableTree, breadcrumbs, $scope, $state, $mdDialog, $document, msUtils, Restangular, generalMessage, loadingScreen) {
    var vm = this;
    $scope.breadcrumbs = breadcrumbs;
    vm.levels = $scope.breadcrumbs.ehlaLevels;

    vm.init = function () {
      loadingScreen.showLoadingScreen();
      Restangular.one('levels').get()
        .then(function (results) {
          var data = results.plain().data;
          vm.data = [];
          _.each(data, function (level) {
            var lv = _.find(vm.data, function (lv) {
              return lv.name_en === level.name_en;
            })
            if (lv) {
              lv.ehlaLevels.push(level.level)
            } else {
              vm.data.push({
                name_en: level.name_en,
                name_zh: level.name_zh,
                ehlaLevels: [level.level],
              });
            }
          });
          console.log(vm.data);
        })
        .catch(function (err) {
          console.error('Cannot login', err);
        })
        .finally((function () {
          $scope.applyFilter();
          loadingScreen.hideLoadingScreen();
        }));
    }

    vm.init();


    vm.addLevel = function () {
      vm.data.push({});
      $scope.applyFilter();
    }

    vm.deleteLevel = function (event, node) {
      _.remove(vm.data, function (lv) {
        return lv.name_en === node.name_en;
      });
      $scope.applyFilter();
    }

    vm.saveLevel = function () {
      // school level name should be unique
      loadingScreen.showLoadingScreen();
      var postData = [];
      _.each(vm.data, function (level) {
        if (_.trim(level.name_en) !== '' && level.ehlaLevels.length) {
          _.each(level.ehlaLevels, function (lv) {
            postData.push({
              name_en: _.trim(level.name_en),
              name_zh: _.trim(level.name_zh),
              level: lv,
            })
          })
        }
      });
      Restangular.service('levels').post({ levels: postData })
        .then(function (results) {
          console.log(results);
          generalMessage.showMessageToast('success', 'Level Settings Update save successfully.')
        })
        .catch(function (err) {
          console.error('Cannot login', err);
          generalMessage.showMessageToast('error', 'Level Settings save unsuccessfully.')
        })
        .finally((function () {
          loadingScreen.hideLoadingScreen();
        }));
    }
    //////////

    vm.selectedCategories = ['-1'];
    //vm.selectedSubjects = ['-1'];
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
  }
})();
