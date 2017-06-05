(function () {
    'use strict';

    angular
        .module('app.settings')
        .controller('SettingsController', SettingsController);

    /** @ngInject */
    function SettingsController($state, $mdDialog, $document, Restangular, generalMessage, loadingScreen) {
        var vm = this;

        vm.init = function () {
            vm.section = 'academic';
            loadingScreen.showLoadingScreen();
            Restangular.one('academicSettings').get()
                .then(function (results) {
                    vm.data = results.plain().data;
                })
                .catch(function (err) {
                    console.error('Cannot login', err);
                })
                .finally((function () {
                    loadingScreen.hideLoadingScreen();
                }));

        }

        vm.init();

        vm.switchSection = function (section) {
            vm.section = section;
        }

        // Methods
        vm.viewWeakness = function ($event, year) {
            $state.go('app.settings.curriculums', {academicId: year.id})
        }

        vm.deleteYear = function ($event, year) {
            generalMessage.showConfirm($event, 'Delete Academic Year', 'Are you sure to delete the academic year "' + year.name + '"?').then(function () {
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

        //////////
    }
})();
