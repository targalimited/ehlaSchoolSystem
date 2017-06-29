(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.extra-learning.learning-setting', [
      'ui.tree',
      //'app.homework.subjects.assignment.classes.class.extra-learning.learning-setting.learning-settings'
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assignment.classes.class.extra-learning.learning-setting', {
        url: '/settings',
        views: {
          'content@app': {
            templateUrl: 'app/main/homework/subjects/assignment/classes/class/extra-learning/learning-setting/learning-setting.html',
            controller: 'LearningSettingController as vm'
          }
        },
        resolve: {
          breadcrumbs: function (breadcrumb, $stateParams) {
            return breadcrumb.getBreadCrumbs($stateParams);
          },
        },
        ncyBreadcrumb: {
          label: 'Settings',
        },
        authenticate: true,
      });

    // Translation
    // $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment/classes/class/extra-learning');
  }
})();


(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.extra-learning.learning-setting')
    .controller('LearningSettingController', LearningSettingController);

  /** @ngInject */
  function LearningSettingController($rootScope, breadcrumb, breadcrumbs, msUtils, tableTree, loadingScreen, Restangular, $scope, $state, $mdDialog) {
    var vm = this;
    $scope.breadcrumbs = breadcrumbs;
    
  }
})();
