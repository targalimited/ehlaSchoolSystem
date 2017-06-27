(function () {
    'use strict';

    angular
        .module('app.settings.academic-year.curriculums.curriculum.subjects')
        .controller('CurriculumsSubjectsController', CurriculumsSubjectsController);

    /** @ngInject */
    function CurriculumsSubjectsController($scope, $rootScope, breadcrumbs, Restangular) {
        var vm = this;
        $scope.breadcrumbs = breadcrumbs;

        vm.init = function () {
            vm.subjects = breadcrumbs.allSubjects;
        };

        vm.init();
    }
})();
