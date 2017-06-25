(function () {
  'use strict';

  angular
    .module('app.calendar')
    .controller('CalendarController', CalendarController);

  /** @ngInject */
  function CalendarController($mdDialog, $timeout, $mdSticky, $document, $scope, breadcrumbs, loadingScreen, generalMessage, Restangular) {
    var vm = this;
    $scope.events = {};
    vm.eventTypes = [
      {
        name: 'My Teaching Events',
        type: 'private',
        color: 'rgb(164, 122, 226)',
        disableColor: 'rgb(164, 122, 226, 0.2)'
      },
      { name: 'Assessments', type: 'assessment', color: 'rgb(81, 183, 73)', disableColor: 'rgb(81, 183, 73, 0.2)' },
      { name: 'Exercises', type: 'exercise', color: 'rgb(84, 132, 237)', disableColor: 'rgb(84, 132, 237, 0.2)' },
      {
        name: 'Examinations',
        type: 'examination',
        color: 'rgb(208, 107, 100)',
        disableColor: 'rgb(208, 107, 100, 0.2)'
      },
      { name: 'Others', type: 'others', color: 'rgb(204, 204, 204)', disableColor: 'rgb(208, 107, 100, 0.2)' }
    ]

    vm.toggleFilter = function (type) {
      console.log(vm.chosenClasses)
      if (type) {
        $scope.events[type].isVisible = !$scope.events[type].isVisible;
      }

      var classes = _.reduce(vm.chosenClasses, function (result, c, classId) {
        if (c) {
          result.push(parseInt(classId));
        }
        return result;
      }, []);

      _.each($scope.events, function (eventObject, type) {
        vm.calendar.removeEventSource(eventObject);

        if (eventObject.isVisible) {
          var originalEvents = $scope.originalEvents[type];
          eventObject.events = _.reduce(originalEvents.events, function (result, event) {
            if (event.class_ids && event.class_ids.length && _.intersection(classes, event.class_ids).length > 0) {
              result.push(event);
            }
            return result;
          }, []);
          console.log('eventObject', eventObject)
          vm.calendar.addEventSource(eventObject);
        }
      });
    }


    $scope.init = function () {
      $scope.loading = true;
      loadingScreen.showLoadingScreen();
      vm.events = [];
      vm.chosenClasses = {};
      Restangular.one('events').get({ teacher_id: breadcrumbs.teacherId })
        .then(function (res) {
          var result = res.plain().data.self;
          var others = res.plain().data.others;
          _.each(others, function (o) {
            o.isOther = true;
          });
          result = result.concat(others);
          // console.log('res.plain().data.others', res.plain().data.others);
          vm.classes = _.cloneDeep(breadcrumbs.teacherClasses);
          console.log(result, vm.classes);

          $scope.events = {
            private: {
              isVisible: true,
              color: 'rgb(164, 122, 226)',
              textColor: 'white',
              events: []
            },
            assessment: {
              isVisible: true,
              color: 'rgb(81, 183, 73)',
              textColor: 'white',
              events: []
            },
            exercise: {
              isVisible: true,
              color: 'rgb(84, 132, 237)',
              textColor: 'white',
              events: []
            },
            examination: {
              isVisible: true,
              color: 'rgb(208, 107, 100)',
              textColor: 'white',
              events: []
            },
            others: {
              isVisible: true,
              color: 'rgb(204, 204, 204)',
              textColor: 'gray',
              events: []
            }
          };


          _.each(vm.classes, function (classObj) {
            vm.chosenClasses[classObj.id] = true;
          });

          _.each(result, function (r) {
            r.title = r.name;
            r.start = new Date(r.start_time);
            r.end = new Date(r.end_time);
            if (r.type === 'assignment') {
              r.class_ids = [r.assignment.teacher_class_subject.class_id];
            } else {
              r.class_ids = _.map(r.classes, 'id');
            }

            var type = r.isOther ? 'others' : (r.assignment ? r.assignment.type : r.type);
            console.log(type);
            if (!_.isUndefined($scope.events[type])) {
              $scope.events[type].events.push(r);
              console.log('id', r.id);
            }
            //if (!_.isEmpty(r.assignment) && !_.isEmpty(r.assignment.teacher_class_subject)) {
            //    vm.chosenClasses[r.assignment.teacher_class_subject.class_id] = true;
            //}

            if (r.notifications && r.notifications.length) {
              r.period_type = r.notifications[0].period_type;
              r.period = r.notifications[0].period;
              r.notificationType = r.notifications[0].type;
            }
          });

          $scope.originalEvents = _.cloneDeep($scope.events);
          vm.events = [$scope.events.private, $scope.events.assessment, $scope.events.exercise, $scope.events.examination, $scope.events.others];
          console.log(vm.events);
        })
        .catch(function (err) {
          console.error('Cannot login', err);
        })
        .finally(function () {
          loadingScreen.hideLoadingScreen();
          $scope.loading = false;
        });
    }

    $scope.init();

    var tooltip;

    vm.calendarUiConfig = {
      calendar: {
        editable: true,
        eventLimit: true,
        header: '',
        handleWindowResize: false,
        aspectRatio: 1,
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        viewRender: function (view) {
          vm.calendarView = view;
          vm.calendar = vm.calendarView.calendar;
          vm.currentMonthShort = vm.calendar.getDate().format('MMM');
        },
        columnFormat: {
          month: 'ddd',
          week: 'ddd D',
          day: 'ddd M'
        },
        eventClick: eventDetail,
        eventDrop: function (data, event) {
          data.start_time = data.start;
          data.end_time = data.end;
          var postData = _.clone(data);
          postData.teacher_id = breadcrumbs.teacherId;
          postData.period = parseInt(postData.period);
          postData.start_time = moment(postData.start).format('YYYY-MM-DD HH:mm:ss');
          postData.end_time = moment(postData.end).format('YYYY-MM-DD HH:mm:ss');
          if (!_.isUndefined(postData.period_type) && !_.isNaN(postData.period) && postData.period > 0) {
            postData.notification = 1;
          }
          delete postData.source;
          Restangular.all('events/' + postData.id).customPUT(postData)
            .then(function (results) {
              console.log(results);
              _.each($scope.originalEvents, function (obj) {
                var f = _.find(obj.events, function (e) {
                  return e.id === postData.id;
                });

                if (f) {
                  f.period = postData.period;
                  f.start_time = postData.start_time;
                  f.end_time = postData.end_time;
                  f.start = data.start;
                  f.end = data.end;
                  console.log('f', f);
                }
              });
              generalMessage.showMessageToast('success', 'Event update successfully.');
            })
            .catch(function (err) {
              console.error('Cannot login', err);
              generalMessage.showMessageToast('error', 'Event update unsuccessfully.');
            })
        },
        eventMouseover: function (data, event) {
          $(event.target).qtip({
            content: '<h3>' + data.title + '</h3>' +
            '<p><b>Start Time:</b> ' + moment(data.start).format('YYYY-MM-DD HH:mm:ss') + '<br />' +
            (data.end && '<p><b>End Time:</b> ' + (moment(data.end).format('YYYY-MM-DD HH:mm:ss')) + '</p><p>Notes: ' + data.description + '</p>' || ''),
            show: {
              event: event.type,
              ready: true,
              delay: 0,
            },
            position: {
              my: 'bottom center',
              at: 'top center',
              target: $(this),
            },
            hide: {
              fixed: true
            },
            style: 'qtip-tipsy'
          }, event);
        },
        eventMouseout: function () {
          //tooltip.hide();
        },
        selectable: true,
        selectHelper: true,
        select: select
      }
    };

    // Methods
    vm.addEvent = addEvent;
    vm.next = next;
    vm.prev = prev;

    //////////

    /**
     * Go to next on current view (week, month etc.)
     */
    function next() {
      vm.calendarView.calendar.next();
    }

    /**
     * Go to previous on current view (week, month etc.)
     */
    function prev() {
      vm.calendarView.calendar.prev();
    }

    /**
     * Show event detail
     *
     * @param calendarEvent
     * @param e
     */
    function eventDetail(calendarEvent, e) {
      showEventDetailDialog(calendarEvent, e);
    }

    /**
     * Add new event in between selected dates
     *
     * @param start
     * @param end
     * @param e
     */
    function select(start, end, e) {
      showEventFormDialog('add', false, start, end, e);
    }

    /**
     * Add event
     *
     * @param e
     */
    function addEvent(e) {
      var start = new Date(),
        end = new Date();

      showEventFormDialog('add', false, start, end, e);
    }

    /**
     * Show event detail dialog
     * @param calendarEvent
     * @param e
     */
    function showEventDetailDialog(calendarEvent, e) {
      showEventFormDialog('edit', calendarEvent, null, null, e);
    }

    /**
     * Show event add/edit form dialog
     *
     * @param type
     * @param calendarEvent
     * @param start
     * @param end
     * @param e
     */
    function showEventFormDialog(type, calendarEvent, start, end, e) {
      console.log('type', type)
      var dialogData = {
        type: type,
        calendarEvent: calendarEvent,
        teacherId: breadcrumbs.teacherId,
      };

      $mdDialog.show({
        controller: 'EventFormDialogController',
        controllerAs: 'vm',
        templateUrl: 'app/main/calendar/dialogs/event-form/event-form-dialog.html',
        parent: angular.element($document.body),
        targetEvent: e,
        clickOutsideToClose: true,
        locals: {
          dialogData: dialogData,
          breadcrumbs: breadcrumbs,
        }
      }).then(function (response) {
        console.log('response', response)
        if (response === 'success') {
          $scope.init();
        }
      });
    }
  }

})();
