(function ()
{
    'use strict';

    angular
        .module('app.core')
        .factory('loadingScreen', loadingScreen);

    /** @ngInject */
    function loadingScreen($rootScope)
    {
        var service = {
            showLoadingScreen: showLoadingScreen,
            hideLoadingScreen: hideLoadingScreen,
        };

        return service;


        function showLoadingScreen(message)
        {
            $rootScope.isShowLoadingScreen = true;
        }

        function hideLoadingScreen(message)
        {
            $rootScope.isShowLoadingScreen = false;
        }
    }

})();
