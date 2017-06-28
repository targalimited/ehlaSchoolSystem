(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.extra-learning', [
      'ui.tree',
      'app.homework.subjects.assignment.classes.class.extra-learning.learning-settings'
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assignment.classes.class.extra-learning', {
        url: '/extra-learning/:learningType',
        views: {
          'content@app': {
            templateUrl: 'app/main/homework/subjects/assignment/classes/class/extra-learning/extra-learning.html',
            controller: 'ExtraLearningController as vm'
          }
        },
        resolve: {
          breadcrumbs: function (breadcrumb, $stateParams) {
            return breadcrumb.getBreadCrumbs($stateParams);
          },
        },
        ncyBreadcrumb: {
          label: '{{breadcrumbs.learningType}}',
        },
        authenticate: true,
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment/classes/class/extra-learning');
  }
})();


(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.extra-learning')
    .controller('ExtraLearningController', ExtraLearningController);

  /** @ngInject */
  function ExtraLearningController($rootScope, breadcrumb, breadcrumbs, msUtils, tableTree, loadingScreen, Restangular, $scope, $state, $mdDialog) {
    var vm = this;
    $scope.breadcrumbs = breadcrumbs;
    $scope.pageTitle = _.upperFirst($scope.breadcrumbs.learningType);

    $scope.init = function () {
      $scope.loading = true;
      breadcrumb.getWeaknessList(breadcrumbs.subjectId)
        .then(function (results) {
          vm.assigned.data = _.cloneDeep(results.data);
          (function assign(nodes) {
            _.each(nodes, function (node) {
              if (node.child && node.child.length) {
                assign(node.child);
              } else {
                node.selectedExercise = {};
                node.selectedExercise[Math.floor(Math.random() * 5) + 1] = true;
                node.selectedVideos = {};
                node.selectedVideos[node.concept_video_ids[0]] = true;
                node.start_date = moment().add(-(Math.floor(Math.random() * 10)), 'days').format('YYYY-MM-DD HH:mm:ss');
                node.end_date = moment().add((Math.ceil(Math.random() * 10)), 'days').format('YYYY-MM-DD HH:mm:ss');
              }
            });
          })(vm.assigned.data);
          vm.assigned.categories = _.cloneDeep(results.categories);

          vm.unassigned.data = _.cloneDeep(results.data);
          console.log(vm.unassigned.data)
          vm.unassigned.categories = _.cloneDeep(results.categories);

          $scope.applyFilterAssigned();
          $scope.applyFilterUnassigned();
        })
        .catch(function (err) {
          console.error('Cannot login', err);
        })
        .finally((function () {
          $scope.loading = false;
        }));
    }

  }
})();
