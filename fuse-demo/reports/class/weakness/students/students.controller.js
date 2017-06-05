(function ()
{
    'use strict';

    angular
        .module('app.reports.class.weakness.students')
        .controller('StudentsController', StudentsController);

    /** @ngInject */
    function StudentsController($state, StudentsData)
    {
        var vm = this;

        // Data
        vm.students = StudentsData.data;


        // Methods
      vm.viewPersonalReport = function (student) {
        $state.go('app.reports.class.weakness.students.student.report', { studentId: student.id })
      };
        //////////
    }
})();
