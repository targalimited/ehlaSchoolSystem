(function ()
{
  'use strict';

  angular
    .module('app.core')
    .factory('generalMessage', generalMessage);

  /** @ngInject */
  function generalMessage($mdToast, $mdDialog)
  {
    var service = {
      showMessageToast: showMessageToast,
      showConfirm: showConfirm,
    };

    return service;


    function showConfirm(ev, title, content) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
          .title(title)
          .textContent(content)
          .ariaLabel('Attention')
          .targetEvent(ev)
          .ok('Confirm')
          .cancel('Cancel');

      return $mdDialog.show(confirm);
    }

    function showMessageToast(type, message)
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
