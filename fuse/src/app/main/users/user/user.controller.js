(function () {
  'use strict';

  angular
    .module('app.users.user')
    .controller('UserController', UserController);

  /** @ngInject */
  function UserController($scope, $state, breadcrumbs, generalMessage, loadingScreen, Restangular, $q) {
    var vm = this;

    $scope.breadcrumbs = breadcrumbs;
    $scope.userId = $state.params.userId;
    $scope.action = $scope.userId === 'create' ? 'create' : 'edit';
    $scope.title = _.upperFirst($scope.action);
    // Data
    $scope.user = {};

    $scope.roles = breadcrumbs.roles;
    $scope.teachers = [];
    $scope.subjects = breadcrumbs.allSubjects;
    $scope.classes = breadcrumbs.allClasses;
    // console.log(vm.classes, vm.subjects);

    $scope.init = function () {
      loadingScreen.showLoadingScreen();
      $q.all([
        $scope.action === 'create' ? {} : Restangular.one('user', $scope.userId).get(),
        Restangular.one('user_list').get(),
      ])
        .then(function (results) {
          $scope.user = $scope.action === 'create' ? { roles: [], class_subject: [{}] } : results[0].plain().data;
          $scope.user.password = '';
          if (!$scope.user.class_subject || !$scope.user.class_subject.length) {
            $scope.user.class_subject = [{}];
          }
          console.log('@@@',  $scope.user)
          if ($scope.user.teacher_classes_subjects) {
            $scope.user.class_subject = $scope.user.teacher_classes_subjects;
            _.each($scope.user.class_subject, function (i) {
              i.class = i.classes;
              i.subject = i.subjects;
              i.teacher = i.teachers;
            })
          }

          if (_.isUndefined($scope.user.class_id) && $scope.user.class_subject.length) {
            $scope.user.class_id = $scope.user.class_subject[0].class.id;
          }

          var userList = results[1].plain().data;
          $scope.teachers = _.filter(userList, function (u) {
            return $scope.isRole('Teacher', u.roles)
          })
        })
        .catch(function (err) {
          console.error('Cannot login', err);
        })
        .finally((function () {
          loadingScreen.hideLoadingScreen();
        }));

    }

    $scope.init();

    $scope.deleteClass = function ($event, c) {
      _.remove($scope.user.class_subject, function (a) {
        return a.id === c.id;
      })
    }

    $scope.isRole = function (roleName, roles) {
      return $scope.user && _.some(roles || $scope.user.roles, function (role) {
        return _.parseInt(role.id) === _.parseInt(_.find($scope.roles, function (r) {
          return r.name === roleName
        }).id);
      })
    }

    $scope.searchTextItems = function (query, items) {
      return query ? _.filter(items, function (c) {
        var name = c.c_name || c.s_name_en || c.name || c.username;
        return (name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
      }) : items;
    }

    $scope.addClass = function () {
      $scope.user.class_subject.push({ id: $scope.user.class_subject.length });
    }

    $scope.back = function () {
      $state.go('app.users')
    }
    
    $scope.saveUser = function () {
      loadingScreen.showLoadingScreen();
      if (_.isUndefined($scope.user.class_id) && $scope.user.class_subject.length) {
        $scope.user.class_id = $scope.user.class_subject[0].class.id;
      }
      var promise = $scope.action === 'create' ?
        Restangular.service($scope.isRole('Student') ? 'student_single' : 'teacher_single').post($scope.user) :
        Restangular.all($scope.isRole('Student') ? 'student_single' : 'teacher_single').customPUT($scope.user);

      promise
        .then(function (results) {
          generalMessage.showMessageToast('success', 'User ' + $scope.action + ' successfully.');
          $scope.back();
        })
        .catch(function (err) {
          console.error('Cannot login', err);
          generalMessage.showMessageToast('error', 'User ' + $scope.action + ' unsuccessfully.');
        })
        .finally((function () {
          loadingScreen.hideLoadingScreen();
        }));
    }

    //////////
  }
})();
