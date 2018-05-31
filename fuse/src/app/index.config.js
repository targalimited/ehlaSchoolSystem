(function () {
 'use strict';

 angular
  .module('fuse')
  .factory('sessionInjector', function ($q) {
   var sessionInjector = {
    request: function (config) {
     var accessToken = localStorage.getItem('access_token');
     var schoolId = localStorage.getItem('schoolId');
     if (accessToken) {
      config.headers['access-token'] = accessToken;
      config.headers['school_id'] = schoolId;
     }

     return config;
    },
    responseError: function (rejection) {
     if (rejection.status === 401) {
      localStorage.removeItem('access_token');
      location.reload();
     }
     return $q.reject(rejection);
    }
   };
   return sessionInjector;
  })
  .config(config);

 /** @ngInject */
 function config($translateProvider, RestangularProvider, $mdThemingProvider, $httpProvider) {
  // Put your common app configurations here

  // angular-translate configuration
  $translateProvider.useLoader('$translatePartialLoader', {
   urlTemplate: '{part}/i18n/{lang}.json'
  });

  $translateProvider.useLocalStorage();
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('sanitize');


  RestangularProvider.setBaseUrl('http://localhost:8000/v1/');
  $httpProvider.interceptors.push('sessionInjector');
  $mdThemingProvider.theme("success-toast");
  $mdThemingProvider.theme("error-toast");
  RestangularProvider.setDefaultHttpFields({withCredentials: true});
  /**
   RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {

      data: The data received got from the server
      operation: The operation made. It'll be the HTTP method used except for a GET which returns a list of element which will return getList so that you can distinguish them.
      what: The model that's being requested. It can be for example: accounts, buildings, etc.
      url: The relative URL being requested. For example: /api/v1/accounts/123
      response: Full server response including headers
      deferred: The deferred promise for the request.

      if (data.status === 401) {
        $state.go('app.login');
        return deferred.reject(data.data);
      } else if (data.status >= 400) {
        return deferred.reject(data.data);
      }
      return deferred.resolve(data.data);
    })
   **/
 }

})();
