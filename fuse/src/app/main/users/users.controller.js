(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('UsersController', UsersController);

  /** @ngInject */
  function UsersController($scope, $state, $timeout, $compile, msUtils, UsersData, generalMessage, loadingScreen, Restangular) {
    var vm = this;

    // Data
    vm.data = UsersData.data;
    _.each(vm.data, function (u) {
      u.roles = [Math.floor(Math.random() * 2)];
      u.status = Math.floor(Math.random() * 2);
    });
    vm.selectedRoles = [-1];
    vm.selectedStatus = [-1];
    vm.roles = [
      { id: 0, name: 'Student' },
      { id: 1, name: 'Teacher' },
    ];
    vm.statuses = [
      { id: 0, name: 'Active' },
      { id: 1, name: 'Inactive' },
    ];
    vm.displayRoles = msUtils.displayRoles;
    vm.displayUserStatus = function (status) {
      switch (true) {
        case parseInt(status) === 0:
          return 'Active';
        case parseInt(status) === 1:
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

    initFilter();


    $scope.filterStatus = function (user) {
      // console.log('xxxx', user);
      return _.some(vm.selectedStatus, function (r) {
        return parseInt(r) === -1 || parseInt(user.status) === parseInt(r);
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
            return parseInt(role) === parseInt(r);
          });
      });
    };


    $scope.viewUserDetails = function (user) {
      $state.go('app.users.user', { userId: user.id });
    };

    vm.createUser = function () {
      $state.go('app.users.user', { userId: 'create' })
    }
    //////////
  }
})();
