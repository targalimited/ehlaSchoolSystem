(function () {
    'use strict';

    angular
        .module('app.settings')
        .controller('SettingsController', SettingsController);

    /** @ngInject */
    function SettingsController(breadcrumbs, $scope, $state, $mdDialog, $document, msUtils, Restangular, generalMessage, loadingScreen) {
        var vm = this;
      $scope.breadcrumbs = breadcrumbs;
        vm.levels = $scope.breadcrumbs.ehlaLevels;
        vm.section = 'academic';

        vm.init = function () {
            if (vm.section === 'academic') {
                loadingScreen.showLoadingScreen();
                Restangular.one('academicSettings').get()
                  .then(function (results) {
                      vm.academicData = results.plain().data;
                  })
                  .catch(function (err) {
                      console.error('Cannot login', err);
                  })
                  .finally((function () {
                      loadingScreen.hideLoadingScreen();
                  }));
            } else if (vm.section === 'level') {
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
        }

        vm.init();

        vm.switchSection = function (section) {
            vm.section = section;
            vm.init();
        }

        // Methods
        vm.viewWeakness = function ($event, year) {
            $state.go('app.settings.curriculums', {academicId: year.id})
        }

        vm.deleteYear = function ($event, year) {
          // console.log('year', year);
            generalMessage.showConfirm($event, 'Delete Academic Year', 'Are you sure to delete the academic year "' + year.display_name + '"?').then(function () {
                loadingScreen.showLoadingScreen();

                Restangular.all('academicSettings/' + year.id).customDELETE()
                    .then(function (res) {
                        console.log(res);
                        generalMessage.showMessageToast('success', 'Assignment delete successfully.')
                    })
                    .catch(function (err) {
                        console.error('Cannot login', err);
                        generalMessage.showMessageToast('error', 'Assignment delete unsuccessfully.')
                    })
                    .finally(function () {
                        loadingScreen.hideLoadingScreen();
                        vm.init();
                    })

            }, function () {

            })
        }

        vm.editYear = function (e, year) {
            $mdDialog.show({
                controller: function SettingFormDialogController($mdDialog, dialogData) {
                    var vm = this;

                    // Data
                    vm.year = dialogData;
                    vm.type = _.isUndefined(dialogData) ? 'add' : 'edit';
                    vm.semesters = ['Semester A', 'Semester B', 'Summer Term'];
                    var currentYear = parseInt(moment().format('YYYY'));
                    vm.years = _.range(currentYear, currentYear + 50);

                    // Methods
                    vm.save = save;
                    vm.closeDialog = closeDialog;

                    init();

                    //////////

                    /**
                     * Initialize
                     */
                    function init() {
                        // Figure out the title
                        switch (vm.type) {
                            case 'add' :
                                vm.dialogTitle = 'Add Academic Year';
                                break;

                            case 'edit' :
                                vm.dialogTitle = 'Edit Academic Year - ' + vm.year.name;
                                break;

                            default:
                                break;
                        }
                    }

                    /**
                     * Save the event
                     */
                    function save() {
                        loadingScreen.showLoadingScreen();
                        switch (vm.type) {
                            case 'add' :
                                Restangular.service('academicSettings').post(vm.year)
                                    .then(function (results) {
                                        console.log(results);
                                        generalMessage.showMessageToast('success', 'School-based Curriculum Level Settings Update save successfully.')
                                        $mdDialog.hide('success');
                                    })
                                    .catch(function (err) {
                                        console.error('Cannot login', err);
                                        generalMessage.showMessageToast('error', 'School-based Curriculum Level Settings save unsuccessfully.')
                                    })
                                    .finally((function () {
                                        loadingScreen.hideLoadingScreen();
                                    }));
                                break;

                            case 'edit' :
                                Restangular.all('academicSettings/' + year.id).customPUT(vm.year)
                                    .then(function (results) {
                                        console.log(results);
                                        generalMessage.showMessageToast('success', 'School-based Curriculum Level Settings Update save successfully.')
                                        $mdDialog.hide('success');
                                    })
                                    .catch(function (err) {
                                        console.error('Cannot login', err);
                                        generalMessage.showMessageToast('error', 'School-based Curriculum Level Settings save unsuccessfully.')
                                    })
                                    .finally((function () {
                                        loadingScreen.hideLoadingScreen();
                                    }));
                                break;

                            default:
                                break;
                        }


                    }

                    /**
                     * Close the dialog
                     */
                    function closeDialog() {
                        $mdDialog.cancel();
                    }
                },
                controllerAs: 'vm',
                templateUrl: 'app/main/settings/dialogs/setting-form/setting-form-dialog.html',
                parent: angular.element($document.body),
                targetEvent: e,
                clickOutsideToClose: true,
                locals: {
                    dialogData: _.clone(year)
                }
            }).then(function (response) {
                if (response === 'success') {
                    vm.init();
                }
            });
        }


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
