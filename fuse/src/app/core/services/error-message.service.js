(function ()
{
  'use strict';

  angular
    .module('app.core')
    .factory('errorMessage', errorMessage);

  /** @ngInject */
  function errorMessage($mdToast)
  {
    var service = {
      showErrorMessageToast: showErrorMessageToast
    };

    return service;


    function showErrorMessageToast(type, message)
    {
      $mdToast.show(
        $mdToast.simple()
          .content(message)
          .hideDelay(4000)
          .position('top')
          .theme(type + "-toast")
      );
    }
  }

})();
