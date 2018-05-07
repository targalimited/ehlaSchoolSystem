(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('breadcrumb', breadcrumbService);

  /** @ngInject */
  function breadcrumbService($rootScope, $state, $translate, $q, Restangular, $mdDialog, $document) {

    var values = { weaknesses: {} };

    var service = {
      values: values,
      getBreadCrumbs: getBreadCrumbs,
      setWeaknessList: setWeaknessList,
      getWeaknessList: getWeaknessList,
      getConsolidatedReport: getConsolidatedReport,
      showErrorBarChart: showErrorBarChart,
      getCurriculumWeaknessList: getCurriculumWeaknessList,
    };


    // De-activate loading indicator
    var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function () {
      values.language = $translate.use();
      console.log('values.language', values.language);
    });

    // Cleanup
    $rootScope.$on('$destroy', function () {
      stateChangeSuccessEvent();
    });

    $rootScope.$on('logout', function () {
      values = { weaknesses: {} };
    });

    return service;

    function showErrorBarChart(ev, weakness, history, type) {
      if (!type) {
        type = 'frequency'
      }

      $mdDialog.show({
        controller: function ($scope, $rootScope, weakness, history, $mdDialog) {
          var vm = this;
          $scope.language = $rootScope.language;
          vm.weakness = weakness;
          vm.history = history;
          vm.cancel = vm.closeDialog = function () {
            $mdDialog.hide();
          }

          if (type === 'frequency') {
            vm.title = 'Historical Error Record by Frequency';
          } else {
            vm.title = 'Historical Error Record by Student';
          }


          vm.options = {
            chart: {
              type: 'multiBarChart',
              height: 450,
              margin: {
                top: 20,
                right: 20,
                bottom: 45,
                left: 45
              },
              clipEdge: true,
              // staggerLabels: true,
              duration: 500,
              stacked: type === 'frequency',
              showValues: true,
              reduceXTicks: false,
              xAxis: {
                axisLabel: 'Assignments',
                showMaxMin: false,
                tickFormat: function (d) {
                  return d;
                }
              },
              yAxis: {
                axisLabel: 'Rate',
                axisLabelDistance: -20,
                tickFormat: function (d) {
                  return d;
                }
              },
            }
          };


          var data;
          if (type === 'frequency') {
            data = { correct: [], incorrect: [] };
            _.each(history, function (h, index) {
              data.correct.push({
                x: 'A' + (index + 1),
                y: h.correct
              });
              data.incorrect.push({
                x: 'A' + (index + 1),
                y: h.total - h.correct
              });
            });
            vm.data = [{
              key: 'Incorrect',
              color: '#ff3e3e',
              values: data.incorrect,
            }, {
              key: 'Correct',
              color: '#3eff99',
              values: data.correct,
            }];
          } else {
            data = {};
            _.each(history, function (h, index) {
              if (!data[h.assignment.id]) {
                data[h.assignment.id] = { 0: 0, 1: 0, 25: 0, 50: 0, 75: 0, 100: 0 };
              }
              _.each(h.assignmentStudents, function (student, studentId) {
                var percent = ((student.total - student.correct) / student.total) * 100;
                if (percent === 0) {
                  data[h.assignment.id][0]++;
                }
                if (percent > 0) {
                  data[h.assignment.id][1]++;
                }
                if (percent >= 25) {
                  data[h.assignment.id][25]++;
                }
                if (percent >= 50) {
                  data[h.assignment.id][50]++;
                }
                if (percent >= 75) {
                  data[h.assignment.id][75]++;
                }
                if (percent === 100) {
                  data[h.assignment.id][100]++;
                }
              });
            });

            var graph = {};
            var index = 1;
            _.each(data, function (assignment, assignmentId) {
              _.each(assignment, function (value, range) {
                if (!graph[range]) {
                  graph[range] = []
                }
                graph[range].push({
                  x: 'A' + index,
                  y: value,
                });
              });
              index++;
            })


            if (_.keys(graph).length) {
              vm.data = [{
                key: '0% Error',
                color: 'rgb(9, 255, 0)',
                values: graph[0],
              }, {
                key: '>0% Error',
                color: 'rgb(205, 251, 84)',
                values: graph[1],
              }, {
                key: '≥25% Error',
                color: 'rgb(255, 210, 62)',
                values: graph[25],
              }, {
                key: '≥50% Error',
                color: 'rgb(247, 132, 57)',
                values: graph[50],
              }, {
                key: '≥75% Error',
                color: 'rgb(243, 84, 14)',
                values: graph[75],
              }, {
                key: '100% Error',
                color: 'rgb(249, 0, 0)',
                values: graph[100],
              }];
            }
          }

          console.log('vm.data', vm.data);

          vm.save = function () {
            console.log(vm.form)
            $mdDialog.hide();
          }
        },
        controllerAs: 'vm',
        templateUrl: 'app/main/homework/subjects/assignment/classes/class/consolidated-report/templates/error-history-chart.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        escapeToClose: true,
        locals: {
          weakness: weakness,
          history: history,
          event: ev,
        }
      });
    }

    function getConsolidatedReport(result) {
      var a;
      var r = _.reduce(result.weaknesses, function (ra, value) {
        if (!ra[value.weakness_id]) {
          var history = {};
          var students = {};
          a = _.find(result.assignments, function (a) {
            return a.id === value.assignment_id;
          });

          var assignmentStudents = {};
          assignmentStudents[value.student_id] = {
            correct: parseInt(value.correctRate),
            total: parseInt(value.total),
          };
          history[value.assignment_id] = {
            weakness_id: value.weakness_id,
            assignment: a,
            assignmentStudents: assignmentStudents,
            correct: parseInt(value.correctRate),
            total: parseInt(value.total),
          };
          students[value.student_id] = {
            correct: parseInt(value.correctRate),
            total: parseInt(value.total),
          };

          ra[value.weakness_id] = {
            weakness_id: value.weakness_id,
            history: history,
            students: students,
            correct: parseInt(value.correctRate),
            total: parseInt(value.total),
          }
        } else {
          if (ra[value.weakness_id].students[value.student_id]) {
            ra[value.weakness_id].students[value.student_id].correct += parseInt(value.correctRate);
            ra[value.weakness_id].students[value.student_id].total += parseInt(value.total);
          } else {
            ra[value.weakness_id].students[value.student_id] = {
              correct: parseInt(value.correctRate),
              total: parseInt(value.total),
            }
          }

          if (ra[value.weakness_id].history[value.assignment_id]) {
            if (!ra[value.weakness_id].history[value.assignment_id].assignmentStudents[value.student_id]) {
              ra[value.weakness_id].history[value.assignment_id].assignmentStudents[value.student_id] = {
                correct: 0,
                total: 0
              };
            }
            ra[value.weakness_id].history[value.assignment_id].assignmentStudents[value.student_id].correct += parseInt(value.correctRate);
            ra[value.weakness_id].history[value.assignment_id].assignmentStudents[value.student_id].total += parseInt(value.total);

            ra[value.weakness_id].history[value.assignment_id].correct += parseInt(value.correctRate);
            ra[value.weakness_id].history[value.assignment_id].total += parseInt(value.total);
          } else {
            a = _.find(result.assignments, function (a) {
              return a.id === value.assignment_id;
            });

            var assignmentStudents = {};
            assignmentStudents[value.student_id] = {
              correct: parseInt(value.correctRate),
              total: parseInt(value.total),
            };
            ra[value.weakness_id].history[value.assignment_id] = {
              weakness_id: value.weakness_id,
              assignment: a,
              assignmentStudents: assignmentStudents,
              sort: a.end_date,
              correct: parseInt(value.correctRate),
              total: parseInt(value.total),
            };
          }

          ra[value.weakness_id].correct += parseInt(value.correctRate);
          ra[value.weakness_id].total += parseInt(value.total);
        }
        return ra;
      }, {})

      _.each(r, function (b) {
        b.history = _.orderBy(_.values(b.history), 'sort', 'desc');
        b.students = _.values(b.students);
        b.studentErrorDistributions = { 0: 0, 1: 0, 25: 0, 50: 0, 75: 0, 100: 0 };
        _.each(b.students, function (s) {
          var percent = ((s.total - s.correct) / s.total) * 100;
          if (percent === 0) {
            b.studentErrorDistributions[0]++;
          }
          if (percent > 0) {
            b.studentErrorDistributions[1]++;
          }
          if (percent >= 25) {
            b.studentErrorDistributions[25]++;
          }
          if (percent >= 50) {
            b.studentErrorDistributions[50]++;
          }
          if (percent >= 75) {
            b.studentErrorDistributions[75]++;
          }
          if (percent === 100) {
            b.studentErrorDistributions[100]++;
          }
        });
        b.latest = b.history[0];
      });

      return _.values(r);
    }

    function setWeaknessList(w) {
      values.weaknesses = w;
    }

    function getCurriculumWeaknessList(teacherId, subjectId, classId) {
      //if (values.weaknesses[classId] && values.weaknesses[classId][subjectId]) {
      //    return $q.when(_.cloneDeep(values.weaknesses[classId][subjectId]));
      //} else {
      return Restangular.one('teachers', teacherId).one('subjects', subjectId).one('classes', classId).one('teacherClassSubject').get()
        .then(function (results) {
          var weaknessList = results.plain().weakness_list;
          var progress = results.plain().data;
          var curriculum = results.plain().curriculum;

          if (!values.weaknesses[classId]) {
            values.weaknesses[classId] = {};
          }
          if (!values.weaknesses[classId][subjectId]) {
            values.weaknesses[classId][subjectId] = {};
          }

          // only show curriculum p level
          (function filterCurriculum(nodes, categoryId, parentNameEN, parentNameZH) {
            _.remove(nodes, function (node) {
              node.categoryId = categoryId || node.id;
              node.parentNameEN = parentNameEN || node.name_en;
              node.parentNameZH = parentNameZH || node.name_zh;
              if (node.child && node.child.length) {
                filterCurriculum(node.child, categoryId || node.id, node.parentNameEN, node.parentNameZH);
                if (!node.child.length) {
                  return true;
                }
              } else {
                var existsCurriculum = _.some(curriculum, function (c, weakness_id) {
                  if (parseInt(weakness_id) === parseInt(node.id)) {
                    node.assignedLevels = c;
                    return true;
                  }
                });
                if (!existsCurriculum) {
                  return true;
                }
              }
            })
          })(weaknessList, null, null);

          values.weaknesses[classId][subjectId].categories = _.map(weaknessList, function (w) {
            return {
              id: w.id,
              name_en: w.name_en,
              name_zh: w.name_zh,
            }
          });

          values.weaknesses[classId][subjectId].progress = progress;
          values.weaknesses[classId][subjectId].curriculum = weaknessList;
          return values.weaknesses[classId][subjectId];
        })
        .catch(function (err) {
          console.error('Cannot login', err);
          if (!values.weaknesses[classId]) {
            values.weaknesses[classId] = {};
          }
          if (!values.weaknesses[classId][subjectId]) {
            values.weaknesses[classId][subjectId] = {};
          }
          values.weaknesses[classId][subjectId] = { curriculum: [], progress: [], categories: [] };
        })
        .finally((function (result) {
          console.log('result', result);
          return _.cloneDeep(values.weaknesses[classId][subjectId]);
        }));
      // }


    }

    function getWeaknessList(subjectId, level) {
      var params = { "subject_id": subjectId };
      if (_.isUndefined(level)) {
        level = 'all';
      } else {
        params.level = "p" + level;
      }

      if (values.weaknesses[level] && values.weaknesses[level][subjectId]) {
        return $q.when(_.cloneDeep(values.weaknesses[level][subjectId]));
      } else {
        return Restangular.service('weaknessApi/list_all').post({
          params: params,
        }).then(function (result) {
          if (!values.weaknesses[level]) {
            values.weaknesses[level] = {};
          }
          if (!values.weaknesses[level][subjectId]) {
            values.weaknesses[level][subjectId] = {};
          }

          values.weaknesses[level][subjectId] = { data: result.plain().data, children: [], categories: [] };
          (function count(weaknesses, index, categoryId, parentNameEN, parentNameZH) {
            _.each(weaknesses, function (weakness) {
              weakness.categoryId = categoryId || weakness.id;
              weakness.parentNameEN = parentNameEN || weakness.name_en;
              weakness.parentNameZH = parentNameZH || weakness.name_zh;
              if (index === 0) {
                values.weaknesses[level][subjectId].categories.push(weakness);
              }
              if (!weakness.child || !weakness.child.length) {
                values.weaknesses[level][subjectId].children.push(weakness);
              } else {
                count(weakness.child, index + 1, categoryId || weakness.categoryId, weakness.parentNameEN, weakness.parentNameZH);
              }
            });
          })(values.weaknesses[level][subjectId].data, 0, null, '');

          return values.weaknesses[level][subjectId]
        })
          .catch(function () {
            if (!values.weaknesses[level]) {
              values.weaknesses[level] = {};
            }
            if (!values.weaknesses[level][subjectId]) {
              values.weaknesses[level][subjectId] = {};
            }
            values.weaknesses[level][subjectId] = { data: [], children: [], categories: [] };
          }).finally(function (result) {
            console.log('result', result);
            return _.cloneDeep(values.weaknesses[level][subjectId]);
          });
      }
    }

    function getBreadCrumbs(params) {
      var promises = [];
      console.log('breadcrumb');
      values.teacherId = _.parseInt(localStorage.getItem('teacherId'));
      var oldSubjectId = values.subjectId;
      values.subjectId = _.parseInt(params.subjectId);
      var oldClassId = values.classId;
      values.classId = _.parseInt(params.classId);
      values.exerciseId = _.parseInt(params.exerciseId);
      values.exerciseType = params.exerciseType;
      values.userId = _.parseInt(params.userId);
      values.weaknessId = _.parseInt(params.weaknessId);
      values.academicId = _.parseInt(params.academicId);
      values.videoId = _.parseInt(params.videoId);
      values.learningType = params.learningType;
      values.assignStatus = params.assignStatus;
      values.learningId = params.learningId;
      var curriculums = { 'school-based-curriculum': 'school-based curriculum' }
      values.curriculum = curriculums[params.curriculum];

      if (values.learningId) {
        promises.push(Restangular.service('itemApi/get_by_ids').post({params: {ids: [values.learningId]}})
          .then(function (res) {
            values.learningDetail = res.plain().data[0];
            values.learningDetail.theme_chosen = _.trimStart(_.reduce(values.learningDetail.theme, function (result, v) {
              return result + ', ' + v.name_en;
            }, ''), ', ');
          })
          .catch(function (err) {
            console.error('Cannot login', err);
            return err;
          }));
      }

      if (_.isUndefined(values.levels)) {
        promises.push(Restangular.one('levels').get()
          .then(function (res) {
            values.levels = res.plain().data;
          })
          .catch(function (err) {
            console.error('Cannot login', err);
            return err;
          }))
      }

      if (_.isUndefined(values.ehlaLevels)) {
        promises.push(Restangular.service('levelApi/get_level_list').post({
          "params": {
            "username": "hong@gmail.com",
            "password": 123456
          }
        })
          .then(function (res) {
            values.ehlaLevels = res.plain().data;
          })
          .catch(function (err) {
            console.error('Cannot login', err);
            return err;
          }))
      }


      if (_.isUndefined(values.roles)) {
        promises.push(Restangular.one('read_role').get()
          .then(function (res) {
            values.roles = res.plain().data;
          })
          .catch(function (err) {
            console.error('Cannot login', err);
            return err;
          }))
      }


      if (!_.isUndefined(values.teacherId)) {
        promises.push(Restangular.one('classes').one('teachers', values.teacherId).get()
          .then(function (res) {
            values.teacherClasses = res.plain().data;
          })
          .catch(function (err) {
            console.error('Cannot login', err);
            return err;
          }))

      }

      if (_.isUndefined(values.allClasses)) {
        promises.push(Restangular.one('classes').get()
          .then(function (res) {
            values.allClasses = res.plain().data;
          })
          .catch(function (err) {
            console.error('Cannot login', err);
            return err;
          }))
      }


      if (_.isUndefined(values.allSubjects)) {
        promises.push(Restangular.one('subjects').get()
          .then(function (res) {
            values.allSubjects = res.plain().data;
          })
          .catch(function (err) {
            console.error('Cannot login', err);
            return err;
          }))
      }

      if (!_.isNaN(values.subjectId) && oldSubjectId !== values.subjectId) {
        promises.push($q.when().then(function () {
          values.subject = _.find(values.allSubjects, function (s) {
            return s.id === values.subjectId;
          });
        }));
      }

      if (_.isUndefined(values.subjects)) {
        promises.push(Restangular.one('subjects/teachers', values.teacherId).get()
          .then(function (res) {
            values.subjects = res.plain().data;
            values.subject = _.find(values.subjects, function (s) {
              return s.id === values.subjectId;
            });
          })
          .catch(function (err) {
            console.error('Cannot login', err);
            return err;
          }))
      } else {
        promises.push($q.when().then(function () {
          values.subject = _.find(values.subjects, function (s) {
            return s.id === values.subjectId;
          });
        }));
      }

      if (!_.isNaN(values.subjectId) && oldSubjectId !== values.subjectId) {
        promises.push(Restangular.one('classes/teachers', values.teacherId).one('subjects', values.subjectId).get()
          .then(function (res) {
            const result = res.plain().data;
            console.log(result);
            values.classes = result;
            values.class = _.find(values.classes, function (s) {
              return s.id === values.classId;
            });
          })
          .catch(function (err) {
            console.error('Cannot login', err);
          }))
      } else {
        promises.push($q.when().then(function () {
          values.class = _.find(values.classes, function (s) {
            return s.id === values.classId;
          });
        }));
      }

      if (!_.isNaN(values.weaknessId)) {
        promises.push(Restangular.service('weaknessApi/get_by_ids').post({
          params: {
            "id": [values.weaknessId],
          },
        })
          .then(function (results) {
            var wl = results.plain().data;
            console.log(wl);
            if (wl && wl.length) {
              values.weakness = wl[0];
              values.weakness.truncatedName = _.truncate(values.weakness.name, {
                'length': 30,
              });
            }
          })
          .catch(function (err) {
            values.weakness = undefined;
            console.error('Cannot login', err);
          }))
      }


      return $q.all(promises).then(function () {
        return values;
      }).catch(function (err) {
        return err;
      }).finally(function () {
        // isRequesting = false;
      });
    }
  }

})();
