(function () {
  'use strict';

  angular
    .module('app.settings.classes', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.settings.classes', {
        url: '/classes',
        views: {
          'content@app': {
            templateUrl: 'app/main/settings/class-setting/class-setting.html',
            controller: 'ClassSettingController as vm'
          }
        },
        resolve: {
          breadcrumbs: function (breadcrumb, $stateParams) {
            return breadcrumb.getBreadCrumbs($stateParams);
          },
        },
        ncyBreadcrumb: {
          label: 'Classes'
        },
        authenticate: true,
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/settings/class-setting');
  }
})();


(function () {
  'use strict';

  angular
    .module('app.settings.classes')
    .controller('ClassSettingController', ClassSettingController);

  /** @ngInject */
  function ClassSettingController(breadcrumbs, $scope, $state, $mdDialog, $document, msUtils, Restangular, generalMessage, loadingScreen) {
    var vm = this;
    $scope.breadcrumbs = breadcrumbs;
    vm.displaySchoolLevels = msUtils.displaySchoolLevels;

    vm.init = function () {
      loadingScreen.showLoadingScreen();
      Restangular.one('classes').get()
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


    vm.deleteClass = function (event, node) {
      generalMessage.showConfirm(event, 'Delete Class', 'Are you sure to delete the class "' + node.c_name + '"?').then(function () {
        loadingScreen.showLoadingScreen();

        Restangular.all('classes/' + node.id).customDELETE()
          .then(function (res) {
            console.log(res);
            generalMessage.showMessageToast('success', 'Class delete successfully.')
          })
          .catch(function (err) {
            console.error('Cannot login', err);
            generalMessage.showMessageToast('error', 'Class delete unsuccessfully.')
          })
          .finally(function () {
            loadingScreen.hideLoadingScreen();
            vm.init();
          })

      }, function () {

      })
    };

    vm.importClass = function (e) {
      $mdDialog.show({
        controller: function SettingFormDialogController($scope, $rootScope, $mdDialog) {
          var vm = this;
          $scope.language = $rootScope.language;
          vm.file = null;
          vm.closeDialog = closeDialog;

          vm.ngFlowOptions = {
            // You can configure the ngFlow from here
             target                   : 'api/media/image',
             chunkSize                : 15 * 1024 * 1024,
             maxChunkRetries          : 1,
             simultaneousUploads      : 1,
             testChunks               : false,
             progressCallbacksInterval: 1000
          };
          vm.ngFlow = {
            // ng-flow will be injected into here through its directive
            flow: {}
          };


          vm.fileAdded = function(file)
          {
            // Append it to the file list
            vm.file = file;
            vm.error = '';
          }

          /**
           * Upload
           * Automatically triggers when files added to the uploader
           */
          vm.upload = function()
          {
            // Set headers
            vm.ngFlow.flow.opts.headers = {
              'X-Requested-With': 'XMLHttpRequest',
              //'X-XSRF-TOKEN'    : $cookies.get('XSRF-TOKEN')
            };

            vm.ngFlow.flow.upload();
            loadingScreen.showLoadingScreen();
          }


          vm.uploadComplete = function () {
            loadingScreen.hideLoadingScreen();
          }

          vm.fileSuccess = function(file, message)
          {
            closeDialog();
          }

          vm.fileError = function ($file, $message) {
            vm.file = null;
            vm.error = $message && $message.replace(/<[^>]+>/gm, '');
          }

          /**
           * Close the dialog
           */
          function closeDialog() {
            $mdDialog.cancel();
          }
        },
        controllerAs: 'vm',
        templateUrl: 'app/main/settings/class-setting/templates/class-import.dialog.html',
        parent: angular.element($document.body),
        targetEvent: e,
        clickOutsideToClose: true,
      }).then(function (response) {
        if (response === 'success') {
          vm.init();
        }
      });
    }

    vm.editClass = function (e, classObj) {
      var type = 'edit';
      if (!classObj) {
        type = 'add';
      }
      $mdDialog.show({
        controller: function SettingFormDialogController($scope, $rootScope, $mdDialog, dialogData) {
          var vm = this;
          $scope.language = $rootScope.language;
          // Data
          vm.class = dialogData;
          vm.type = type;
          vm.levels = breadcrumbs.levels;

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
                vm.dialogTitle = 'Add Class';
                break;

              case 'edit' :
                vm.dialogTitle = 'Edit Class - ' + vm.class.c_name;
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
            vm.class.name_zh = vm.class.c_name;
            switch (vm.type) {
              case 'add' :
                Restangular.service('classes').post(vm.class)
                  .then(function (results) {
                    console.log(results);
                    generalMessage.showMessageToast('success', 'Class created successfully.')
                    $mdDialog.hide('success');
                  })
                  .catch(function (err) {
                    console.error('Cannot login', err);
                    generalMessage.showMessageToast('error', 'Class create unsuccessfully.')
                  })
                  .finally((function () {
                    loadingScreen.hideLoadingScreen();
                  }));
                break;

              case 'edit' :
                Restangular.all('classes/' + vm.class.id).customPUT(vm.class)
                  .then(function (results) {
                    console.log(results);
                    generalMessage.showMessageToast('success', 'Class save successfully.')
                    $mdDialog.hide('success');
                  })
                  .catch(function (err) {
                    console.error('Cannot login', err);
                    generalMessage.showMessageToast('error', 'Class save unsuccessfully.')
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
        templateUrl: 'app/main/settings/class-setting/templates/class-edit.dialog.html',
        parent: angular.element($document.body),
        targetEvent: e,
        clickOutsideToClose: true,
        locals: {
          dialogData: _.clone(classObj)
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
