(function () {
    'use strict';

    angular
        .module('app.pilot.choose-items.choose-items-detail')
				.directive( 'itemlevellist', function(Restangular, generalMessage, $location, $anchorScroll) {
			return {
				restrict: "E",
				scope:{
					setFn: '&',
					tab: '=tab',
					tabs: '=tabs',
					catGrouper: '=catGrouper',
					chosenItemQtt: '=chosenItemQtt',
					validLevels: '=validLevels',
					totalItemQtt: '=totalItemQtt',
					levelItemQtt: '=levelItemQtt'
				},
				link: function($scope, $element, $attrs){	
					$scope.addLvItemList = {
						p1: [], p2: [], p3: [], p4: [], p5: [], p6: [],
						s1: [], s2: [], s3: [], s4: [], s5: [], s6: [],
					};	
					$scope.removeLvItemList = {
						p1: [], p2: [], p3: [], p4: [], p5: [], p6: [],
						s1: [], s2: [], s3: [], s4: [], s5: [], s6: [],
					};	
					$scope.selectedSearchTag = [];
					
					$scope.setItemLevelSectionData = function (successMsg) {
						if ($scope.tab.rawData.length == 0) {
							for (var i=0; i < $scope.tabs.length; i++) {
								if ($scope.tabs[i] != $scope.tab) {
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
									$scope.tab.rawData = results.plain().data;
									$scope.tab.totalCount = results.plain().metadata.totalCount;
									$scope.searchTag = results.plain().metadata.searchTag;
									$scope.tab.itemLvCnt = results.plain().metadata.itemLvCnt;
									$scope.tab.itemLvCnt['p1c'] = 0;
									$scope.tab.itemLvCnt['p2c'] = 0;
									$scope.tab.itemLvCnt['p3c'] = 0;
									$scope.tab.itemLvCnt['p4c'] = 0;
									$scope.tab.itemLvCnt['p5c'] = 0;
									$scope.tab.itemLvCnt['p6c'] = 0;
									$scope.tab.itemLvCnt['s1c'] = 0;
									$scope.tab.itemLvCnt['s2c'] = 0;
									$scope.tab.itemLvCnt['s3c'] = 0;
									$scope.tab.itemLvCnt['s4c'] = 0;
									$scope.tab.itemLvCnt['s5c'] = 0;
									$scope.tab.itemLvCnt['s6c'] = 0;
									
									var start = ($scope.tab.currentPage-1) * $scope.tab.limit;
									var end = start + $scope.tab.limit;
									
									$scope.tab.data = $scope.tab.rawData.slice(start, end);
									setPaging();
									
									if (successMsg) {
										generalMessage.showMessageToast('success', 'Update Success');	
									}
								})
								.catch(function (err) {
									console.error('Cannot login', err.data);
								})
								.finally((function () {
									$scope.loading = false;
								}));
						} else {
							for (var i=0; i < $scope.tabs.length; i++) {
								if ($scope.tabs[i] == $scope.tab) {
									var start = ($scope.tab.currentPage-1) * $scope.tab.limit;
									var end = start + $scope.tab.limit;
									
									$scope.tabs[i].data = $scope.tab.rawData.slice(start, end);
									setPaging();
								} else {
									if ($scope.tabs[i].data.length > 4) {
										$scope.tabs[i].data = $scope.tabs[i].data.slice(0,4);
									}
								}
							}			
						}
					}
									
					$scope.setFn({theDirFn: $scope.setItemLevelSectionData});
				
					$scope.changeLevelChosen = function (itemId,  lv, actionStatus) {			
						$scope.tab.itemLvCnt[lv + 'c'] += (actionStatus) ? 1: -1;
									
						for (var i = 0; i< $scope.tab.rawData.length; i++) {
							if ($scope.tab.rawData[i].id == itemId) {
								$scope.tab.rawData[i][lv].tick = actionStatus;
								break;
							}
						}
						
						if (actionStatus == true) {
							if ($scope.removeLvItemList[lv].indexOf(itemId) != -1 ) {
								var index = $scope.removeLvItemList[lv].indexOf(itemId);
								if (index !== -1) $scope.removeLvItemList[lv].splice(index, 1);
							} else {
								$scope.addLvItemList[lv].push(itemId);
							}
						} else {
							if ($scope.addLvItemList[lv].indexOf(itemId) != -1 ) {					
								var index = $scope.addLvItemList[lv].indexOf(itemId);
								if (index !== -1) $scope.addLvItemList[lv].splice(index, 1);
							} else {
								$scope.removeLvItemList[lv].push(itemId);				
							} 
						}	
					}
					
					$scope.selectedTag = function (key, valueObj) {		
						//check if key exist, if not, create key
						
						//check if exist, 
						//if exist, then remove
						//if key becomes empty, then remove key
						
						//if not exist, push
						if (!$scope.selectedSearchTag.hasOwnProperty(key)) {
							$scope.selectedSearchTag[key] = [];
						}
						
						var isExist = false;
						for (var i=0; i<$scope.selectedSearchTag[key].length; i++) {
							if ($scope.selectedSearchTag[key][i]['value'] == valueObj['value']) {
								$scope.selectedSearchTag[key].splice(i,1);
								isExist = true;
							}
						}
						if (isExist) {
							if ($scope.selectedSearchTag[key].length == 0) {
								delete $scope.selectedSearchTag[key];
							}
						} else {
							$scope.selectedSearchTag[key].push(valueObj);
						}			
						
					}
					
					function getMatch(seiCri, data) {								
						if (typeof seiCri !== "undefined") {
							for(var j=0; j<data.length; j++) {
								for(var k=0; k<seiCri.length; k++) {
									if (data[j] == seiCri[k].value) {										
										return true;
									}
								}
							}
							return false;
						} 
						return true;
					}
					
					$scope.search = function() {
						$scope.tab.currentPage = 1;
						
						var start = ($scope.tab.currentPage-1) * $scope.tab.limit;
						var end = start + $scope.tab.limit;
						
						$scope.tab.filteringData = $scope.tab.rawData;
						
						if (!jQuery.isEmptyObject($scope.selectedSearchTag)) {							
							var seiLevel = $scope.selectedSearchTag['level'];
							var seiDifficulty = $scope.selectedSearchTag['difficulty'];
							var seiTextType = $scope.selectedSearchTag['texttype'];
							var seiTheme = $scope.selectedSearchTag['theme'];
							var seiSubTheme = $scope.selectedSearchTag['subtheme'];
							var seiWeakness = $scope.selectedSearchTag['weakness'];
							var seiWords = $scope.selectedSearchTag['word'];							
							
							
							$scope.tab.filteringData = [];
							
							for (var i=0; i<$scope.tab.rawData.length; i++) {
								var raw = $scope.tab.rawData[i];
								
								if (!getMatch(seiLevel, raw.ei_level)) {continue;}								
								if (!getMatch(seiDifficulty, raw.ei_difficulty)) {continue;}
								if (!getMatch(seiTextType, raw.ei_textType)) {continue;}
								if (!getMatch(seiTheme, raw.ei_theme)) {continue;}
								if (!getMatch(seiSubTheme, raw.ei_subtheme)) {continue;}
								if (!getMatch(seiWeakness, raw.ei_weakness)) {continue;}
								if (!getMatch(seiWords, raw.ei_words)) {continue;}
								
								$scope.tab.filteringData.push($scope.tab.rawData[i]);
							}
						}
						$scope.tab.data = $scope.tab.filteringData.slice(start, end);
						setPaging($scope.tab);
					}
					
					$scope.chooseItemLevel = function () {
						var params = {params: { 
													cat_grouper: $scope.catGrouper, 
													add_lv_item_list: $scope.addLvItemList, 
													remove_lv_item_list: $scope.removeLvItemList,
													page: 1, 
													limit: 500}};
						
						Restangular.service('choose_item_for_level').post(params)
							.then(function (results) {
								//reset everything
								
								$scope.addLvItemList = {
									p1: [], p2: [], p3: [], p4: [], p5: [], p6: [],
									s1: [], s2: [], s3: [], s4: [], s5: [], s6: [],
								};	
								$scope.removeLvItemList = {
									p1: [], p2: [], p3: [], p4: [], p5: [], p6: [],
									s1: [], s2: [], s3: [], s4: [], s5: [], s6: [],
								};
								$scope.tab.rawData = [];
								$scope.setItemLevelSectionData (true) ;
							})
							.catch(function (err) {
								console.error('Cannot login', err.data);
							})
							.finally((function () {
								$scope.loading = false;
							}));
					}
				
				
					$scope.confirmUpdate = function () {			
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
								$scope.tab.rawData = [];
								$scope.setChooseItemSectionData (true);
								
								$scope.addItemsList = [];
								$scope.removeItemsList = [];
								
							})
							.catch(function (err) {
								console.error('Cannot login', err.data);
							})
							.finally((function () {
								$scope.loading = false;
							}));
					}
					
					$scope.entryUpdate = function () {
						$scope.tab.limit = Number($scope.tab.selectedEntry);
						
						$scope.tab.currentPage = 1;
						
						var start = ($scope.tab.currentPage-1) * $scope.tab.limit;
						var end = start + $scope.tab.limit;
						$scope.tab.data = $scope.tab.rawData.slice(start, end);
						
						setPaging();
					}

					$scope.pageSelect = function (newPage) {
						$location.hash('top');

						$anchorScroll();
						
						$scope.tab.currentPage = newPage;
						
						var start = ($scope.tab.currentPage-1) * $scope.tab.limit;
						var end = start + $scope.tab.limit;
									
						$scope.tab.data = $scope.tab.rawData.slice(start, end);
						
						setPaging();
					}
					
					function setPaging () {
						$scope.tab.maxPage = Math.ceil($scope.tab.rawData.length / $scope.tab.limit);
						
						$scope.tab.currentMaxPage = Math.min(((($scope.tab.currentPage) * $scope.tab.limit)), $scope.tab.totalCount);
						
						if ($scope.tab.currentPage > $scope.tab.maxPage) {
							$scope.tab.currentPage = 1;
						}
						
						if ($scope.tab.maxPage == 4) {
							$scope.tab.p1 = 2; 
							$scope.tab.p2 = 3;
							$scope.tab.p3 = -1;
						} else if ($scope.tab.currentPage == 1 ||
								$scope.tab.currentPage == 2) {
							$scope.tab.p1 = 2;
							$scope.tab.p2 = 3;
							$scope.tab.p3 = 4;
						} else if ($scope.tab.currentPage == $scope.tab.maxPage ||
								$scope.tab.currentPage == $scope.tab.maxPage - 1) {
							$scope.tab.p1 = $scope.tab.maxPage - 3;
							$scope.tab.p2 = $scope.tab.maxPage - 2;
							$scope.tab.p3 = $scope.tab.maxPage - 1;
						} else {
							$scope.tab.p1 = $scope.tab.currentPage - 1; 
							$scope.tab.p2 = $scope.tab.currentPage;
							$scope.tab.p3 = $scope.tab.currentPage + 1;
						}		
					}
					
        },
				templateUrl: 'app/main/pilot/choose-items/choose-items-detail/templates/select-items-levels.html'
			}
		})
})();