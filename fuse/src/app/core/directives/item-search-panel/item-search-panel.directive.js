(function () {
    'use strict';

    angular
        .module('app.core')
				.directive( 'item-search-panel', function() {
			return {
				restrict: "E",
				scope:{
					language: '@',
					searchtag: '=searchtag',
					searchfeedback: '&',
					searchreset: '&'
				},
        link: function($scope, element, attrs) {
					
				},
				templateUrl: 'app/core/directives/item-search-panel/item-search-panel.html'
			}
		})
})();