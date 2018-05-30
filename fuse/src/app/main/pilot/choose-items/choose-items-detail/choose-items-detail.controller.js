(function () {
  'use strict';

  angular
    .module('app.pilot.choose-items.choose-items-detail')
    .controller('ChooseItemsDetailController', ChooseItemsDetailController);

  /** @ngInject */
  function ChooseItemsDetailController($timeout, $q, $sce, $rootScope, msUtils, loadingScreen, Restangular, $scope, $state, $mdDialog, generalMessage, $location, $anchorScroll) {
    var vm = this;
    
		$scope.section = 1;
		$scope.isShowLoading = false;
		
		$scope.userList = [];
		
		//TODO dynamic
		$scope.academic_id = 1;//TODO remove academic_year
		$scope.catGrouper = $state.params.catGrouper;
		
		$scope.addItemsList = [];
		$scope.removeItemsList = [];
		
		$scope.validLevels = {
			p1:false,
			p2:false,
			p3:false,
			p4:false,
			p5:false,
			p6:false,
			s1:false,
			s2:false,
			s3:false,
			s4:false,
			s5:false,
			s6:false,
		};
		
		//do server side paging later
		$scope.tabs = [
			{tab:1,
				label_en : "Choose Items",
				label_zh : "選擇項目",
				limit : 10,
				rawData : [],
				data : [],
				selectedEntry : "10",
				currentPage : 1,
				onSelect : function () {
					setChooseItemSectionData(this);					
				}},
			{tab:2,
				label_en : "Edit Selected Items",
				label_zh : "修改已選擇項目",
				limit : 10,
				rawData : [],
				data : [],
				selectedEntry : "10",
				currentPage : 1,
				onSelect : function () {
					setItemLevelSectionData(this);					
				}}];

    $scope.init = function () {			
			Restangular
				.one('get_school_item_summary')
				.get()
				.then(function (results) {	
					$scope.total_item_qtt = results.plain().total_item_qtt;
					$scope.level_item_qtt = results.plain().level_item_qtt;
					var valid_levels = results.plain().valid_levels;
					
					for (var i=0; i<valid_levels.length; i++) {
						$scope.validLevels[valid_levels[i]] = true;
					}
					
					//console.error('level', $scope.validLevels);
					$scope.chosen_item_qtt = 0;
					
					$scope.display_levels_en = results.plain().display_levels_en;
					$scope.display_levels_zh = results.plain().display_levels_zh;
					
					$scope.items = results.plain().items;
					
					$scope.itemsArray = [];
					for (var key in $scope.items) {
						$scope.chosen_item_qtt += $scope.items[key]['item_ids'].length;
						$scope.itemsArray.push($scope.items[key]);
					}							
				})
				.catch(function (err) {
					console.error('Cannot login', err.data);
				});	
					
			/*for (var i=0; i < $scope.tabs.length; i++) {
				$scope.tabs[i].limit = 10;
				$scope.tabs[i].rawData = [];
				$scope.tabs[i].data = [];
				$scope.tabs[i].selectedEntry = "10";
				$scope.tabs[i].currentPage = 1;
			}*/
    }
		
		
		$scope.switchSection = function (section) {
      $scope.section = section;	
			$scope.tabs[section-1].onSelect();		
    }
		
		$scope.chooseItem = function (tabDetail, itemId, idx) {
			var cPage = $scope.tabs[0].currentPage - 1;
			var sEntry = $scope.tabs[0].selectedEntry;
			
			var actualIdx = idx + cPage * sEntry;
			
			for(var i=0; i<$scope.addItemsList.length; i++) {
				if ($scope.addItemsList[i]['id']==itemId) {
					return;
				}
			}
			
			if ($scope.chosen_item_qtt >= 10) {
				generalMessage.showMessageToast('error', 'Reach limit ' + ($scope.chosen_item_qtt));
			} else {
				($scope.addItemsList).push(tabDetail.rawData[actualIdx]);
				tabDetail.rawData[actualIdx].tmpAdd = true;
				tabDetail.data[idx].tmpAdd = true;
				$scope.chosen_item_qtt++;
			}
		}
		
		$scope.removeItem = function (tabDetail, itemId, idx) {
			var cPage = $scope.tabs[0].currentPage - 1;
			var sEntry = $scope.tabs[0].selectedEntry;
			
			var actualIdx = idx + cPage * sEntry;
			
			for(var i=0; i<$scope.removeItemsList.length; i++) {
				if ($scope.removeItemsList[i]['id']==itemId) {
					return;
				}
			}
			($scope.removeItemsList).push(tabDetail.rawData[actualIdx]);
			tabDetail.rawData[actualIdx].tmpRemove = true;
			tabDetail.data[idx].tmpRemove = true;
			$scope.chosen_item_qtt--;
		}
		
		$scope.cancelChooseItem = function (tabDetail, itemId, idx) {
			var cPage = $scope.tabs[0].currentPage - 1;
			var sEntry = $scope.tabs[0].selectedEntry;
			
			var actualIdx = idx + cPage * sEntry;
			
			for(var i=0; i<$scope.addItemsList.length; i++) {
				if ($scope.addItemsList[i]['id']==itemId) {
					$scope.addItemsList.splice(i, 1);
				}
			}
			tabDetail.rawData[actualIdx].tmpAdd = false;
			tabDetail.data[idx].tmpAdd = false;
			$scope.chosen_item_qtt--;
		}
		
		$scope.cancelRemoveItem = function (tabDetail, itemId, idx) {
			var cPage = $scope.tabs[0].currentPage - 1;
			var sEntry = $scope.tabs[0].selectedEntry;
			
			var actualIdx = idx + cPage * sEntry;
						
			if ($scope.chosen_item_qtt >= 10) {
				generalMessage.showMessageToast('error', 'Reach limit ' + ($scope.chosen_item_qtt));
			} else {
				for(var i=0; i<$scope.removeItemsList.length; i++) {
					if ($scope.removeItemsList[i]['id']==itemId) {
						$scope.removeItemsList.splice(i, 1);
					}
				}
				
				tabDetail.rawData[actualIdx].tmpRemove = false;
				tabDetail.data[idx].tmpRemove = false;
				$scope.chosen_item_qtt++;
			}
		}
		
		$scope.confirmUpdate = function (tabDetail) {			
			var addItemIds = [];
			var removeItemIds = [];
			
			for (var i = 0; i<$scope.addItemsList.length; i++) {
				addItemIds.push($scope.addItemsList[i]['id']);
			}
			for (var i = 0; i<$scope.removeItemsList.length; i++) {
				removeItemIds.push($scope.removeItemsList[i]['id']);
			}
		
			//TODO server side paging
			var params = {params: { 
										cat_grouper: $scope.catGrouper, 
										add_item_ids: addItemIds,
										remove_item_ids : removeItemIds,
										page: 1, 
										limit: 500}};

			Restangular.service('choose_item').post(params)
				.then(function (results) {
					tabDetail.rawData = results.plain().data;
					tabDetail.totalCount = results.plain().metadata.totalCount;
					
					var start = (tabDetail.currentPage-1) * tabDetail.limit;
					var end = start + tabDetail.limit;
					
					tabDetail.data = tabDetail.rawData.slice(start, end);
					setPaging(tabDetail);
					
					$scope.addItemsList = [];
					$scope.removeItemsList = [];
					generalMessage.showMessageToast('success', 'Update Success');	
				})
				.catch(function (err) {
					console.error('Cannot login', err.data);
				})
				.finally((function () {
					$scope.loading = false;
				}));
		}
		
		$scope.entryUpdate = function (tabDetail) {
			tabDetail.limit = Number(tabDetail.selectedEntry);
			
			tabDetail.currentPage = 1;
			
			var start = (tabDetail.currentPage-1) * tabDetail.limit;
			var end = start + tabDetail.limit;
			tabDetail.data = tabDetail.rawData.slice(start, end);
			
			setPaging(tabDetail);
		}

		$scope.pageSelect = function (tabDetail, newPage) {
			$location.hash('top');

      $anchorScroll();
			
			tabDetail.currentPage = newPage;
			
			var start = (tabDetail.currentPage-1) * tabDetail.limit;
			var end = start + tabDetail.limit;
						
			tabDetail.data = tabDetail.rawData.slice(start, end);
			
			setPaging(tabDetail);
		}
		
		function setPaging (tabDetail) {
			tabDetail.maxPage = Math.ceil(tabDetail.rawData.length / tabDetail.limit);
			
			tabDetail.currentMaxPage = Math.min((((tabDetail.currentPage) * tabDetail.limit)), tabDetail.totalCount);
			
			if (tabDetail.currentPage > tabDetail.maxPage) {
				tabDetail.currentPage = 1;
			}
			
			if (tabDetail.maxPage == 4) {
				tabDetail.p1 = 2; 
				tabDetail.p2 = 3;
				tabDetail.p3 = -1;
			} else if (tabDetail.currentPage == 1 ||
					tabDetail.currentPage == 2) {
				tabDetail.p1 = 2;
				tabDetail.p2 = 3;
				tabDetail.p3 = 4;
			} else if (tabDetail.currentPage == tabDetail.maxPage ||
					tabDetail.currentPage == tabDetail.maxPage - 1) {
				tabDetail.p1 = tabDetail.maxPage - 3;
				tabDetail.p2 = tabDetail.maxPage - 2;
				tabDetail.p3 = tabDetail.maxPage - 1;
			} else {
				tabDetail.p1 = tabDetail.currentPage - 1; 
				tabDetail.p2 = tabDetail.currentPage;
				tabDetail.p3 = tabDetail.currentPage + 1;
			}		
		}
		
		function setChooseItemSectionData (tabDetail) {
			if (tabDetail.rawData.length == 0) {
				
				for (var i=0; i < $scope.tabs.length; i++) {
					if ($scope.tabs[i] != tabDetail) {
						if ($scope.tabs[i].data.length > 4) {
							$scope.tabs[i].data = $scope.tabs[i].data.slice(0,4);
						}
					}
				}
				
				//TODO server side paging
				var params = {params: {
											cat_grouper: $scope.catGrouper, 
											page: 1, 
											limit: 500}};
				Restangular.service('get_by_category').post(params)
					.then(function (results) {
						tabDetail.rawData = results.plain().data;
						tabDetail.totalCount = results.plain().metadata.totalCount;
						
						var start = (tabDetail.currentPage-1) * tabDetail.limit;
						var end = start + tabDetail.limit;
						
						tabDetail.data = tabDetail.rawData.slice(start, end);
						setPaging(tabDetail);
					})
					.catch(function (err) {
						console.error('Cannot login', err.data);
					})
					.finally((function () {
						$scope.loading = false;
					}));
			} else {
				for (var i=0; i < $scope.tabs.length; i++) {
					if ($scope.tabs[i] == tabDetail) {
						var start = (tabDetail.currentPage-1) * tabDetail.limit;
						var end = start + tabDetail.limit;
						
						$scope.tabs[i].data = tabDetail.rawData.slice(start, end);
						setPaging(tabDetail);
					} else {
						if ($scope.tabs[i].data.length > 4) {
							$scope.tabs[i].data = $scope.tabs[i].data.slice(0,4);
						}
					}
				}			
			}
		}
		
		function setItemLevelSectionData (tabDetail) {
			if (tabDetail.rawData.length == 0) {
				for (var i=0; i < $scope.tabs.length; i++) {
					if ($scope.tabs[i] != tabDetail) {
						if ($scope.tabs[i].data.length > 4) {
							$scope.tabs[i].data = $scope.tabs[i].data.slice(0,4);
						}
					}
				}
				
				//TODO server side paging
				var params = {params: {
											cat_grouper: $scope.catGrouper, 
											page: 1, 
											limit: 500}};
				Restangular.service('get_selected_item_by_category').post(params)
					.then(function (results) {
						tabDetail.rawData = results.plain().data;
						tabDetail.totalCount = results.plain().metadata.totalCount;
						
						var start = (tabDetail.currentPage-1) * tabDetail.limit;
						var end = start + tabDetail.limit;
						
						tabDetail.data = tabDetail.rawData.slice(start, end);
						setPaging(tabDetail);
					})
					.catch(function (err) {
						console.error('Cannot login', err.data);
					})
					.finally((function () {
						$scope.loading = false;
					}));
			} else {
				for (var i=0; i < $scope.tabs.length; i++) {
					if ($scope.tabs[i] == tabDetail) {
						var start = (tabDetail.currentPage-1) * tabDetail.limit;
						var end = start + tabDetail.limit;
						
						$scope.tabs[i].data = tabDetail.rawData.slice(start, end);
						setPaging(tabDetail);
					} else {
						if ($scope.tabs[i].data.length > 4) {
							$scope.tabs[i].data = $scope.tabs[i].data.slice(0,4);
						}
					}
				}			
			}
		
		
		}
		
    vm.previewItem = function (ev, item) {
      $mdDialog.show({
        controller: function ($scope, $rootScope, $timeout, node, previewItem, $sce, $mdDialog) {
          var vm = this;
          $scope.language = $rootScope.language;
          vm.node = node;
          vm.item = previewItem;
          vm.videoList = previewItem[0].videoList;
          console.log('previewItem', previewItem);
          vm.cancel = vm.closeDialog = function () {
            $mdDialog.hide();
          };

          vm.trustSrc = function (src) {
            // res.result.data[0]['preview_en']
            return $sce.trustAsHtml(src);
          };

          msUtils.fixPreviewVideo(vm.videoList);
        },
        controllerAs: 'vm',
        templateUrl: 'app/main/homework/subjects/assignment/classes/class/extra-learning/templates/preview-item.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        escapeToClose: true,
        resolve: {
          previewItem: function () {
            loadingScreen.showLoadingScreen();
            var previewItem;
            return Restangular.service('itemApi/get_preview_by_item_id').post({params: {id: item.id}}).then(function (results) {
              previewItem = results.plain().data;
              var myString = previewItem[0]['preview_' + $rootScope.language] || previewItem[0].preview;
              var matches = msUtils.getMatches(myString);

              return Restangular.service('itemApi/get_by_ids').post({ params: { ids: matches } });
            })
						.then(function (results) {
							previewItem[0].videoList = results.plain().data;
							return previewItem;
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
		
		
		
		
				
		$scope.back = function () {
      $state.go('app.pilot.choose-items')
    }
		
		$scope.init();		
  }
})();
