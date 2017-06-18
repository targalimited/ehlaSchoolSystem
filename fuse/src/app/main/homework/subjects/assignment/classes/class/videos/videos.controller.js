(function () {
    'use strict';

    angular
        .module('app.homework.subjects.assignment.classes.class.videos', [
            'ui.tree',
            'app.homework.subjects.assignment.classes.class.videos.video-weakness'
        ])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider) {
        // State
        $stateProvider
            .state('app.homework.subjects.assignment.classes.class.videos', {
                url: '/videos',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/homework/subjects/assignment/classes/class/videos/videos.html',
                        controller: 'VideosController as vm'
                    }
                },
                resolve: {
                    breadcrumbs: function (breadcrumb, $stateParams) {
                        return breadcrumb.getBreadCrumbs($stateParams);
                    },
                },
                ncyBreadcrumb: {
                    label: 'Videos',
                },
                authenticate: true,
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment/classes/class/videos');
    }
})();


(function () {
    'use strict';

    angular
        .module('app.homework.subjects.assignment.classes.class.videos')
        .controller('VideosController', VideosController);

    /** @ngInject */
    function VideosController($rootScope, breadcrumb, breadcrumbs, msUtils, tableTree, loadingScreen, Restangular, $scope, $state, $mdDialog) {
        var vm = this;
        $scope.breadcrumbs = breadcrumbs;
        $scope.currentDate = new Date();

        vm.assigned = {
            categories: [],
            data: [],
            topicsSearch: '',
            selectedCategories: ['-1'],
            statusFilter: 'all',
        };
        vm.unassigned = {
            categories: [],
            data: [],
            topicsSearch: '',
            selectedCategories: ['-1'],
            statusFilter: 'all',
        };

        $scope.init = function () {
            $scope.loading = true;
            breadcrumb.getWeaknessList(breadcrumbs.subjectId)
                .then(function (results) {
                    vm.assigned.data = _.cloneDeep(results.data);
                    (function assign(nodes) {
                        _.each(nodes, function (node) {
                            if (node.child && node.child.length) {
                                assign(node.child);
                            } else {
                                node.selectedVideos = {};
                                node.selectedVideos[node.concept_video_ids[0]] = true;
                                node.start_date = moment().add(-(Math.floor(Math.random() * 10)), 'days').format('YYYY-MM-DD HH:mm:ss');
                                node.end_date = moment().add((Math.ceil(Math.random() * 10)), 'days').format('YYYY-MM-DD HH:mm:ss');
                            }
                        });
                    })(vm.assigned.data);
                    vm.assigned.categories = _.cloneDeep(results.categories);

                    vm.unassigned.data = _.cloneDeep(results.data);
                    console.log(vm.unassigned.data)
                    vm.unassigned.categories = _.cloneDeep(results.categories);

                    $scope.applyFilterAssigned();
                    $scope.applyFilterUnassigned();
                })
                .catch(function (err) {
                    console.error('Cannot login', err);
                })
                .finally((function () {
                    $scope.loading = false;
                }));
        }

        vm.displayAssigned = function (node) {
            var vid;
            var assigned = _.reduce(node.selectedVideos, function (result, s, id) {
                if (s) {
                    vid = id;
                    result++;
                }
                return result;
            }, 0);

            var vname = node.videoList && node.videoList.length ? (node.videoList[0].name_en || node.videoList[0].name_zh) : '-';

            // for demo only
            if (!node.videoList) {
                var randomName = [
                    { id: 1, name: 'Living on a Farm' },
                    { id: 2, name: 'Being an Eagle' },
                    { id: 3, name: 'A Trip to the Doctor' },
                    { id: 4, name: 'Going to the Dentist' },
                ]

                if (!node.randomName) {
                    node.randomName = randomName[Math.floor(Math.random() * 4)].name;
                }
                vname = node.randomName;
            }


            return assigned > 0 ? ( assigned === 1 ? vname : 'Assigned ' + assigned + ' Video(s)' ) : 'Select Video'
        }

        vm.randomVideoProgress = function (node) {
            node.totalStudents = 40;
            node.totalCompleted = Math.floor(Math.random() * node.totalStudents);
            node.progressPercentage = Math.ceil(node.totalCompleted / node.totalStudents * 100);
        };

        vm.selectVideo = function (ev, item, isViewOnly) {
            $mdDialog.show({
                controller: function (node, isViewOnly, videos, $sce, $mdDialog) {
                    var vm = this;
                    vm.node = node;
                    node.videoList = videos;
                    vm.isEditable = !isViewOnly;
                    vm.cancel = vm.closeDialog = function () {
                        _.each(node.videoList, function (v) {
                            v.isPreview = false;
                            v.player = null;
                        });
                        $mdDialog.hide();
                    };

                    vm.displayLanguage = msUtils.displayLanguage;

                    vm.trustSrc = function(src) {
                        return $sce.trustAsResourceUrl(src);
                    };

                    vm.showTutor = function(v) {
                        v.isShowTutor = !v.isShowTutor;
                        v.tutors = [v.tutor];
                    }

                    vm.preview = function (video) {
                        video.isPreview = !video.isPreview;

                        if (video.isPreview) {
                            if (!video.player) {
                                var media = video.media[0];
                                video.player = new Clappr.Player({
                                    source: media.file_path_hls || media.file_path,
                                    parentId: "#video" + video.id,
                                    poster: 'assets/images/backgrounds/home_banner.png',
                                    width: '100%',
                                    height: 500,
                                });
                            }
                            video.player.play();
                        } else {
                            video.player.pause();
                        }
                    };

                    vm.save = function () {
                        vm.closeDialog();
                    }
                },
                controllerAs: 'vm',
                templateUrl: 'app/main/homework/subjects/assignment/classes/class/videos/templates/assign-video.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                escapeToClose: true,
                resolve: {
                    videos: function () {
                        if (item.videoList) {
                            return item.videoList;
                        }

                        loadingScreen.showLoadingScreen();
                        return Restangular.service('itemApi/get_by_ids').post({ params: { ids: item.concept_video_ids }}).then(function (results) {
                            return results.plain().data;
                        })
                            .catch(function (err) {
                                console.log('err', err);
                            })
                            .finally(function () {
                                loadingScreen.hideLoadingScreen();
                            })
                    }
                },
                locals: {
                    node: item,
                    isViewOnly: isViewOnly,
                    event: ev,
                }
            });
        }


        $scope.expandedAssigned = {};
        $scope.expandedUnassigned = {};

        $scope.toggleCheckAssigned = tableTree.toggleCheck(vm.assigned);
        $scope.isAllCheckedAssigned = tableTree.isAllChecked(vm.assigned);
        $scope.toggleCheckAllAssigned = tableTree.toggleCheckAll(vm.assigned);
        $scope.isAllExpandedAssigned = tableTree.isAllExpanded(vm.assigned, $scope.expandedAssigned);
        $scope.toggleExpandAssigned = tableTree.toggleExpand(vm, $scope.expandedAssigned);
        $scope.toggleExpandAllAssigned = tableTree.toggleExpandAll(vm.assigned, $scope.expandedAssigned);
        $scope.propagateCheckFromParentAssigned = tableTree.propagateCheckFromParent(vm.assigned);
        $scope.verifyAllParentsCheckStatusAssigned = tableTree.verifyAllParentsCheckStatus(vm.assigned);
        $scope.applyFilterAssigned = tableTree.applyFilter(vm.assigned);

        $scope.toggleCheckUnassigned = tableTree.toggleCheck(vm.unassigned);
        $scope.isAllCheckedUnassigned = tableTree.isAllChecked(vm.unassigned);
        $scope.toggleCheckAllUnassigned = tableTree.toggleCheckAll(vm.unassigned);
        $scope.isAllExpandedUnassigned = tableTree.isAllExpanded(vm.unassigned, $scope.expandedUnassigned);
        $scope.toggleExpandUnassigned = tableTree.toggleExpand(vm, $scope.expandedUnassigned);
        $scope.toggleExpandAllUnassigned = tableTree.toggleExpandAll(vm.unassigned, $scope.expandedUnassigned);
        $scope.propagateCheckFromParentUnassigned = tableTree.propagateCheckFromParent(vm.unassigned);
        $scope.verifyAllParentsCheckStatusUnassigned = tableTree.verifyAllParentsCheckStatus(vm.unassigned);
        $scope.applyFilterUnassigned = tableTree.applyFilter(vm.unassigned);

        $scope.applyFilterAssigned();
        $scope.applyFilterUnassigned();

        $scope.section = 'unassigned';

        $scope.init();

        vm.isAnyUnassignedSelected = function () {
            return (function r(nodes) {
                return _.some(nodes, function (node) {
                    if (node.checkStatus === 'partlyChecked' || node.checkStatus === 'checked') {
                        return true;
                    }
                })
            })(vm.unassigned.data);
        }


        vm.switchSection = function (section) {
            $scope.section = section;
            $rootScope.chosenVideoSection = section;
        }

        vm.back = function () {
            $state.go('app.homework.subjects.assignment');
        }

        vm.viewVideoDetails = function (video) {
            $state.go('app.homework.subjects.assignment.classes.class.videos.video-weakness.video-progress', {weaknessId: video.id})
        };
    }
})();
