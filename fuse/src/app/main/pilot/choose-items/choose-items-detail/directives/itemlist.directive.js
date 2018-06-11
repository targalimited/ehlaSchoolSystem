(function () {
    'use strict';

    angular
        .module('app.pilot.choose-items.choose-items-detail')
				.directive( 'itemlist', function(Restangular, generalMessage, $location, $anchorScroll) {
			return {
				restrict: "E",
				scope:{
					setFn: '&',
					tab: '=tab',
					tabs: '=tabs',
					catGrouper: '=catGrouper',
					totalItemQtt: '=totalItemQtt',
					chosenItemQtt: '=chosenItemQtt'
				},
				link: function($scope, $element, $attrs){			
								
					$scope.addItemsList = [];
					$scope.removeItemsList = [];	
					
					$scope.selectedSearchTag = [];
					
					$scope.setChooseItemSectionData = function(successMsg) {
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
							Restangular.service('get_by_category').post(params)
								.then(function (results) {
									$scope.tab.rawData = results.plain().data;
									$scope.tab.totalCount = results.plain().metadata.totalCount;
									$scope.searchTag = results.plain().metadata.searchTag;
									
									var start = ($scope.tab.currentPage-1) * $scope.tab.limit;
									var end = start + $scope.tab.limit;
									
									$scope.tab.filteringData = $scope.tab.rawData;
									
									$scope.tab.data = $scope.tab.filteringData.slice(start, end);
									setPaging($scope.tab);
									
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
																		
									$scope.tabs[i].data = $scope.tab.filteringData.slice(start, end);
									setPaging($scope.tab);
								} else {
									if ($scope.tabs[i].data.length > 4) {
										$scope.tabs[i].data = $scope.tabs[i].data.slice(0,4);
									}
								}
							}			
						}
					}	
					
					$scope.setFn({theDirFn: $scope.setChooseItemSectionData});
				
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
					
					$scope.search = function() {
						console.error('search tag', $scope.selectedSearchTag['difficulty']);
						
						$scope.tab.currentPage = 1;
						
						var start = ($scope.tab.currentPage-1) * $scope.tab.limit;
						var end = start + $scope.tab.limit;
						
						$scope.tab.filteringData = $scope.tab.rawData;
						/*
						if (!jQuery.isEmptyObject($scope.selectedSearchTag)) {							
							var eiLevel = $scope.selectedSearchTag['level'];
							var eiDifficulty = $scope.selectedSearchTag['difficulty'];
							var eiTextType = $scope.selectedSearchTag['texttype'];
							var eiTheme = $scope.selectedSearchTag['theme'];
							var eiSubTheme = $scope.selectedSearchTag['subtheme'];
							var eiWeakness = $scope.selectedSearchTag['weakness'];
							var eiWords = $scope.selectedSearchTag['word'];							
							
							
							$scope.tab.filteringData = [];
							_.each($scope.tab.rawData, function(rawData, index, rawDatas) {
								//console.log('level: ' + JSON.stringify(rawData));
								var isMatch = false;
								
								if (typeof eiLevel !== "undefined") {
									_.each(eiLevel, function(value, idx, values) {
										if (rawData.ei_level) {
										
										}
									});
								}
								if (typeof eiDifficulty !== "undefined") {console.log('eiDifficulty');}
								if (typeof eiTextType !== "undefined") {console.log('eiTextType');}
								if (typeof eiTheme !== "undefined") {console.log('eiTheme');}
								if (typeof eiSubTheme !== "undefined") {console.log('eiSubTheme');}
								if (typeof eiWeakness !== "undefined") {console.log('eiWeakness');}
								if (typeof eiWords !== "undefined") {console.log('eiWords');}
								
								if (isMatch == true) {
									$scope.tab.filteringData.push(rawData);
								}
							});
						}*/
						
						/*for (var key in $scope.selectedSearchTag) {							
							console.log('data: ' + JSON.stringify($scope.selectedSearchTag[key]));
							
						}*/
						
						$scope.tab.data = $scope.tab.filteringData.slice(start, end);
						setPaging($scope.tab);
					}
				
          $scope.chooseItem = function (itemId, idx) {
						var cPage = $scope.tab.currentPage - 1;
						var sEntry = $scope.tab.selectedEntry;
						
						var actualIdx = idx + cPage * sEntry;
						
						for(var i=0; i<$scope.addItemsList.length; i++) {
							if ($scope.addItemsList[i]['id']==itemId) {
								return;
							}
						}
						
						if ($scope.chosenItemQtt >= $scope.totalItemQtt) {
							generalMessage.showMessageToast('error', 'Reach limit ' + ($scope.chosenItemQtt));
						} else {
							($scope.addItemsList).push($scope.tab.filteringData[actualIdx]);
							$scope.tab.filteringData[actualIdx].tmpAdd = true;
							$scope.tab.data[idx].tmpAdd = true;
							$scope.chosenItemQtt++;
						}
					}
							
					$scope.cancelChooseItem = function (itemId, idx) {
						var cPage = $scope.tab.currentPage - 1;
						var sEntry = $scope.tab.selectedEntry;
						
						var actualIdx = idx + cPage * sEntry;
						
						for(var i=0; i<$scope.addItemsList.length; i++) {
							if ($scope.addItemsList[i]['id']==itemId) {
								$scope.addItemsList.splice(i, 1);
							}
						}
						$scope.tab.filteringData[actualIdx].tmpAdd = false;
						$scope.tab.data[idx].tmpAdd = false;
						$scope.chosenItemQtt--;
					}
		
					$scope.removeItem = function (itemId, idx) {
						var cPage = $scope.tabs[0].currentPage - 1;
						var sEntry = $scope.tabs[0].selectedEntry;
						
						var actualIdx = idx + cPage * sEntry;
						
						for(var i=0; i<$scope.removeItemsList.length; i++) {
							if ($scope.removeItemsList[i]['id']==itemId) {
								return;
							}
						}
						($scope.removeItemsList).push($scope.tab.filteringData[actualIdx]);
						$scope.tab.filteringData[actualIdx].tmpRemove = true;
						$scope.tab.data[idx].tmpRemove = true;
						$scope.chosenItemQtt--;
					}
					
					$scope.cancelRemoveItem = function (itemId, idx) {
						var cPage = $scope.tabs[0].currentPage - 1;
						var sEntry = $scope.tabs[0].selectedEntry;
						
						var actualIdx = idx + cPage * sEntry;
									
						if ($scope.chosenItemQtt >= $scope.totalItemQtt) {
							generalMessage.showMessageToast('error', 'Reach limit ' + ($scope.chosenItemQtt));
						} else {
							for(var i=0; i<$scope.removeItemsList.length; i++) {
								if ($scope.removeItemsList[i]['id']==itemId) {
									$scope.removeItemsList.splice(i, 1);
								}
							}
							
							$scope.tab.filteringData[actualIdx].tmpRemove = false;
							$scope.tab.data[idx].tmpRemove = false;
							$scope.chosenItemQtt++;
						}
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
						$scope.tab.data = $scope.tab.filteringData.slice(start, end);
						
						setPaging();
					}

					$scope.pageSelect = function (newPage) {
						$location.hash('top');

						$anchorScroll();
						
						$scope.tab.currentPage = newPage;
						
						var start = ($scope.tab.currentPage-1) * $scope.tab.limit;
						var end = start + $scope.tab.limit;
									
						$scope.tab.data = $scope.tab.filteringData.slice(start, end);
						
						setPaging();
					}
					
					function setPaging () {
						$scope.tab.maxPage = Math.ceil($scope.tab.filteringData.length / $scope.tab.limit);
						
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
				templateUrl: 'app/main/pilot/choose-items/choose-items-detail/templates/select-items.html'
			}
		})
})();