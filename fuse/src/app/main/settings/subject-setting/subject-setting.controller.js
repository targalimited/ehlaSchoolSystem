(function () {
  'use strict';

  angular
    .module('app.settings.subjects', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.settings.subjects', {
        url: '/subjects',
        views: {
          'content@app': {
            templateUrl: 'app/main/settings/subject-setting/subject-setting.html',
            controller: 'SubjectSettingController as vm'
          }
        },
        resolve: {
          breadcrumbs: function (breadcrumb, $stateParams) {
            return breadcrumb.getBreadCrumbs($stateParams);
          },
        },
        ncyBreadcrumb: {
          label: 'Subjects'
        },
        authenticate: true,
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/settings/subject-setting');
  }
})();


(function () {
  'use strict';

  angular
    .module('app.settings.subjects')
    .controller('SubjectSettingController', SubjectSettingController);

  /** @ngInject */
  function SubjectSettingController(breadcrumbs, $scope, $state, $mdDialog, $document, msUtils, Restangular, generalMessage, loadingScreen) {
    var vm = this;
    $scope.breadcrumbs = breadcrumbs;
    vm.displaySchoolLevels = msUtils.displaySchoolLevels;

    vm.init = function () {
      loadingScreen.showLoadingScreen();
      Restangular.one('subjects').get()
        .then(function (results) {
          vm.data = results.plain().data;
        })
        .catch(function (err) {
          console.error('Cannot login', err);
        })
        .finally((function () {
          loadingScreen.hideLoadingScreen();
        }));
    };

    vm.init();


    vm.deleteSubject = function (event, node) {
      generalMessage.showConfirm(event, 'Delete Subject', 'Are you sure to delete the subject "' + node.s_name_en + '"?').then(function () {
        loadingScreen.showLoadingScreen();

        Restangular.all('subjects/' + node.id).customDELETE()
          .then(function (res) {
            console.log(res);
            generalMessage.showMessageToast('success', 'Subject delete successfully.')
          })
          .catch(function (err) {
            console.error('Cannot login', err);
            generalMessage.showMessageToast('error', 'Subject delete unsuccessfully.')
          })
          .finally(function () {
            loadingScreen.hideLoadingScreen();
            vm.init();
          })

      }, function () {

      })
    };

    vm.editSubject = function (e, subject) {
      var type = 'edit';
      if (!subject) {
        type = 'add';
      }
      $mdDialog.show({
        controller: function SettingFormDialogController($mdDialog, dialogData) {
          var vm = this;

          // Data
          vm.subject = dialogData;
          vm.type = type;

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
                vm.dialogTitle = 'Add Subject';
                break;

              case 'edit' :
                vm.dialogTitle = 'Edit Subject - ' + vm.subject.s_name_en;
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
                Restangular.service('subjects').post(vm.subject)
                  .then(function (results) {
                    console.log(results);
                    generalMessage.showMessageToast('success', 'Subject created successfully.')
                    $mdDialog.hide('success');
                  })
                  .catch(function (err) {
                    console.error('Cannot login', err);
                    generalMessage.showMessageToast('error', 'Subject create unsuccessfully.')
                  })
                  .finally((function () {
                    loadingScreen.hideLoadingScreen();
                  }));
                break;

              case 'edit' :
                Restangular.all('subjects/' + vm.subject.id).customPUT(vm.subject)
                  .then(function (results) {
                    console.log(results);
                    generalMessage.showMessageToast('success', 'Subject save successfully.')
                    $mdDialog.hide('success');
                  })
                  .catch(function (err) {
                    console.error('Cannot login', err);
                    generalMessage.showMessageToast('error', 'Subject save unsuccessfully.')
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
        templateUrl: 'app/main/settings/subject-setting/templates/subject-edit.dialog.html',
        parent: angular.element($document.body),
        targetEvent: e,
        clickOutsideToClose: true,
        locals: {
          dialogData: _.clone(subject)
        }
      }).then(function (response) {
        if (response === 'success') {
          vm.init();
        }
      });
    };
    //////////
  }
})();
