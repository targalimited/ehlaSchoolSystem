(function ()
{
    'use strict';

    angular
        .module('app.reports', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.reports', {
                url    : '/reports',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/reports/reports.html',
                        controller : 'ReportsController as vm'
                    }
                },
                resolve: {
                    breadcrumbs: function (breadcrumb, $stateParams) {
                        return breadcrumb.getBreadCrumbs($stateParams);
                    },
                },
                ncyBreadcrumb: {
                    label: 'Reports'
                },
                authenticate: true,
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/reports');

        // Navigation
        msNavigationServiceProvider.saveItem('fuse.reports', {
            title    : 'Reports',
            icon     : 'icon-trending-up',
            state    : 'app.reports',
            /*stateParams: {
             'param1': 'page'
             },*/
            translate: 'REPORT.REPORT_NAV',
            weight   : 3
        });
    }
})();


(function () {
    'use strict';

    angular
        .module('app.reports')
        .controller('ReportsController', ReportsController);

    /** @ngInject */
    function ReportsController(Restangular, $scope, breadcrumbs, $q, $state, loadingScreen) {
        var vm = this;

        vm.dtOptions = {
            autoWidth: false,
            responsive: true,
        };

        vm.classes = [];
        vm.classRes = {};
        vm.weaknesses = [];

        $scope.init = function () {
            loadingScreen.showLoadingScreen();
            Restangular.one('classes/teachers', breadcrumbs.teacherId).get()
                .then(function (results) {
                    var classes = results.plain().data;
                    vm.classes = _.uniq(_.map(classes, 'c_name'));
                    vm.classRes = _.reduce(classes, function (result, item) {
                        if (!result[item.c_name]) {
                            result[item.c_name] = item.id;
                        }
                        return result;
                    }, {});

                    vm.switchClass(vm.classes[0]);

                })
                .catch(function (err) {
                    console.error('Cannot login', err);
                })
                .finally((function () {
                    loadingScreen.hideLoadingScreen();
                }));
        }


        $scope.init();

        vm.switchClass = function (item) {
            vm.chosenClass = item;
            var classId = vm.classRes[vm.chosenClass];
            $scope.tableLoading = true;
            vm.weaknesses = [];
            Restangular.one('teachers', breadcrumbs.teacherId).one('classes', classId).one('result', 'history').get()
                .then(function (results) {
                    var result = results.plain().data;
                    console.log(result);
                    var a;
                    var r = _.reduce(result.weaknesses, function (ra, value) {
                        if (!ra[value.weakness_id]) {
                            var history = {};
                            a = _.find(result.assignments, function (a) {
                                return a.id === value.assignment_id;
                            });
                            history[value.assignment_id] = {
                                sort: a.end_date,
                                correct: parseInt(value.correctRate),
                                total: parseInt(value.total),
                            };
                            ra[value.weakness_id] = {
                                weakness_id: value.weakness_id,
                                history: history,
                                correct: parseInt(value.correctRate),
                                total: parseInt(value.total),
                            }
                        } else {
                            if (ra[value.weakness_id].history[value.assignment_id]) {
                                ra[value.weakness_id].history[value.assignment_id].correct += parseInt(value.correctRate);
                                ra[value.weakness_id].history[value.assignment_id].total += parseInt(value.total);
                            } else {
                                a = _.find(result.assignments, function (a) {
                                    return a.id === value.assignment_id;
                                });
                                ra[value.weakness_id].history[value.assignment_id] = {
                                    sort: a.end_date,
                                    correct: parseInt(value.correctRate),
                                    total: parseInt(value.total),
                                };
                            }

                            ra[value.weakness_id].correct += parseInt(value.correctRate);
                            ra[value.weakness_id].total += parseInt(value.total);
                        }
                        return ra;
                    }, {})
                    _.each(r, function (b) {
                        b.history = _.orderBy(b.history, 'sort', 'desc');
                    });

                    if (!_.keys(r).length) {
                        $scope.tableLoading = false;
                        return;
                    }

                    Restangular.service('weaknessApi/get_by_ids').post({
                        params: {
                            "id": _.map(_.keys(r), function (a) {
                                return parseInt(a);
                            }),
                        },
                    })
                        .then(function (results) {
                            var wl = results.plain().data;
                            vm.weaknesses = _.values(r);
                            _.each(r, function (w, wid) {
                                var b = _.find(wl, function (wa) {
                                    return parseInt(wa.id) === parseInt(wid);
                                });
                                w.name = b.name;
                                w.id = b.id;
                            })

                            console.log(vm.weaknesses);
                        })
                        .catch(function (err) {
                            console.error('Cannot login', err);
                        })
                        .finally((function () {
                            $scope.tableLoading = false;
                        }));
                })
                .catch(function (err) {
                    $scope.tableLoading = false;
                    console.error('Cannot login', err);
                })
                .finally((function () {
                }));


            // $state.go('app.reports.students', {reportsId: reports.categoryId});
        }
        // Methods

        vm.viewClass = function (item) {
            $state.go('app.reports.class.weakness.students', {
                classId: vm.classRes[vm.chosenClass],
                weaknessId: item.id
            });
        }

        //////////
    }
})();
