(function () {
    'use strict';

    angular
        .module('app.settings.curriculums.curriculum.subjects.subject.level-setting', ['ui.tree'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider) {
        // State
        $stateProvider
            .state('app.settings.curriculums.curriculum.subjects.subject.level-setting', {
                url: '/level-setting',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/settings/curriculums/curriculum/subjects/subject/level-setting/level-setting.html',
                        controller: 'LevelSettingController as vm'
                    }
                },
                resolve: {
                    breadcrumbs: function (breadcrumb, $stateParams) {
                        return breadcrumb.getBreadCrumbs($stateParams);
                    },
                },
                ncyBreadcrumb: {
                    label: 'Level Settings',
                },
                authenticate: true,
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/settings/curriculums/curriculum/subjects/subject/level-setting');
    }
})();


(function () {
    'use strict';

    angular
        .module('app.settings.curriculums.curriculum.subjects.subject.level-setting')
        .controller('LevelSettingController', LevelSettingController);

    /** @ngInject */
    function LevelSettingController($mdDialog, breadcrumbs, breadcrumb, msUtils, generalMessage, loadingScreen, tableTree, $scope, $state, $q, Restangular) {
        var vm = this;
        $scope.breadcrumbs = breadcrumbs;
        $scope.currentDate = new Date();
        // $scope.level = "P" + _.parseInt(breadcrumbs.class.c_name);
        vm.levels = breadcrumbs.levels;
        vm.displayEHLALevels = msUtils.displayEHLALevels;

        vm.selectVideo = function (ev, item) {
            console.log(item);
            $mdDialog.show({
                controller: function (node, videos, $sce, $mdDialog) {
                    console.log('videos', videos);
                    var vm = this;
                    node.videoList = videos;
                    vm.node = node;
                    vm.levels = breadcrumbs.levels;
                    vm.displayEHLALevels = msUtils.displayEHLALevels;
                    vm.displayLanguage = msUtils.displayLanguage;
                    vm.cancel = vm.closeDialog = function () {
                        _.each(node.videoList, function (v) {
                            v.isPreview = false;
                            v.isPlayed = false;
                        });
                        $mdDialog.hide();
                    }

                    vm.trustSrc = function(src) {
                        return $sce.trustAsResourceUrl(src);
                    }

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
                templateUrl: 'app/main/settings/curriculums/curriculum/subjects/subject/level-setting/templates/assign-video.html',
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
                    event: ev,
                }
            });
        }

        vm.save = function () {
            var levels = [];
            (function getChecked(data) {
                _.each(data, function (d) {
                    if (d.child && d.child.length) {
                        getChecked(d.child);
                    } else if (d.custom_level && d.custom_level.length) {
                        levels.push({"weakness_id": d.id,"level":d.custom_level});
                    }
                })
            })(vm.data);
            loadingScreen.showLoadingScreen();
            Restangular.all('academicYear/' + breadcrumbs.academicId + '/subjects/' + breadcrumbs.subjectId + '/curriculumSettings').customPUT({
                "year_start":"2017",
                "year_end":"2018",
                "semester":"1",
                "weaknesses":levels
            })
                .then(function (results) {
                    console.log(results);
                    generalMessage.showMessageToast('success', 'School-based Curriculum Level Settings Update save successfully.')
                })
                .catch(function (err) {
                    console.error('Cannot login', err);
                    generalMessage.showMessageToast('error', 'School-based Curriculum Level Settings save unsuccessfully.')
                })
                .finally((function () {
                    loadingScreen.hideLoadingScreen();
                }));

        }

        $scope.init = function () {
            $scope.loading = true;
            Restangular.one('academicYear', breadcrumbs.academicId).one('subjects', breadcrumbs.subjectId).one( 'curriculumSettings').get()
                .then(function (results) {
                    vm.data = results.plain().data;
                    (function count(weaknesses, index, categoryId, parentNameEN, parentNameZH) {
                        _.each(weaknesses, function (weakness) {
                            weakness.categoryId = categoryId || weakness.id;
                            weakness.parentNameEN = parentNameEN || weakness.name_en;
                            weakness.parentNameZH = parentNameZH || weakness.name_zh;
                            if (index === 0) {
                                vm.categories.push(weakness);
                            }
                            if (!weakness.child || !weakness.child.length) {

                            } else {
                                count(weakness.child, index + 1, categoryId || weakness.categoryId, weakness.parentNameEN, weakness.parentNameZH);
                            }
                        });
                    })(vm.data, 0, null, '');

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
            $state.go("app.settings.curriculums.curriculum.subjects");
        }


        vm.selectedCategories = ['-1'];
        //vm.selectedSubjects = ['-1'];
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
