(function () {
  'use strict';

  angular
    .module('app.users.user')
    .controller('UserController', UserController);

  /** @ngInject */
  function UserController($scope, $state, breadcrumbs, generalMessage, loadingScreen, Restangular) {
    var vm = this;

    $scope.breadcrumbs = breadcrumbs;
    $scope.userId = $state.params.userId;
    $scope.isCreate = $scope.userId === 'create';
    // Data
    $scope.user = breadcrumbs.user;
    vm.roles = [
      { id: 0, name: 'Student' },
      { id: 1, name: 'Teacher' },
      { id: 2, name: 'Director' },
      { id: 3, name: 'Principal' },
    ];
    vm.users = [
      { id: 0, name: 'Professor Hong' },
      { id: 1, name: 'Mad Scientist Kyo' },
      { id: 2, name: 'Ming' },
      { id: 3, name: 'Alan Turing' },
    ];
    vm.subjects = breadcrumbs.allSubjects;
    vm.classes = breadcrumbs.allClasses;
    // console.log(vm.classes, vm.subjects);

    vm.deleteClass = function ($event, c) {
      _.remove($scope.user.classes, function (a) {
        return a.id === c.id;
      })
    }

    vm.searchTextItems = function (query, items) {
      return query ? _.filter(items, function (c) {
        var name = c.c_name || c.s_name_en || c.name;
        return (name.toLowerCase().indexOf(query.toLowerCase()) === 0);
      }) : items;
    }

    $scope.addClass = function () {
      $scope.user.classes.push({ id: $scope.user.classes.length });
    }

    $scope.back = function () {
      $state.go('app.users')
    }
    
    $scope.saveUser = function () {
      
    }

    //////////
  }
})();
