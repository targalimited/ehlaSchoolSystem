(function ()
{
    'use strict';

    angular
        .module('app.homework.subjects.assignment.exercises.exercise')
        .controller('ExerciseController', ExerciseController);

    /** @ngInject */
    function ExerciseController(ExerciseData, breadcrumb, $scope)
    {
        var vm = this;
      $scope.breadcrumbs = breadcrumb.getBreadCrumbs();

    }
})();
