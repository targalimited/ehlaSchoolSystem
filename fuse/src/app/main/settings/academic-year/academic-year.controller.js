(function () {
  'use strict';

  angular
    .module('app.settings.academic-year')
    .controller('AcademicYearController', AcademicYearController);

  /** @ngInject */
  function AcademicYearController(breadcrumbs, $scope, $state, $mdDialog, $document, msUtils, Restangular, generalMessage, loadingScreen) {
    var vm = this;
    $scope.breadcrumbs = breadcrumbs;

    vm.init = function () {
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
    }

    vm.init();

    vm.viewWeakness = function ($event, year) {
      $state.go('app.settings.academic-year.curriculums', {academicId: year.id})
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
        controller: function SettingFormDialogController($scope, $rootScope, $mdDialog, dialogData) {
          var vm = this;
          $scope.language = $rootScope.language;
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
        templateUrl: 'app/main/settings/academic-year/dialogs/setting-form/setting-form-dialog.html',
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
