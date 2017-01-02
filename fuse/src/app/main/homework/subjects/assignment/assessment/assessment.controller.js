(function ()
{
    'use strict';

    angular
        .module('app.homework.subjects.assessment')
        .controller('AssessmentController', AssessmentController);

    /** @ngInject */
    function AssessmentController(AssessmentData, $state)
    {
        var vm = this;

      vm.title = _.toUpper($state.params.subject);

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
            remark: 'asdasd asdasd asdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd .....'
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
