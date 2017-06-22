(function () {
  'use strict';

  angular
    .module('app.homework.subjects.assignment')
    .controller('AssignmentController', AssignmentController);

  /** @ngInject */
  function AssignmentController(breadcrumbs, breadcrumb, $timeout, $rootScope, $scope, $state, $q, generalMessage, Restangular) {
    var vm = this;

    $scope.breadcrumbs = breadcrumbs;

    vm.classes = breadcrumbs.classes;

    // Data
    vm.menu = {
      /**
       {
         title: 'READING & LISTENING',
         deadline: '2016/10/09',
         questions: '3 Articles',
         remark: 'asdasd asdasd asdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd .....'
       },
       {
         title: 'WRITING',
         deadline: '2016/10/09',
         questions: '3 Articles',
         remark: 'asdasd asdasd asdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd .....'
       },
       **/
      video: {
        title: 'VIDEOS',
        deadline: 'To be assigned',
        questions: '-',
        remark: '-',
        /**
         deadline: '2017-03-18 14:20:11',
         questions: 'hide',
         remark: 'List of student personal reports',
         placeholder: [1],
         **/
        icon: 'icon-video',
        background: 'assets/images/menu/videos.jpeg',
        ngClick: function () {
          // generalMessage.showMessageToast('success', 'Coming Soon');
          $state.go("app.homework.subjects.assignment.classes.class.videos", { videoType: 'videos', classId: $rootScope.chosenClass.id });
        }
      },
      reading: {
        title: 'READING',
        deadline: 'To be assigned',
        questions: '-',
        remark: '-',
        /**
         deadline: '2017-03-18 14:20:11',
         questions: 'hide',
         remark: 'List of student personal reports',
         placeholder: [1],
         **/
        icon: 'icon-book-open',
        background: 'assets/images/menu/videos.jpeg',
        ngClick: function () {
          // generalMessage.showMessageToast('success', 'Coming Soon');
          $state.go("app.homework.subjects.assignment.classes.class.videos", { videoType: 'reading', classId: $rootScope.chosenClass.id });
        }
      },
      writing: {
        title: 'WRITING',
        deadline: 'To be assigned',
        questions: '-',
        remark: '-',
        /**
         deadline: '2017-03-18 14:20:11',
         questions: 'hide',
         remark: 'List of student personal reports',
         placeholder: [1],
         **/
        icon: 'icon-pen',
        background: 'assets/images/menu/videos.jpeg',
        ngClick: function () {
          // generalMessage.showMessageToast('success', 'Coming Soon');
          $state.go("app.homework.subjects.assignment.classes.class.videos", { videoType: 'writing', classId: $rootScope.chosenClass.id });
        }
      },
      teachingProgress: {
        title: 'TEACHING PROGRESS UPDATE',
        deadline: '2016/10/09',
        questions: '-',
        remark: '-',
        icon: 'icon-flag-variant',
        background: 'assets/images/menu/teaching-progress.jpeg',
        ngClick: function () {
          $state.go("app.homework.subjects.assignment.classes.class.teaching-progress", { classId: $rootScope.chosenClass.id });
        }
      },
      assessment: {
        title: 'ASSESSMENTS',
        deadline: '2016/10/09',
        questions: '-',
        remark: '-',
        icon: 'icon-calendar-check-multiple',
        background: 'assets/images/menu/assessment.jpeg',
        ngClick: function () {
          if (vm.menu.assessment.isHidden) {
            generalMessage.showMessageToast('error', 'Please update teaching progress first');
            return;
          }
          $state.go("app.homework.subjects.assignment.classes.class.exercises", {
            classId: $rootScope.chosenClass.id,
            exerciseType: 'assessments'
          });
        },
      },
      exercise: {
        title: 'EXERCISES',
        deadline: '2016/10/09',
        questions: '-',
        remark: '-',
        icon: 'icon-table-edit',
        background: 'assets/images/menu/exercise.jpeg',
        ngClick: function () {
          if (vm.menu.exercise.isHidden) {
            generalMessage.showMessageToast('error', 'Please create an assessment or wait for assessment to complete');
            return;
          }
          $state.go("app.homework.subjects.assignment.classes.class.exercises", {
            classId: $rootScope.chosenClass.id,
            exerciseType: 'exercises'
          });
        },
      },
      examination: {
        title: 'EXAMINATIONS',
        deadline: '2016/10/09',
        questions: '-',
        remark: '-',
        icon: 'icon-clipboard-account',
        background: 'assets/images/menu/exam.jpeg',
        ngClick: function () {
          if (vm.menu.examination.isHidden) {
            generalMessage.showMessageToast('error', 'Please create an assessment or wait for assessment to complete');
            return;
          }
          $state.go("app.homework.subjects.assignment.classes.class.exercises", {
            classId: $rootScope.chosenClass.id,
            exerciseType: 'examinations'
          });
        },
      },
      studentReport: {
        title: 'STUDENT REPORTS',
        deadline: 'Coming Soon',
        questions: '-',
        remark: '-',
        /**
         deadline: '2017-03-18 14:20:11',
         questions: 'hide',
         remark: 'List of student personal reports',
         placeholder: [1],
         **/
        icon: 'icon-account-multiple',
        background: 'assets/images/menu/student-report.jpeg',
        ngClick: function () {
          return generalMessage.showMessageToast('success', 'Coming Soon');
          /**
           if (vm.menu.studentReport.isHidden) {
                        generalMessage.showMessageToast('error', 'Please create an assessment or wait for assessment to complete');
                        return;
                    }
           $state.go("app.homework.subjects.assignment.classes.class.students", {
                        classId: $rootScope.chosenClass.id,
                    });
           **/
        },
      },
      consolidatedReport: {
        title: 'CONSOLIDATED REPORT',
        deadline: '2017-03-18 14:20:11', // last update time
        questions: 'hide',
        remark: 'An overview of the weaknesses diagnosis',
        placeholder: [1],
        icon: 'icon-chart-bar',
        background: 'assets/images/menu/consolidated-report.jpeg',
        ngClick: function () {
          $state.go("app.homework.subjects.assignment.classes.class.consolidated-report", {
            classId: $rootScope.chosenClass.id,
          });
        },
      },
    };

    vm.getItems = function () {
      return _.values(vm.menu);
    };

    $rootScope.chosenClass = $rootScope.chosenClass || vm.classes[0];

    // Methods
    vm.switchClass = function (assignedClass) {
      if ($rootScope.chosenClass.id === assignedClass.id) {
        return;
      }
      $rootScope.chosenClass = assignedClass;
      $scope.init();
    };


    $scope.init = function () {
      _.each(vm.menu, function (item, key) {
        if (key === 'teachingProgress' || key === 'assessment' || key === 'exercise' || key === 'examination') {
          item.deadline = 'Loading';
          item.questions = 'Resources';
          item.remark = 'Please be patient';
          item.isHidden = true;
        }
      });

      // get latest teaching progress
      Restangular.one('teachers', breadcrumbs.teacherId).one('subjects', breadcrumbs.subjectId).one('classes', $rootScope.chosenClass.id).one('teacherClassSubject').get()
        .then(function (results) {
          var curriculum = results.plain().curriculum;
          var progress = results.plain().data;
          if (progress && progress.length) {
            progress = _.sortBy(progress, ['updated_at']);
            vm.menu.teachingProgress.deadline = progress[0].updated_at;
            var cl = _.keys(curriculum).length;
            var taught = progress.length > cl ? cl : progress.length;
            vm.menu.teachingProgress.questions = taught + ' learning points taught';
            var toBeTaught = cl - progress.length;
            toBeTaught = toBeTaught < 0 ? 0 : toBeTaught;
            vm.menu.teachingProgress.remark = toBeTaught + ' learning points to be taught';
            vm.menu.assessment.isHidden = false;
          } else {
            vm.menu.teachingProgress.deadline = '-';
            vm.menu.teachingProgress.questions = '-';
            vm.menu.teachingProgress.remark = '-';
          }
          vm.menu.teachingProgress.isHidden = false;
        })
        .catch(function (err) {
          console.error('Cannot login', err);
        })
        .finally((function () {
        }));


      Restangular.one('teachers', breadcrumbs.teacherId).one('subjects', breadcrumbs.subjectId).one('classes', $rootScope.chosenClass.id).one('isAnyCompletedAssignment', 'assessment').get()
        .then(function (results) {
          var assignment = results.plain();
          console.log('any', assignment);
          if (assignment && assignment.id) {
            vm.menu.exercise.isHidden = false;
            vm.menu.examination.isHidden = false;
          }
        })
        .catch(function (err) {
          console.error('Cannot login', err);
        })
        .finally((function () {
        }));

      // get assessments
      _.each(['assessment', 'exercise', 'examination'], function (type, index) {
        Restangular.one('teachers', breadcrumbs.teacherId).one('subjects', breadcrumbs.subjectId).one('classes', $rootScope.chosenClass.id).one('latestAssignments', type).get()
          .then(function (results) {
            var assignment = results.plain();
            if (assignment) {
              vm.menu[type].deadline = assignment.end_date;
              vm.menu[type].questions = _.truncate(assignment.name, {
                'length': 15,
                'separator': ' '
              });
              vm.menu[type].remark = _.truncate(assignment.description, {
                'length': 100,
                'separator': ' '
              });
            } else {
              vm.menu[type].deadline = '-';
              vm.menu[type].questions = '-';
              vm.menu[type].remark = '-';
            }
          })
          .catch(function (err) {
            console.error('Cannot login', err);
          })
          .finally((function () {
          }));
      });
    }

    $scope.init();
    //////////
  }
})();
