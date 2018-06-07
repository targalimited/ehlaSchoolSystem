(function () {
  'use strict';

  angular
    .module('app.pilot.choose-items.choose-items-detail')
		.filter('makePositive', function() {
			return function(num) { 
				if (num != null) {
					return Math.abs(num);
				} else {
					return 0;
				}
			}
		})
    .controller('ChooseItemsDetailController', ChooseItemsDetailController);

  /** @ngInject */
  function ChooseItemsDetailController($timeout, $q, $sce, $rootScope, msUtils, loadingScreen, Restangular, $scope, $state, $mdDialog, generalMessage, $location, $anchorScroll) {
    var vm = this;
    
		$scope.setDirectiveTabOneFn = function(directiveFn) {
        $scope.setChooseItemSectionData = directiveFn;
    };
		$scope.setDirectiveTabTwoFn = function(directiveFn) {
        $scope.setItemLevelSectionData = directiveFn;
    };
		
		$scope.section = 1;
		$scope.chosenItemQtt = 0;
		$scope.totalItemQtt = 0;
		$scope.levelItemQtt = 0;
		$scope.isShowLoading = false;
		
		$scope.catGrouper = $state.params.catGrouper;	
					
		$scope.validLevels = {
			p1:false, p2:false,	p3:false,	p4:false,	p5:false,	p6:false,
			s1:false,	s2:false,	s3:false,	s4:false,	s5:false,	s6:false
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
					$scope.setChooseItemSectionData(false);			
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
					$scope.setItemLevelSectionData(false);					
				}}];
		
    $scope.init = function () {
			Restangular
				.one('get_school_item_summary')
				.get()
				.then(function (results) {	
					$scope.totalItemQtt = results.plain().total_item_qtt;
					$scope.levelItemQtt = results.plain().level_item_qtt;
					var valid_levels = results.plain().valid_levels;
					
					for (var i=0; i<valid_levels.length; i++) {
						$scope.validLevels[valid_levels[i]] = true;
					}
					
					$scope.chosenItemQtt = 0;
					
					$scope.display_levels_en = results.plain().display_levels_en;
					$scope.display_levels_zh = results.plain().display_levels_zh;
					
					$scope.items = results.plain().items;
					
					$scope.itemsArray = [];
					for (var key in $scope.items) {
						$scope.chosenItemQtt += $scope.items[key]['item_ids'].length;
						$scope.itemsArray.push($scope.items[key]);
					}							
				})
				.catch(function (err) {
					console.error('Cannot login', err.data);
				});	
    }
		
		$scope.switchSection = function (section) {
      $scope.section = section;	
			$scope.tabs[section-1].onSelect();		
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
