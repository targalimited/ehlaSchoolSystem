(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.extra-learning', [
      'ui.tree',
      //'app.homework.subjects.assignment.classes.class.extra-learning.learning-settings'
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
    $scope.pageTitle = _.upperFirst(breadcrumbs.learningType);
    vm.dtOptions = {
      autoWidth: false,
      responsive: true,
    };
    $scope.init = function () {
      $scope.loading = true;
      // english reading
      // post itemApi/get_by_category
      // {params: {id: "9", page: 1, limit: 10}}
      // english writing
      // {params: {id: "15", page: 1, limit: 10}}
      // chinese writing
      // {params: {id: "16", page: 1, limit: 10}}
      // english exam -> english reading exercise
      // {params: {id: "110", page: 1, limit: 10}}
      var params = { params: { id: "9", page: 1, limit: 9999 } };
      if (breadcrumbs.subject.s_name_en.toLowerCase().indexOf('english') === 0) {
        if (breadcrumbs.learningType === 'reading') {
          params.params.id = 9;
        } else if (breadcrumbs.learningType === 'writing') {
          params.params.id = 15;
        } else if (breadcrumbs.learningType === 'exam') {
          params.params.id = 110;
        }
      } else if (breadcrumbs.subject.s_name_en.toLowerCase().indexOf('chinese') === 0) {
        if (breadcrumbs.learningType === 'writing') {
          params.params.id = 16;
        }
      }

      vm.data = {
        list: [],
        unassigned: [],
        assigned: [],
      };

      Restangular.service('itemApi/get_by_category').post(params)
        .then(function (results) {
          vm.data.list = results.plain().data;
          console.log('vm.data.list', vm.data.list);
        })
        .catch(function (err) {
          console.error('Cannot login', err);
        })
        .finally((function () {
          $scope.loading = false;
        }));
    }

    $scope.init();

    $scope.section = 'unassigned';
    vm.switchSection = function (section) {
      $scope.section = section;
      if (!$rootScope.section) {
        $rootScope.section = {};
      }
      $rootScope.section['chosen' + $scope.pageTitle] = section;
    }

    vm.displayThemes = function (item) {
      return item.themes && item.themes.length ? _.reduce(item.themes, function (result, i) {
        return result + ' ' + i.name_en;
      }, ' | ') : '';
    }

    vm.previewItem = function (ev, item) {
      $mdDialog.show({
        controller: function (node, previewItem, $sce, $mdDialog) {
          var vm = this;
          vm.node = node;
          vm.item = previewItem;
          console.log('previewItem', previewItem);
          vm.cancel = vm.closeDialog = function () {
            $mdDialog.hide();
          };

          vm.trustSrc = function (src) {
            // res.result.data[0]['preview_en']
            return $sce.trustAsHtml(src);
          };
        },
        controllerAs: 'vm',
        templateUrl: 'app/main/homework/subjects/assignment/classes/class/extra-learning/templates/preview-item.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        escapeToClose: true,
        resolve: {
          previewItem: function () {
            loadingScreen.showLoadingScreen();
            //.post('/itemApi/getPreview'
            return Restangular.service('itemApi/get_preview_by_item_id').post({ params: { id: item.id } }).then(function (results) {
              return results.plain().data;
            })
              .catch(function (err) {
                console.log('err', err);
              })
              .finally(function () {
                loadingScreen.hideLoadingScreen();
              })
          }
        },
        locals: {
          node: item,
          event: ev,
        }
      });
    }
  }
})();
