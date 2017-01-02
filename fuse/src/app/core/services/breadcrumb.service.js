(function ()
{
  'use strict';

  angular
    .module('app.core')
    .factory('breadcrumb', breadcrumbService);

  /** @ngInject */
  function breadcrumbService($state)
  {
    var service = {
      getBreadCrumbs: getBreadCrumbs
    };

    return service;


    function getBreadCrumbs()
    {
      return {
        subject: _.toUpper($state.params.subject),
        class: _.toUpper($state.params.class),
        exercise: _.toUpper($state.params.exerciseId),
      }
    }
  }

})();
