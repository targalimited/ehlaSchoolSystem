(function ()
{
    'use strict';

    angular
        .module('app.pilot.choose-items')
        .controller('ChooseItemsController', ChooseItemsController);

    /** @ngInject */
    function ChooseItemsController($scope, Restangular, $state){
			
			$scope.init = function () {
				Restangular
					.one('get_school_item_summary')
					.get()
					.then(function (results) {	
						$scope.total_item_qtt = results.plain().total_item_qtt;
						$scope.level_item_qtt = results.plain().level_item_qtt;
						$scope.valid_levels = results.plain().valid_levels;
						
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
			}

			$scope.init();
			
			$scope.gotoCategory = function(catGrouper) {
				$state.go('app.pilot.choose-items.choose-items-detail', { catGrouper: catGrouper})
				
			}
    }
})();
