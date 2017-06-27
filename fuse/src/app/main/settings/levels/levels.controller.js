(function () {
  'use strict';

  angular
    .module('app.settings.levels')
    .controller('LevelsController', LevelsController);

  /** @ngInject */
  function LevelsController(breadcrumbs, $scope, $state, $mdDialog, $document, msUtils, Restangular, generalMessage, loadingScreen) {
    var vm = this;
    $scope.breadcrumbs = breadcrumbs;
    vm.levels = $scope.breadcrumbs.ehlaLevels;

    vm.init = function () {
      loadingScreen.showLoadingScreen();
      Restangular.one('levels').get()
        .then(function (results) {
          var data = results.plain().data;
          vm.levelData = [];
          _.each(data, function (level) {
            var lv = _.find(vm.levelData, function (lv) {
              return lv.name_en === level.name_en;
            })
            if (lv) {
              lv.ehlaLevels.push(level.level)
            } else {
              vm.levelData.push({
                name_en: level.name_en,
                ehlaLevels: [level.level],
              });
            }
          });
          console.log(vm.levelData);
        })
        .catch(function (err) {
          console.error('Cannot login', err);
        })
        .finally((function () {
          loadingScreen.hideLoadingScreen();
        }));
    }

    vm.init();


    vm.addLevel = function () {
      vm.levelData.push({});
    }

    vm.deleteLevel = function (event, node) {
      _.remove(vm.levelData, function (lv) {
        return lv.name_en === node.name_en;
      });
    }

    vm.saveLevel = function () {
      // school level name should be unique
      loadingScreen.showLoadingScreen();
      var postData = [];
      _.each(vm.levelData, function (level) {
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
  }
})();
