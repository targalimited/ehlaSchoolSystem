(function () {
  'use strict';

  angular
    .module('app.pilot.english.category')
    .controller('CategoryController', CategoryController)
	
  /** @ngInject */
  function CategoryController($rootScope, DTOptionsBuilder, msUtils, loadingScreen, Restangular, $scope, $state, $mdDialog, $location, $anchorScroll) {
    var vm = this;
		$scope.section = 1;
		
		$scope.classId = $state.params.classId;
		$scope.categoryId = $state.params.categoryId;
		$scope.subjectId = 1;
		$scope.academicId = 1;
		
		//init
		$scope.tabs = [
			{tab:1,
				label_en:"Available",
				label_zh:"已啟動"},
			{tab:2,
				label_en:"In progress",
				label_zh:"進行中"},
			{tab:3,
				label_en:"Completed",
				label_zh:"完成"}];

    $scope.init = function () {
			for (var i=0; i < $scope.tabs.length; i++) {
				$scope.tabs[i].limit = 10;
				$scope.tabs[i].rawData = [];
				$scope.tabs[i].data = [];
				$scope.tabs[i].selectedEntry = "10";
				$scope.tabs[i].currentPage = 1;
				$scope.tabs[i].onSelect = function () {
					setSectionData(this);					
        }
			}
    }

    $scope.init();
	  
		$scope.switchSection = function (section) {
      $scope.section = section;
			$scope.tabs[section-1].onSelect();			
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
		
		function setSectionData (tabDetail) {
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
											category_id: $scope.categoryId, 
											class_id: $scope.classId, 
											subject_id: $scope.subjectId, 
											academic_id: $scope.academicId, 
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
						console.error('Cannot login', err);
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
      $state.go('app.pilot.english')
    }
		
    vm.viewSettings = function (id) {
      $state.go('app.pilot.english.category.item', { itemId: id})
    }
  }
})();
