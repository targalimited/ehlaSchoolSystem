(function ()
{
    'use strict';

    angular
        .module('app.homework.subjects.assignment.exercises')
        .controller('ExercisesController', ExercisesController);

    /** @ngInject */
    function ExercisesController(ExercisesData, breadcrumb, $state, $scope)
    {
        var vm = this;
      $scope.breadcrumbs = breadcrumb.getBreadCrumbs();

      vm.employees = ExercisesData.data;

      vm.dtOptions = {
        dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
        pagingType: 'simple',
        autoWidth : false,
        responsive: true,
        withButtons: [
          'columnsToggle',
          'colvis',
          'copy',
          'print',
          'excel',
          {
            text: 'Some button',
            key: '1',
            action: function (e, dt, node, config) {
              alert('Button activated');
            }
          }
        ]
      };

      vm.viewExerciseDetail = function (employee) {
        $state.go('app.homework.subjects.assignment.classes.class.exercises.exercise', { exerciseId: employee.id })
      }

    }
})();
