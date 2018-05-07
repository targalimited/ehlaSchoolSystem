(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('UsersController', UsersController);

  /** @ngInject */
  function UsersController($scope, $state, $timeout, $compile, msUtils, UsersData, generalMessage, loadingScreen, Restangular, $mdDialog, $document, breadcrumbs) {
    var vm = this;

    // Data
    vm.data = UsersData.data;
    vm.selectedRoles = [-1];
    vm.selectedStatus = [-1];
    vm.roles = breadcrumbs.roles;
    vm.exportAllowedRoles = [
      { id: 0, name: 'Student' },
      { id: 1, name: 'Teacher' },
    ]
    vm.statuses = [
      { id: 'active', name: 'Active' },
      { id: 'non-active', name: 'Inactive' },
    ];
    vm.displayRoles = msUtils.displayRoles;

    vm.init = function () {
      loadingScreen.showLoadingScreen();
      Restangular.one('user_list').get()
        .then(function (results) {
          vm.data = results.plain().data;
          console.log(vm.data);
          initFilter();
        })
        .catch(function (err) {
          console.error('Cannot login', err);
        })
        .finally((function () {
          loadingScreen.hideLoadingScreen();
        }));
    }


    vm.displayUserStatus = function (status) {
      switch (true) {
        case status === 'active':
          return 'Active';
        case status === 'non-active':
          return 'Inactive';
      }
    };

    $scope.toggleActivation = function ($event, user) {
      var action = (user.status === 1 ? 'ACTIVATE' : 'INACTIVATE');
      generalMessage.showConfirm($event, action + ' User', 'Are you sure to ' + action + ' the user "' + user.name + '"?').then(function () {
        loadingScreen.showLoadingScreen();

        /**
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
         **/

      }, function () {

      })
    }

    // Methods
    function initFilter() {
      $timeout(function () {
        if (!angular.element('#roles-filter').length) {
          var templateElement = angular.element('<div id="roles-filter" class="dataTables_filter custom-datatable-filter"> ' +
            '<md-select ng-model="vm.selectedRoles" class="simplified" ' +
            'ng-change="applyRoleFilter()" ' +
            'multiple> ' +
            '<md-optgroup label="Roles"> ' +
            '  <md-option ng-value="-1">All Roles</md-option> ' +
            '<md-option ng-value="role.id" ng-repeat="role in vm.roles"> ' +
            '  {{role.name}} ' +
            '</md-option> ' +
            '</md-optgroup> ' +
            '</md-select>' +
            '</div>' +
            '<div id="status-filter" style="margin-left: 10px;" class="dataTables_filter custom-datatable-filter"> ' +
            '<md-select ng-model="vm.selectedStatus" class="simplified" ' +
            'ng-change="applyStatusFilter()" ' +
            'multiple> ' +
            '<md-optgroup label="Status"> ' +
            '  <md-option ng-value="-1">All Status</md-option> ' +
            '<md-option ng-value="status.id" ng-repeat="status in vm.statuses"> ' +
            '  {{status.name}} ' +
            '</md-option> ' +
            '</md-optgroup> ' +
            '</md-select>' +
            '</div>');

          $compile(templateElement)($scope, function (clonedElement, scope) {
            //attach the clone to DOM document at the right place
            $('.dataTables_filter').prepend(clonedElement);
          });
        }
      }, 500);
    }

    $scope.filterStatus = function (user) {
      // console.log('xxxx', user);
      return _.some(vm.selectedStatus, function (r) {
        return r === -1 || user.status === r;
      });
    }

    $scope.applyStatusFilter = function () {
      initFilter();
    }

    $scope.applyRoleFilter = function () {
      // console.log('applyRoleFilter');
      initFilter();
    }

    $scope.filterRoles = function (user) {
      // console.log('xxxx', user);
      return _.some(vm.selectedRoles, function (r) {
        return parseInt(r) === -1 || _.some(user.roles, function (role) {
            return parseInt(role.id) === parseInt(r);
          });
      });
    };


    $scope.viewUserDetails = function (user) {
      $state.go('app.users.user', { userId: user.id });
    };

    vm.createUser = function () {
      $state.go('app.users.user', { userId: 'create' })
    }

    vm.init();

    vm.exportUserByRole = function (role) {
      Restangular.one('export' + role.name + 'Excel').get()
        .then(function (results) {
          var file = new Blob([results], { type: 'text/csv' });
          saveAs(file, 'something.csv');
        })
        .catch(function (err) {
          console.error('Cannot login', err);
        })
        .finally((function () {
          loadingScreen.hideLoadingScreen();
        }));
    }

    vm.importUsers = function (e) {
      $mdDialog.show({
        controller: function SettingFormDialogController($scope, $rootScope, $mdDialog) {
          var vm = this;
          $scope.language = $rootScope.language;
          vm.files = { student: null, teacher: null };
          vm.isLoading = { student: false, teacher: false }
          vm.isSuccess = { student: false, teacher: false }
          vm.errors = { student: '', teacher: '' }
          vm.closeDialog = closeDialog;

          vm.ngFlowOptions = {
            student: {
              // You can configure the ngFlow from here
              target                   : 'v1/importTeacherExcel',
              chunkSize                : 15 * 1024 * 1024,
              maxChunkRetries          : 1,
              simultaneousUploads      : 1,
              testChunks               : false,
              progressCallbacksInterval: 1000
            },
            teacher: {
              // You can configure the ngFlow from here
              target                   : 'v1/importStudentExcel',
              chunkSize                : 15 * 1024 * 1024,
              maxChunkRetries          : 1,
              simultaneousUploads      : 1,
              testChunks               : false,
              progressCallbacksInterval: 1000
            }
          };
          vm.ngFlow = {
            // ng-flow will be injected into here through its directive
            student: {
              flow: {}
            },
            teacher: {
              flow: {}
            }
          };


          vm.fileAdded = function(file, type)
          {
            // Append it to the file list
            vm.files[type] = file;
            vm.errors[type] = '';
            vm.isLoading[type] = false;
            vm.isSuccess[type] = false
          }

          /**
           * Upload
           * Automatically triggers when files added to the uploader
           */
          vm.upload = function()
          {
            _.each(vm.files, function (file, type) {
              // Set headers
              vm.ngFlow[type].flow.opts.headers = {
                'X-Requested-With': 'XMLHttpRequest',
                //'X-XSRF-TOKEN'    : $cookies.get('XSRF-TOKEN')
              };
              if (vm.files[type]) {
                vm.ngFlow[type].flow.upload();
                vm.isLoading[type] = true;
                vm.isSuccess[type] = false;
              } else {
                vm.isLoading[type] = false;
                vm.isSuccess[type] = true;
              }

              vm.errors[type] = '';
            });
            loadingScreen.showLoadingScreen();
          }


          vm.uploadComplete = function (type) {
            vm.isLoading[type] = true;
            var isAllComplete = _.every(vm.files, function (file, type) {
              return vm.isLoading[type] === true;
            })
            if (isAllComplete) {
              loadingScreen.hideLoadingScreen();
            }
          }

          vm.fileSuccess = function(file, message)
          {
            vm.isLoading[type] = false;
            vm.isSuccess[type] = true;
            var isAllSuccess = _.every(vm.files, function (file, type) {
              return vm.isSuccess[type] === true;
            })
            if (isAllSuccess) {
              closeDialog();
            }
          }

          vm.fileError = function ($file, $message, type) {
            vm.files[type] = null;
            vm.isLoading[type] = false;
            vm.isSuccess[type] = false;
            vm.errors[type] = $message && $message.replace(/<[^>]+>/gm, '');
          }

          /**
           * Close the dialog
           */
          function closeDialog() {
            $mdDialog.cancel();
          }
        },
        controllerAs: 'vm',
        templateUrl: 'app/main/users/templates/user-import.dialog.html',
        parent: angular.element($document.body),
        targetEvent: e,
        clickOutsideToClose: true,
      }).then(function (response) {
        if (response === 'success') {
          vm.init();
        }
      });
    }
  }
})();
