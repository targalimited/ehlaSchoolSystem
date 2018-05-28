(function () {
  'use strict';

  angular
    .module('app.pilot.english')
    .controller('EnglishController', EnglishController);

  /** @ngInject */
  function EnglishController($timeout, $rootScope, $scope, $state, $q, generalMessage, Restangular) {
    var vm = this;
		
		//console.log('err', $state);
		
    // Methods		
    vm.getItems = function () {
			_.each(vm.menu, function (item, key) {
				item.ngClick = function () {
					$scope.cardClick(item);
        }				
			});	
			
      return vm.menu;
    };

		$scope.cardClick = function(card) {			
			if (card.status == 'view-only') {
				generalMessage.showMessageToast('success', 'Coming soon.');
				//generalMessage.showMessageToast('warning', 'Loading... please wait');
			} else {
				var params = { 
					categoryId: card.target_id,
					classId: $rootScope.chosenClass.id
				}
				
				$state.go("app.pilot.english.category", params);
			}
		}	
		
    vm.switchClass = function (assignedClass) {
      if ($rootScope.chosenClass.id === assignedClass.id) {
        return;
      }
      $rootScope.chosenClass = assignedClass;
      $scope.init();
    };

    $scope.init = function () {
			Restangular
				.one('get_school_category')
				.one('subject_id', 1)
				.get()
				.then(function (results) {	
					vm.menu = results.plain().data;
					vm.classes = results.plain().metadata.classes;
					
					$rootScope.chosenClass = $rootScope.chosenClass || vm.classes[0];
		
        });	
    }

    $scope.init();
    //////////
		
  }
})();
