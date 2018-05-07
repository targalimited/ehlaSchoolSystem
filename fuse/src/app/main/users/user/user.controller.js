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
    $scope.user = {
      name: 'hong304@gmail.com',
      roles: [0],
      classes: [
        { id:0, className: '1A', subject: 'English', user: 'Professor Hong' },
        {  id:1, className: '1A', subject: 'Math', user: 'Mad Scientist Kyo' },
        {  id:2, className: '1A', subject: 'Chinese', user: 'Ming' },
        {  id:3, className: '1A', subject: 'Computer', user: 'Alan Turing' },
      ]
    };
    vm.roles = breadcrumbs.roles;
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
