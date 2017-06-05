(function () {
    'use strict';

    angular
        .module('app.homework.subjects.assignment.classes.class.exercises.exercise')
        .controller('ExerciseController', ExerciseController);

    /** @ngInject */
    function ExerciseController(breadcrumbs, breadcrumb, tableTree, $scope, $state, $document, loadingScreen, $q, generalMessage, Restangular, $mdDialog) {
        var vm = this;
        $scope.breadcrumbs = breadcrumbs;
        $scope.currentDate = new Date();
        $scope.title = _.upperFirst(breadcrumbs.exerciseType);
        $scope.titleSingular = $scope.title.slice(0, $scope.title.length - 1);
        $scope.action = $state.params.exerciseId === 'create' ? 'Create' : 'Edit';
        $scope.isAssessment = breadcrumbs.exerciseType === 'assessments';
        $scope.isExamination = breadcrumbs.exerciseType === 'examinations';
        $scope.isExercise = breadcrumbs.exerciseType === 'exercises';
        $scope.assignmentName = $scope.titleSingular.toLowerCase();
        $scope.assignment = {question_type: 'random', compulsory: 1};
        $scope.assignmentQuestionRange = _.range(1, 11);
        vm.notificationTimeUnit = ['minutes', 'hours', 'days'];
        vm.notificationTypes = [{value: 'email', name: 'Email'}, {value: 'sms', name: 'SMS'}];


        vm.getRate = function (v) {
            return _.isUndefined(v) ? '-' : v;
        }

        vm.getAssignmentQT = function (qt) {
            return _.upperFirst(qt);
        }

        vm.assignDifficulty = function (ev, item) {
            $mdDialog.show({
                controller: function (weakness, isExamination, isExercise, isDisableEdit, $mdDialog) {
                    var vm = this;
                    vm.weakness = weakness;
                    vm.difficulties = [{name: 'Easy', value: 0}, {name: 'General', value: 1}, {name: 'Advanced', value: 2}, {name: 'Challenging', value: 3}];
                    vm.types = [{name: 'MC', value: 0}, {name: 'Short Question', value: 1}, {name: 'Long Question', value: 2}, {name: 'Matching', value: 3}];
                    if (!vm.weakness.weakness_set) {
                        vm.weakness.weakness_set = [{}];
                    }
                    vm.form = _.clone(vm.weakness.weakness_set);
                    vm.isExamination = isExamination;
                    vm.isExercise = isExercise;
                    vm.assignmentQuestionRange = _.range(1, 11);
                    vm.isDisableEdit = isDisableEdit;
                    vm.cancel = vm.closeDialog = function () {
                        $mdDialog.hide();
                    }

                    vm.addQuestion = function () {
                        vm.form.push({});
                    }
                    vm.removeQuestion = function () {
                        vm.form.pop();
                    }

                    vm.save = function () {
                        vm.weakness.weakness_set = _.filter(vm.form, function (f) {
                            return f.questions > 0;
                        });
                        vm.weakness.question_qty = _.sumBy(vm.form, function (f) {
                            return f.questions;
                        })
                        $mdDialog.hide();
                    }
                },
                controllerAs: 'vm',
                templateUrl: 'app/main/homework/subjects/assignment/classes/class/exercises/exercise/templates/assign-difficulty.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                escapeToClose: true,
                locals: {
                    weakness: item,
                    event: ev,
                    isExamination: $scope.isExamination,
                    isExercise: $scope.isExercise,
                    isDisableEdit: vm.isDisableEdit,
                }
            });
        }

        vm.isDisableEdit = function () {
            return $scope.action === 'View';
        }

        vm.showGraph = breadcrumb.showErrorBarChart;

        $scope.init = function () {
            $scope.loading = true;
            var promises = [breadcrumb.getCurriculumWeaknessList(breadcrumbs.teacherId, breadcrumbs.subjectId, breadcrumbs.classId)];

            if ($scope.action === 'Edit') {
                // assignment details
                promises.push(Restangular.one('teachers', breadcrumbs.teacherId).one('subjects', breadcrumbs.subjectId).one('classes', breadcrumbs.classId).one('assignments/' + $scope.assignmentName, $state.params.exerciseId).get());
            } else {
                promises.push(null);
            }

            // report
            promises.push(Restangular.one('teachers', breadcrumbs.teacherId).one('subjects', breadcrumbs.subjectId).one('classes', breadcrumbs.classId).one('result', 'consolidatedReport').get());

            promises.push(Restangular.one('academicSettings').get());

            $q.all(promises)
                .then(function (results) {
                    var weaknessList = results[0].curriculum;
                    vm.categories = results[0].categories;
                    console.log(weaknessList);
                    var progress = results[0].progress;
                    var history = breadcrumb.getConsolidatedReport(results[2].plain().data);
                    var filterWeaknessId = [];
                    vm.academicYears = results[3].plain().data;



                    if ($scope.action === 'Edit') {
                        $scope.assignment = results[1].plain();
                        if (breadcrumbs.exerciseType === 'examinations') {
                            $scope.assignment.question_type = 'preset';
                        }
                    }
                    var currentSem = _.find(vm.academicYears, function (year) {
                        return year.current_sem === 1;
                    });

                    if (_.isUndefined($scope.assignment.academic_id) && currentSem) {
                        $scope.assignment.academic_id = currentSem.id;
                    }

                    console.log('history', history);

                    (function prepare(weaknessList) {
                        var data = {checkedIds: [], filteredIds: []};
                        _.each(weaknessList, function (weakness) {
                            if (weakness.child && weakness.child.length) {
                                var result = prepare(weakness.child);
                                if (result.filteredIds.length === weakness.child.length) {
                                    data.filteredIds.push(weakness.id);
                                    filterWeaknessId.push(weakness.id);
                                    return;
                                }
                                if (result.checkedIds && result.checkedIds.length > 0) {
                                    $scope.expanded[weakness.id] = true;
                                    if (result.checkedIds.length === weakness.child.length) {
                                        weakness.checkStatus = 'checked';
                                    } else {
                                        weakness.checkStatus = 'partlyChecked';
                                    }
                                    data.checkedIds.push(weakness.id);
                                }
                            } else {
                                // only show assessed weakness
                                var isAssessed = _.some(history, function (p) {
                                    if (parseInt(weakness.id) === parseInt(p.weakness_id)) {
                                        _.assign(weakness, p);
                                        return true;
                                    }
                                })

                                if (breadcrumbs.exerciseType === 'assessments') {
                                    // only show progress weakness
                                    var isInProgress = _.some(progress, function (p) {
                                        return parseInt(weakness.id) === p.weakness_id;
                                    });

                                    if (!isInProgress) {
                                        data.filteredIds.push(weakness.id);
                                        filterWeaknessId.push(weakness.id);
                                        return;
                                    }
                                } else if (!isAssessed) {
                                    data.filteredIds.push(weakness.id);
                                    filterWeaknessId.push(weakness.id);
                                    return;
                                }

                                if ($scope.action === 'Edit') {
                                    var a = _.find($scope.assignment.assignment_items, function (p) {
                                        return parseInt(weakness.id) === p.weakness_id;
                                    });

                                    if (a) {
                                        data.checkedIds.push(weakness.id);
                                        weakness.checkStatus = 'checked';
                                        weakness.question_qty = a.question_qty;
                                    }
                                }
                            }
                        });

                        return data;
                    })(weaknessList);

                    console.log('filterWeaknessId', filterWeaknessId);
                    if (filterWeaknessId.length) {
                        (function filter(weaknessList) {
                            _.remove(weaknessList, function (weakness) {
                                var isRemove = _.indexOf(filterWeaknessId, weakness.id) !== -1;
                                if (isRemove) {
                                    return true;
                                } else if (weakness.child && weakness.child.length) {
                                    filter(weakness.child);
                                }
                            });
                        })(weaknessList);
                    }

                    if ($scope.action === 'Edit' && $scope.assignment) {
                        var now = new Date();
                        if (moment($scope.assignment.end_date).isBefore(now)) {
                            $scope.condition = '(Completed)';
                            $scope.action = 'View';
                        } else if (moment($scope.assignment.start_date).isBefore(now)) {
                            $scope.condition = '(In Progress)';
                            $scope.action = 'View';
                        }
                    }

                    vm.categories = _.map(weaknessList, function (w) {
                        return {
                            id: w.id,
                            name_en: w.name_en,
                            name_zh: w.name_zh,
                        }
                    })

                    vm.data = weaknessList;
                    $scope.applyFilter();
                })
                .catch(function (err) {
                    console.error('Cannot login', err);
                })
                .finally((function () {
                    $scope.loading = false;
                }));
        }

        $scope.back = function () {
            $state.go('app.homework.subjects.assignment.classes.class.exercises')
        }

        $scope.createAssignment = function () {
            var promise;
            loadingScreen.showLoadingScreen();
            $scope.assignment.weaknesses = [];
            (function getChecked(data) {
                _.each(data, function (d) {
                    if (d.child && d.child.length) {
                        getChecked(d.child);
                    } else if (d.checkStatus === 'checked' && d.question_qty) {
                        $scope.assignment.weaknesses.push({
                            weakness_id: d.id,
                            question_qty: d.question_qty,
                            "weakness_set": _.reduce(d.weakness_set, function (result, ws) {
                                if (!ws.questions) {
                                    return result;
                                }

                                _.each(_.range(ws.questions), function () {
                                    result.push({
                                        "marks": ws.marks,
                                        "difficulty": ws.difficulty,
                                        "question_type": ws.question_type
                                    })
                                })

                                return result;
                            }, [])
                        });
                    }
                })
            })(vm.data);
            $scope.assignment.type = $scope.assignmentName;
            $scope.assignment.start_date = moment($scope.assignment.start_date).format('YYYY-MM-DD HH:mm:ss');
            $scope.assignment.end_date = moment($scope.assignment.end_date).format('YYYY-MM-DD HH:mm:ss');
            $scope.assignment.compulsory = _.parseInt($scope.assignment.compulsory) === 1 ? 1 : 0;
            // $scope.assignment.question_type = 'preset';

            if ($scope.action === 'Create') {
                promise = Restangular.service('teachers/' + breadcrumbs.teacherId + '/subjects/' + breadcrumbs.subjectId + '/classes/' + breadcrumbs.classId + '/assignments/' + $scope.assignmentName).post($scope.assignment)
            } else {
                promise = Restangular.all('teachers/' + breadcrumbs.teacherId + '/subjects/' + breadcrumbs.subjectId + '/classes/' + breadcrumbs.classId + '/assignments/' + $scope.assignmentName + '/' + $scope.assignment.id).customPUT($scope.assignment)
            }

            promise
                .then(function (res) {
                    console.log(res);
                    generalMessage.showMessageToast('success', 'Assignment ' + $scope.action + ' successfully.')
                    $state.go('app.homework.subjects.assignment.classes.class.exercises');
                })
                .catch(function (err) {
                    console.error('Cannot login', err);
                    generalMessage.showMessageToast('error', 'Assignment ' + $scope.action + ' unsuccessfully.')
                })
                .finally(function () {
                    loadingScreen.hideLoadingScreen();
                })
        }


        // vm.data = ExerciseData.data;
        vm.selectedCategories = ['-1'];
        vm.categories = [];
        $scope.expanded = {};

        $scope.toggleCheck = tableTree.toggleCheck(vm);
        $scope.isAllChecked = tableTree.isAllChecked(vm);
        $scope.toggleCheckAll = tableTree.toggleCheckAll(vm);
        $scope.isAllExpanded = tableTree.isAllExpanded(vm, $scope.expanded);
        $scope.toggleExpandAll = tableTree.toggleExpandAll(vm, $scope.expanded);
        $scope.propagateCheckFromParent = tableTree.propagateCheckFromParent(vm);
        $scope.verifyAllParentsCheckStatus = tableTree.verifyAllParentsCheckStatus(vm);
        $scope.applyFilter = tableTree.applyFilter(vm);

        $scope.init();
    }
})();
