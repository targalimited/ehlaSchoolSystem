(function () {
    'use strict';

    angular
        .module('app.homework.subjects')
        .controller('SubjectsController', SubjectsController);

    /** @ngInject */
    function SubjectsController($rootScope, breadcrumbs, Restangular) {
        var vm = this;

        vm.init = function () {
            vm.subjects = breadcrumbs.subjects;
        };

        vm.init();
    }
})();
