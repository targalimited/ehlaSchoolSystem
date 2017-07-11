(function () {
    'use strict';

    angular
        .module('app.homework.subjects.assignment.classes.class.consolidated-report')
        .controller('ConsolidatedReportController', ConsolidatedReportController);

    /** @ngInject */
    function ConsolidatedReportController(Restangular, $scope, breadcrumbs, breadcrumb, tableTree, $q, $state, $rootScope, $mdDialog, $document) {
        var vm = this;

        $scope.breadcrumbs = breadcrumbs;
        vm.dtOptions = {
            autoWidth: false,
            responsive: true,
        };

        vm.weaknesses = [];

        vm.showGraph = breadcrumb.showErrorBarChart;

        $scope.init = function () {
            $scope.loading = true;
            $q.all([
                breadcrumb.getCurriculumWeaknessList(breadcrumbs.teacherId, breadcrumbs.subjectId, breadcrumbs.classId),
                Restangular.one('teachers', breadcrumbs.teacherId).one('subjects', breadcrumbs.subjectId).one('classes', breadcrumbs.classId).one('result', 'consolidatedReport').get(),
            ])
                .then(function (results) {
                    var wk = results[0].curriculum;
                    var result = results[1].plain().data;
                    console.log(result);

                    var r = breadcrumb.getConsolidatedReport(result);

                    if (!r.length) {
                        $scope.loading = false;
                        return;
                    }

                    vm.categories = [];
                    (function check(wk) {
                        _.each(wk, function (w) {
                            if (w.child && w.child.length) {
                                check(w.child);
                            } else {
                                var found = _.find(r, function (fw) {
                                    //console.log('parseInt(w.id) === parseInt(fw.weakness_id)', parseInt(w.id), parseInt(fw.weakness_id), parseInt(w.id) === parseInt(fw.weakness_id));
                                    return parseInt(w.id) === parseInt(fw.weakness_id);
                                });
                                if (found) {
                                    vm.categories.push({
                                        id: w.categoryId,
                                        name_en: w.parentNameEN,
                                    });
                                    w.checkStatus = 'checked';
                                    _.assign(w, found);
                                }
                            }
                        })
                    })(wk)

                    vm.data = wk;
                    vm.categories = _.uniqBy(vm.categories, 'id');
                    $scope.applyFilter();
                })
                .catch(function (err) {
                    console.error('Cannot login', err);
                })
                .finally((function () {
                    $scope.loading = false;
                }));
        }


        $scope.init();


        vm.selectedCategories = ['-1'];
        vm.categories = [];
        $scope.expanded = {};

        $scope.toggleCheck = tableTree.toggleCheck(vm, $scope.expanded);
        $scope.isAllChecked = tableTree.isAllChecked(vm, $scope.expanded);
        $scope.toggleCheckAll = tableTree.toggleCheckAll(vm, $scope.expanded);
        $scope.isAllExpanded = tableTree.isAllExpanded(vm, $scope.expanded);
        $scope.toggleExpand = tableTree.toggleExpand(vm, $scope.expanded);
        $scope.toggleExpandAll = tableTree.toggleExpandAll(vm, $scope.expanded);
        $scope.propagateCheckFromParent = tableTree.propagateCheckFromParent(vm, $scope.expanded);
        $scope.verifyAllParentsCheckStatus = tableTree.verifyAllParentsCheckStatus(vm, $scope.expanded);
        $scope.applyFilter = tableTree.applyFilter(vm, $scope.expanded);
        vm.statusFilter = 'checked';

        // Methods

        vm.viewStudents = function (item) {
            $state.go('app.homework.subjects.assignment.classes.class.consolidated-report.consolidated-report-weakness.student-report', {
                weaknessId: item.id
            });
        }

        vm.back = function () {
            $state.go('app.homework.subjects.assignment')
        }

        //////////
    }
})();
