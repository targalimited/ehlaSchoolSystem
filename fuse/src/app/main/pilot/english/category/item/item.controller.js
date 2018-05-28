(function () {
  'use strict';

  angular
    .module('app.pilot.english.category.item')
    .controller('ItemController', ItemController);

  /** @ngInject */
  function ItemController($timeout, $q, $sce, $rootScope, msUtils, tableTree, loadingScreen, Restangular, $scope, $state, $mdDialog, generalMessage) {
    var vm = this;
    $scope.itemId = $state.params.itemId
		$scope.section = 3;
		$scope.exerciseList = [];
		$scope.exerciseHash = [];
		$scope.isShowLoading = false;
		
		$scope.userList = [];
		
		//TODO dynamic
		$scope.academic_id = 1;//TODO remove academic_year
		$scope.class_id = 1;
		$scope.subject_id = 1;
		$scope.itemType = 2; //TODO shift to inital
				
		//do server side paging later
		$scope.tabs = [
			{tab:1,
				label:"Topic",
				label_en:"Topic",
				label_zh:"主題"},
			{tab:2,
				label:"Basic Info",
				label_en:"Basic Info",
				label_zh:"基本資料"},
			{tab:3,
				label:"Exercise",
				label_en:"Exercise",
				label_zh:"練習",
				is_loading:true},
			{tab:4,
				label:"Weakness Report",
				label_en:"Weakness Report",
				label_zh:"弱點報告",
				is_loading:true},
			{tab:5,
				label:"Progress & Results",
				label_en:"Progress & Results",
				label_zh:"進度與結果",
				is_loading:true}];

    $scope.init = function () {
			getItemDetail();

			for (var i=0; i < $scope.tabs.length; i++) {
				$scope.tabs[i].onSelect = function () {
					setSectionData(this);					
        }
			}
    }
		
		$scope.switchSection = function (section) {
      $scope.section = section;
			$scope.tabs[section-1].onSelect();			
    }
		
		$scope.setDate = function (reqDate){
			if (reqDate == 'today') {
				return new Date();
			} else if (reqDate == '7days') {
				var date = new Date();
				return date.setDate(date.getDate() + 7);
			} else if (reqDate == '14days') {
				var date = new Date();
				return date.setDate(date.getDate() + 14);
			} else if (reqDate == '1month') {
				var date = new Date();
				return date.setDate(date.getDate() + 31);
			}
		}

		function getItemDetail () {
			var params = {params: {item_id: $scope.itemId}};
			Restangular.service('get_by_ids').post(params)
				.then(function (results) {
					$scope.itemDetail = results.plain().data[0];
					
					//TODO
					$scope.test = 
						[{id:1083, media:[{file_path:"https://ehla-media-bucket.s3.amazonaws.com/videos_intro/Reading_exercises.mp4"}]}];
						
					msUtils.fixPreviewVideo($scope.test);
					
				})
				.catch(function (err) {
					console.error('Cannot login', err);
				})
				.finally((function () {
					$scope.loading = false;
				}));			
		}
		
		function setSectionData (tabDetail) {
			if (tabDetail.tab == 3) {
				$scope.getExerciseList();
			} else if (tabDetail.tab == 4) {
				$scope.get_school_weakness_report("normal");
				$scope.get_school_weakness_report("spell");
				$scope.get_school_weakness_report("match");
				$scope.get_school_weakness_report("usage");
			} else if (tabDetail.tab == 5) {
				$scope.getExerciseList();
				$scope.get_school_result_summary_report();
			}
		}
		
		$scope.exerciseListApiCall = false;
		
		$scope.getExerciseList = function() {
			if ($scope.exerciseListApiCall) {
				return;
			} else {
				$scope.exerciseListApiCall = true;
			}			
			
			if ($scope.exerciseList.length == 0) {
				var params = {
					params: {
						id: $scope.itemId,
						academic_id: $scope.academic_id,
						subject_id: $scope.subject_id,
						class_id:$scope.class_id,
						item_type:$scope.itemType
					}
				};
				
				Restangular.service('get_assignment_by_item_id').post(params)
					.then(function (results) {
						$scope.exerciseList = results.plain().data;						
						for (var i=0; i < $scope.exerciseList.length; i++) {
							$scope.exerciseList[i]['is_changing'] = false;
							$scope.exerciseList[i]['comFlag'] = ($scope.exerciseList[i]['is_published'] == 1) ? 0 : 1;
							$scope.exerciseHash[$scope.exerciseList[i]['type']] = $scope.exerciseList[i];
						}
						
					})
					.catch(function (err) {
						console.error('Cannot login', err.data);
					})
					.finally((function () {
						
					}));	
			}
		}
				
    $scope.trustSrc = function (src) {
      return $sce.trustAsHtml(src);
    };
		
		$scope.tutorialVideoStatsChange = function (node, prop, val) {
      if (node.name === 'Tutorial Video' || node.name_en === 'Video Global Setting') {
        _.each(node.child, function (c) {
          c[prop] = c[prop] !== val && !_.isUndefined(c[prop]) ? c[prop] : node[prop];
        })
      }
    }

    $scope.htmlToPlaintext = function (text) {
      return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }
		
    $scope.displayLanguage = msUtils.displayLanguage;
		
    $scope.showTutor = function (v) {
			
      v.isShowTutor = true;
    }
		
		$scope.preview = function (video) {
      video.isPreview = !video.isPreview;
      video.isShowTutor = false;

      if (video.isPreview) {
        if (!video.player) {
          var media = video.media[0];
          console.log('video.media', media);
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
		
		$scope.comAssign = [];
		
		$scope.batchSetPublishAssignment = function (isPublished) {
			$scope.isShowLoading = true;
						
			var params = {
				academic_id : $scope.academic_id,
				class_id : $scope.class_id,
				subject_id : $scope.subject_id,
				item_id : $scope.itemId,
				item_type : 2,
				homework_type : "EXERCISE",
				target_ids : []
			}
						
			if ($scope.comAssign.start_date != null) {
				params['start_date'] = new Date($scope.comAssign.start_date);
			}

			if ($scope.comAssign.end_date != null) {
				params['end_date'] = new Date($scope.comAssign.end_date);
			}
			params['remark'] = $scope.comAssign.remark;
			params['is_published'] = isPublished;
						
			for (var i=0; i < $scope.exerciseList.length; i++) {
				if ($scope.exerciseList[i].comFlag == 1) {
					params['target_ids'].push($scope.exerciseList[i].id);
				}
			}
			
			if (params['target_ids'].length == 0) {
				generalMessage.showMessageToast('error', 'No exercise chosen');
				$scope.isShowLoading = false;
				return;
			}
			
			var passParam = {
				params:params
			};

			Restangular.service('batch_set_publish_assignments').post(passParam)
				.then(function (results) {	

			
					$scope.exerciseList = results;						
					for (var i=0; i < $scope.exerciseList.length; i++) {
						$scope.exerciseList[i]['is_changing'] = false;
						$scope.exerciseList[i]['comFlag'] = ($scope.exerciseList[i]['is_published'] == 1) ? 0 : 1;
						$scope.exerciseHash[$scope.exerciseList[i]['type']] = $scope.exerciseList[i];
					}
					
					$scope.isShowLoading = false;	
					generalMessage.showMessageToast('success', 'Update Reading Exercise');					
				})
				.catch(function (err) {
          generalMessage.showMessageToast('error', 'Contact EHLA');
				})
				.finally((function () {
					$scope.isShowLoading = false;
				}));
			
		}
		/*		
		$scope.batchSaveExercise = function (isPublished) {
			$scope.isShowLoading = true;
			
			var params = {
				academic_id : $scope.academic_id,
				class_id : $scope.class_id,
				subject_id : $scope.subject_id,
				item_id : $scope.itemId,
				item_type : 2,
				homework_type : "EXERCISE"
			}
			
			if ($scope.comAssign.start_date != null) {
				params['start_date'] = new Date($scope.comAssign.start_date);
			}

			if ($scope.comAssign.end_date != null) {
				params['end_date'] = new Date($scope.comAssign.end_date);
			}
			params['remark'] = $scope.comAssign.remark;
			params['is_published'] = isPublished;
			params['target_ids'] = [];
						
			for (var i=0; i < $scope.exerciseList.length; i++) {
				if ($scope.exerciseList[i].comFlag == 1) {
					params['target_ids'].push($scope.exerciseList[i].id);
				}
			}
			
			if (params['target_ids'].length == 0) {
				generalMessage.showMessageToast('error', 'No exercise chosen');
				$scope.isShowLoading = false;
				return;
			}
			if (isPublished == 1) {
				if ($scope.comAssign.start_date == null) {
					generalMessage.showMessageToast('error', 'Need to input start date');
					$scope.isShowLoading = false;
					return;
				}
				if ($scope.comAssign.end_date == null) {
					generalMessage.showMessageToast('error', 'Need to input start date');
					$scope.isShowLoading = false;
					return;
				}
			}
			
			var passParam = {
				params:params
			};			
			
			console.log('bill passParam', passParam);
			Restangular.service('batch_set_exercises').post(passParam)
				.then(function (results) {
					console.log('bill results', results);
					$scope.exerciseList = results.plain().data;						
					for (var i=0; i < $scope.exerciseList.length; i++) {
						$scope.exerciseList[i]['is_changing'] = false;
						$scope.exerciseList[i]['comFlag'] = ($scope.exerciseList[i]['is_published'] == 1) ? 0 : 1;
						$scope.exerciseHash[$scope.exerciseList[i]['type']] = $scope.exerciseList[i];
					}					

					generalMessage.showMessageToast('success', 'Update Reading Exercise');							
				})
				.catch(function (err) {
          console.log('bill error', err.data);
          generalMessage.showMessageToast('error', 'Contact EHLA');
				})
				.finally((function () {
					$scope.isShowLoading = false;
				}));				
		}
		*/		
		$scope.setAssignments = function (exe) {
			$scope.isShowLoading = true;
			
			var params = {
				academic_id : $scope.academic_id,
				class_id : $scope.class_id,
				subject_id : $scope.subject_id,
				item_id : $scope.itemId,
				item_type : 2,
				homework_type : "EXERCISE",
				target_ids : [exe.id]
			}
			
			if (exe.start_date != null) {
				params['start_date'] = new Date(exe.start_date);
			}
			if (exe.end_date != null) {
				params['end_date'] = new Date(exe.end_date);
			}
			params['remark'] = exe.remark;
			
			var passParam = {
				params:params
			};
			
			Restangular.service('set_assignments').post(passParam)
				.then(function (results) {
					var exerciseDetail = results;
					for (var i=0; i < exerciseDetail.length; i++) {
						if (exerciseDetail[i]['id'] == exe.id) {
							exe.start_date = exerciseDetail[i].start_date;
							exe.end_date = exerciseDetail[i].end_date;
							exe.remark = exerciseDetail[i].remark;
							break;
						}
					}
					$scope.isShowLoading = false;	
					exe.is_changing = false;
					generalMessage.showMessageToast('success', 'Update Reading Exercise');					
				})
				.catch(function (err) {
          generalMessage.showMessageToast('error', 'Contact EHLA');
				})
				.finally((function () {
					$scope.isShowLoading = false;
				}));
		}
		
		$scope.publishAssignments = function (exe) {
			$scope.isShowLoading = true;
			var params = {
				academic_id : $scope.academic_id,
				class_id : $scope.class_id,
				subject_id : $scope.subject_id,
				assignment_ids : [exe.assignment_id]
			}
			var passParam = {
				params:params
			};
			
			Restangular.service('publish_assignments').post(passParam)
				.then(function (results) {
					generalMessage.showMessageToast('success', 'Publish Reading Exercise');
					exe.is_published = 1;
				})
				.catch(function (err) {
					generalMessage.showMessageToast('error', 'Contact EHLA');
				})
				.finally((function () {
					$scope.isShowLoading = false;
				}));
		}
		
		/*$scope.republishExercise = function (exe) {
			$scope.isShowLoading = true;
			var params = exe;
			params['item_id'] = $scope.itemId;
			params['academic_id'] = $scope.academic_id;
			params['class_id'] = $scope.class_id;
			params['subject_id'] = $scope.subject_id;
			params['item_type'] = 2;
			params['homework_type'] = "EXERCISE";
			
			var passParam = {
				params:params
			};
			
			Restangular.service('republish_exercise').post(passParam)
				.then(function (results) {
					generalMessage.showMessageToast('success', 'Publish Reading Exercise');
					exe.is_published = 1;
				})
				.catch(function (err) {
          console.log(err.data);
					generalMessage.showMessageToast('error', 'Contact EHLA');
				})
				.finally((function () {
					$scope.isShowLoading = false;
				}));
		}*/
		
		$scope.get_school_result_summary_report = function () {
			var passParam = {
				params:{
					item_id:$scope.itemId,
					academic_id: $scope.academic_id,
					subject_id: $scope.subject_id,
					class_id:$scope.class_id,
					item_type:2
				}
			};
				
			Restangular.service('get_school_result_summary_report').post(passParam)
				.then(function (results) {	
					$scope.userResult = results.data;
														
				})
				.catch(function (err) {
					generalMessage.showMessageToast('error', 'Contact EHLA');
				})
				.finally((function () {
				}));
		}
		
		$scope.get_school_weakness_report = function ($reportType) {
			//TODO academic year change to academic id
			var passParam = {
				params:{
					item_id:$scope.itemId,
					academic_id: $scope.academic_id,
					subject_id: $scope.subject_id,
					class_id:$scope.class_id,
					report_type:$reportType
				}
			};
				
			Restangular.service('get_school_weakness_report').post(passParam)
				.then(function (results) {	
				
					if ($reportType == 'normal') {
						$scope.weaknessReport = results.data;
					} else if ($reportType == 'spell') {
						$scope.wordSpellReport = results.data;
					} else if ($reportType == 'match') {
						$scope.wordMatchReport = results.data;
					} else if ($reportType == 'usage') {
						$scope.wordUsageReport = results.data;
					}
				
				})
				.catch(function (err) {
					generalMessage.showMessageToast('error', 'Contact EHLA');
				})
				.finally((function () {
				}));
		}
		
		$scope.back = function () {
      $state.go('app.pilot.english.category')
    }
		
		$scope.init();		
  }
})();
