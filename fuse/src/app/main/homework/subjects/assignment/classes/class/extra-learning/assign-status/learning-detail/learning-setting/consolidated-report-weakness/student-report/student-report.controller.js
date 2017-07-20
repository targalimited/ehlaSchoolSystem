(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.extra-learning.assign-status.learning-detail.learning-setting.consolidated-report-weakness.student-report', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.homework.subjects.assignment.classes.class.extra-learning.assign-status.learning-detail.learning-setting.consolidated-report-weakness.student-report', {
        url: '/student-report',
        views: {
          'content@app': {
            templateUrl: 'app/main/homework/subjects/assignment/classes/class/extra-learning/assign-status/learning-detail/learning-setting/consolidated-report-weakness/student-report/student-report.html',
            controller: 'StudentReportController as vm'
          }
        },
        resolve: {
          breadcrumbs: function (breadcrumb, $stateParams) {
            return breadcrumb.getBreadCrumbs($stateParams);
          },
          StudentsData: function (msApi) {
            return msApi.resolve('students@get');
          }
        },
        ncyBreadcrumb: {
          label: 'Students Report'
        },
        authenticate: true,
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/homework/subjects/assignment/classes/class/extra-learning/assign-status/learning-detail/learning-setting/consolidated-report-weakness/student-report');

    // Api
    msApiProvider.register('students', ['app/data/students/students.json']);
  }
})();


(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment.classes.class.extra-learning.assign-status.learning-detail.learning-setting.consolidated-report-weakness.student-report')
    .controller('StudentReportController', StudentReportController);

  /** @ngInject */
  function StudentReportController($state, StudentsData, breadcrumbs, $scope, $mdDialog) {
    var vm = this;

    $scope.breadcrumbs = breadcrumbs;
    // Data
    vm.students = StudentsData.data;
    _.each(vm.students, function (student) {
      var historyCount = Math.ceil(Math.random() * 30);
      historyCount = historyCount < 6 ? 6 : historyCount;
      var assignmentTypes = ['Assessment', 'Exercise', 'Examination'];

      student.results = _.reduce(_.range(1, historyCount), function (result, index) {
        result.push({
          date: moment().add(-index, 'days').toDate(),
          name: assignmentTypes[_.random(0, 2)] + ' ' + index,
          correct: _.random(0, 1),
        });
        return result;
      }, []);
      student.correct = _.sumBy(student.results, 'correct');
      student.total = student.results.length;
      student.percentage = Math.floor(student.correct / student.total * 100);
    })

    //////////

    vm.back = function () {
      $state.go('app.homework.subjects.assignment.classes.class.extra-learning.assign-status.learning-detail.learning-setting')
    }

    vm.getGradeIconClass = function (student) {
      // console.log(student.percentage);
      switch (true) {
        case student.percentage > 60:
          return ['icon-emoticon-cool'];
        case student.percentage > 50:
          return ['icon-emoticon-happy'];
        case student.percentage > 40:
          return ['icon-emoticon-neutral'];
        default:
          return ['icon-emoticon-sad'];
      }
    }

    vm.getGradeTitle = function (student) {
      switch (true) {
        case student.percentage > 60:
          return 'Correct >60%';
        case student.percentage > 50:
          return 'Correct 50-60%';
        case student.percentage > 40:
          return 'Correct 40-50%';
        default:
          return 'Correct <40%';
      }
    }

    vm.showResultsHistory = function (ev, results) {
      $mdDialog.show({
        controller: function ($scope, $rootScope, history) {
          var vm = this;
          $scope.language = $rootScope.language;
          vm.history = history;
          vm.cancel = vm.closeDialog = function () {
            $mdDialog.hide();
          }
        },
        controllerAs: 'vm',
        templateUrl: 'app/main/homework/subjects/assignment/classes/class/consolidated-report/consolidated-report-weakness/student-report/template/result-history.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        escapeToClose: true,
        locals: {
          history: results,
          event: ev,
        }
      });


      /**
       var content = '<h3>Latest Result Details</h3>' +
       '<table><tr><th>Correctness</th><th>Assignment</th><th>Time</th></tr>';
       _.each(results, function (result) {
                content += '<tr><td><i flex class="icon s20 icon-'+(result.isCorrect ? 'check' : 'close')+'"></i></td><td>'+ result.assignment.name +'</td><td></td></tr>';
            });
       content += '</table>';


       $(event.target).qtip({
                content: content,
                show: {
                    event: event.type,
                    ready: true,
                    delay: 0,
                },
                position: {
                    my:'bottom center',
                    at:'top center',
                    target: $(this),
                },
                hide: {
                    fixed: true
                },
                style: 'qtip-tipsy'
            }, event);
       **/
    }

  }
})();
