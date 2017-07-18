(function () {
  'use strict';

  angular.module('app.calendar')
    .controller('EventFormDialogController', EventFormDialogController);

  /** @ngInject */
  function EventFormDialogController($scope, $rootScope, $mdDialog, dialogData, breadcrumbs, loadingScreen, generalMessage, Restangular) {
    var vm = this;

    // Data
    $scope.language = $rootScope.language;
    vm.type = dialogData.type;
    vm.teacherId = dialogData.teacherId;
    vm.calendarEvent = dialogData.calendarEvent;
    console.log('vm.calendarEvent', vm.calendarEvent);
    vm.classes = _.cloneDeep(breadcrumbs.teacherClasses);
    vm.notificationTimeUnit = ['minutes', 'hours', 'days'];
    vm.event = { unit: 'minutes' }
    vm.notificationTypes = [{ value: 'email', name: 'Email' }, { value: 'sms', name: 'SMS' }]

    // Methods
    vm.saveEvent = saveEvent;
    vm.removeEvent = removeEvent;
    vm.closeDialog = closeDialog;
    vm.viewAssignment = viewAssignment;

    init();

    //////////

    /**
     * Initialize
     */
    function init() {
      // Figure out the title
      switch (vm.type) {
        case 'add' :
          vm.dialogTitle = 'Add Event';
          break;

        case 'edit' :
          vm.dialogTitle = vm.calendarEvent.isOther ? 'View Event' : 'Edit Event';
          break;

        default:
          break;
      }
    }

    /**
     * Save the event
     */
    function saveEvent() {

      loadingScreen.showLoadingScreen();
      var postData = _.clone(vm.calendarEvent);
      // Add new
      postData.teacher_id = vm.teacherId;
      postData.period = parseInt(postData.period);
      postData.start_time = moment(postData.start_time).format('YYYY-MM-DD HH:mm:ss');
      postData.end_time = moment(postData.end_time).format('YYYY-MM-DD HH:mm:ss');
      if (!_.isUndefined(postData.period_type) && !_.isNaN(postData.period) && postData.period > 0) {
        postData.notification = 1;
      }
      delete postData.end;
      delete postData.start;
      delete postData.source;

      var allClass = _.remove(postData.class_ids, function (class_id) {
        return parseInt(class_id) === -1;
      });

      if (allClass && allClass.length) {
        postData.class_ids = _.map(vm.classes, 'id');
      }

      var promise;
      var action;
      if (vm.type === 'add') {
        promise = Restangular.service('events').post(postData);
        action = 'create';
      } else {
        promise = Restangular.all('events/' + postData.id).customPUT(postData);
        action = 'update';
      }

      promise
        .then(function (results) {
          console.log(results);
          generalMessage.showMessageToast('success', 'Event ' + action + ' successfully.');
          $mdDialog.hide('success');
        })
        .catch(function (err) {
          console.error('Cannot login', err);
          generalMessage.showMessageToast('error', 'Event ' + action + ' unsuccessfully.');
        })
        .finally((function () {
          loadingScreen.hideLoadingScreen();
        }));
    }


    function viewAssignment() {
      // $state.go('')
    }

    /**
     * Remove the event
     */
    function removeEvent($event) {
      loadingScreen.showLoadingScreen();

      Restangular.all('events/' + vm.calendarEvent.id).customDELETE()
        .then(function (res) {
          console.log(res);
          generalMessage.showMessageToast('success', 'Event delete successfully.')
          $mdDialog.hide('success');
        })
        .catch(function (err) {
          console.error('Cannot login', err);
          generalMessage.showMessageToast('error', 'Event delete unsuccessfully.')
        })
        .finally(function () {
          loadingScreen.hideLoadingScreen();
        })
    }

    /**
     * Close the dialog
     */
    function closeDialog() {
      $mdDialog.cancel();
    }
  }
})();
