(function () {
    'use strict';

    angular
        .module('app.settings.academic-year.curriculums')
        .controller('CurriculumsController', CurriculumsController);

    /** @ngInject */
    function CurriculumsController() {


        var vm = this;

        // Data
        vm.cards = [
            {
                "title": "School-based Curriculums",
                "subtitle": "校本課程",
                "media": {
                    "image": {
                        "src": "assets/images/menu/ehla-course.jpeg",
                        "alt": "EHL ACADEMY"
                    }
                },
                "button-ui-sref": "app.settings.academic-year.curriculums.curriculum.subjects({ curriculum: 'school-based-curriculum' })",
            },
            {
                "title": "Supplementary Curriculums",
                "subtitle": "補充課程",
                "media": {
                    "image": {
                        "src": "assets/images/etc/early-sunrise.jpg",
                        "alt": "EHL ACADEMY"
                    }
                },
                "button-ui-sref": "app.settings.academic-year.curriculums.curriculum",
            },
        ];

        // Methods

        //////////
    }
})();
