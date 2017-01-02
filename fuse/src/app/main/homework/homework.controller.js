(function ()
{
    'use strict';

    angular
        .module('app.homework')
        .controller('HomeworkController', HomeworkController);

    /** @ngInject */
    function HomeworkController(HomeworkData)
    {
        var vm = this;

        // Data
        vm.cards = [
          {
            "title": "EHL ACADEMY",
            "subtitle": "博立教育",
            "media": {
              "image": {
                "src": "assets/images/etc/early-sunrise.jpg",
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
