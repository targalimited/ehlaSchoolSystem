(function ()
{
    'use strict';

    angular
        .module('app.homework.subjects.assignment')
        .controller('AssignmentController', AssignmentController);

    /** @ngInject */
    function AssignmentController(AssignmentData, breadcrumb, $scope)
    {
        var vm = this;

      $scope.breadcrumbs = breadcrumb.getBreadCrumbs();

        // Data
        vm.items = [{
          title: 'READING & LISTENING',
          deadline: '2016/10/09',
          questions: '3 Articles',
          remark: 'asdasd asdasd asdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd .....'
        },
          {
            title: 'WRITING',
            deadline: '2016/10/09',
            questions: '3 Articles',
            remark: 'asdasd asdasd asdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd .....'
          },
          {
            title: 'ASSESSMENT',
            deadline: '2016/10/09',
            questions: '1 Article',
            remark: 'asdasd asdasd asdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd .....'
          },
          {
            title: 'EXERCISE SETTING',
            deadline: '2016/10/09',
            questions: '30 Questions',
            remark: 'asdasd asdasd asdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd .....',
            'ui-sref': "app.homework.subjects.assignment.classes.class.exercises({ class: '3A' })",
          },
          {
            title: 'VIDEO',
            deadline: '',
            questions: '',
            remark: 'asdasd asdasd asdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd .....'
          }]

        // Methods

        //////////
    }
})();
