(function ()
{
    'use strict';

    angular
        .module('app.homework')
        .controller('HomeworkController', HomeworkController);

    /** @ngInject */
    function HomeworkController()
    {



        var vm = this;

        // Data
        vm.cards = [
          {
            "title": "EHLA i-Education",
            "subtitle": "博立智能教育",
            "media": {
              "image": {
                "src": "assets/images/menu/ehla-course.jpeg",
                "alt": "EHL ACADEMY"
              }
            },
            "button-ui-sref": "app.homework.subjects",
          },
        ];

        // Methods

        //////////
    }
})();
