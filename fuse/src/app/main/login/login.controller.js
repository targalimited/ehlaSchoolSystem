(function () {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', ['$http', '$rootScope', '$scope', '$state', 'errorMessage', 'Restangular', LoginController]);

  /** @ngInject */
  function LoginController($http, $rootScope, $scope, $state, errorMessage, Restangular) {
    var vm = this;

    // Data
    console.log(localStorage.getItem('access_token'))


    // Methods

    vm.login = function () {
      $scope.isLoading = true;
      Restangular.all('userApi/login').post({
        params: {
          "username": vm.form.email,
          "password": vm.form.password
        }
      })
        .then(function (res) {
          const result = res.plain();
          localStorage.setItem('access_token', result['remember_token']);
          localStorage.setItem('teacherId', result.user_id);
          localStorage.setItem('user', JSON.stringify(result));
          $rootScope.user = result;
          $state.go('app.home');
        })
        .catch(function (err) {
          console.error('Cannot login', err);
          errorMessage.showErrorMessageToast('error', 'Login Failed: please make sure your username and password are correct.');
        })
        .finally(function () {
          $scope.isLoading = false;
        })

    };

    //////////
  }


})();
