(function ()
{
    'use strict';

    angular
        .module('app.homework.subjects')
        .controller('SubjectsController', SubjectsController);

    /** @ngInject */
    function SubjectsController(SubjectsData)
    {
        var vm = this;

        // Data
      vm.subjects = [
        {
          "title": "Chinese",
          "subtitle": "中國語文",
          "media": {
            "image": {
              "src": "assets/images/etc/early-sunrise.jpg",
              "alt": "EHL ACADEMY"
            }
          },
          "button-ui-sref": "app.homework.subjects.assignment({ subject: 'chinese' })",
        },
        {
          "title": "English",
          "subtitle": "英國語文",
          "media": {
            "image": {
              "src": "assets/images/etc/early-sunrise.jpg",
              "alt": "EHL ACADEMY"
            }
          },
          "button-ui-sref": "app.homework.subjects.assignment({ subject: 'english' })",
        },
        {
          "title": "Mathematics",
          "subtitle": "數學",
          "media": {
            "image": {
              "src": "assets/images/etc/early-sunrise.jpg",
              "alt": "EHL ACADEMY"
            }
          },
          "button-ui-sref": "app.homework.subjects.assignment({ subject: 'mathematics' })",
        },
      ];
    }
})();
