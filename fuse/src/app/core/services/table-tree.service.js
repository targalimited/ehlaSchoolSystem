(function ()
{
  'use strict';

  angular
    .module('app.core')
    .factory('tableTree', tableTree);

  /** @ngInject */
  function tableTree()
  {
    var service = {
      toggleCheck: toggleCheck,
      isAllChecked: isAllChecked,
      toggleCheckAll: toggleCheckAll,
      isAllExpanded: isAllExpanded,
      toggleExpand: toggleExpand,
      toggleExpandAll: toggleExpandAll,
      propagateCheckFromParent: propagateCheckFromParent,
      verifyAllParentsCheckStatus: verifyAllParentsCheckStatus,
      applyFilter: applyFilter,
    };

    return service;


    function isAllChecked(vm) {
      return function () {
        var checked = 0;
        var partial = 0;
        var total = vm.data ? vm.data.length : 0;
        _.each(vm.data, function (node) {
          if(node.checkStatus !== 'unchecked') {
            partial++;
            if (node.checkStatus === 'checked') {
              checked++;
            }
          }
        });
        if (checked === total) {
          return 2;
        } else if (partial > 0) {
          return 1;
        }
        return 0;
      }
    }

    function toggleCheckAll(vm) {
      return function () {
        var checkStatus = isAllChecked(vm)() !== 2 ? 'checked' : 'unchecked';
        (function toggle(nodes) {
          _.each(nodes, function (node) {
            node.checkStatus = checkStatus;
            if (node.child.length) {
              toggle(node.child);
            }
          });
        })(vm.data);
      }
    }

    function isAllExpanded(vm, expandList) {
      return function () {
        var expanded = 0;
        var totalExpandable = 0;
        (function checked(nodes) {
          _.each(nodes, function (node) {
            if (node.child.length) {
              if (expandList[node.id]) {
                expanded++;
              }
              totalExpandable++;
              checked(node.child);
            }
          });
        })(vm.data);

        // console.log('expanded', expanded, totalExpandable)

        return expanded === totalExpandable ? 2 : (expanded > 0 ? 1 : 0);
      };
    }

    function toggleExpand(vm, expanded) {
      return function expand(node, isExpand) {
        expanded[node.id] = _.isUndefined(isExpand) ? !expanded[node.id] : isExpand;
        if (node.child && node.child.length) {
          _.each(node.child, function (child) {
            expand(child, expanded[node.id]);
          });
        }
      }
    }

    function toggleExpandAll(vm, expandList) {
      return function () {
        var isExpandAll = isAllExpanded(vm, expandList)() !== 2;
        // console.log('isExpandAll', isExpandAll);
        (function toggle(nodes) {
          _.each(nodes, function (node) {
            expandList[node.id] = isExpandAll;
            if (node.child.length) {
              toggle(node.child);
            }
          });
        })(vm.data);
      }
    }

    function toggleCheck(vm) {
      return function (node) {
        if (_.isUndefined(node.checkStatus)) {
          node.checkStatus = 'unchecked';
        }

        if (node.checkStatus === "checked") {
          node.checkStatus = "unchecked";
        } else {
          node.checkStatus = "checked";
        }
        if (node.child) {
          (propagateCheckFromParent(vm))(node.child, node.checkStatus);
        }

        (verifyAllParentsCheckStatus(vm))(node);
      }
    }

    //when a "folder" is click/unclicked, all it's children are click/unclicked
    function propagateCheckFromParent(vm) {
      return function (nodes, status) {
        for (var i = 0; i < nodes.length; ++i) {
          var node = nodes[i];
          node.checkStatus = status;
          if (node.child)
            (propagateCheckFromParent(vm))(node.child, status)
        }
      };
    }

    //starting from the root node, check all folders recursively to see
    //if their children are all click, all unclicked or mixed
    function verifyAllParentsCheckStatus(vm) {
      return function (node) {
        var parent = node;
        do {
          parent = parent.parentNode;
          var partlyCheckedCount = 0;
          var checkedCount = 0;
          _.each(parent.child, function (child) {
            if (child.checkStatus === 'partlyChecked') {
              partlyCheckedCount++;
            }
            if (child.checkStatus === 'checked') {
              partlyCheckedCount++;
              checkedCount++;
            }
          });
          if (checkedCount === parent.child.length) {
            parent.checkStatus = 'checked';
          } else if (partlyCheckedCount > 0) {
            parent.checkStatus = 'partlyChecked';
          } else {
            parent.checkStatus = 'unchecked';
          }
        } while (parent);
      }
    }

    function applyFilter(vm) {
      return function () {
        (function filter(nodes, parent) {
          var isAnyVisible = false;
          _.each(nodes, function (node) {
            node.parentNode = parent;
            var text = _.trim(vm.topicsSearch);
            var isSearchTextMatch = text === '' || new RegExp(text, 'gi').test(node.name_en) || new RegExp(text, 'gi').test(node.name_zh);
            var catIds = vm.selectedCategories || [-1];
            catIds = _.map(catIds, function (v) {
              return _.parseInt(v);
            })
            var subjectIds = vm.selectedSubjects || [-1];
            subjectIds = _.map(subjectIds, function (v) {
              return _.parseInt(v);
            })

            var isCategoryIdMatch = _.indexOf(catIds, _.parseInt(node.categoryId)) !== -1 || _.indexOf(catIds, -1) !== -1;
            var isSubjectIdMatch = _.indexOf(subjectIds, _.parseInt(node.subjectId)) !== -1 || _.indexOf(subjectIds, -1) !== -1;
            var status = vm.statusFilter || 'all';
            var isStatusMatch = false;
            node.checkStatus = _.isUndefined(node.checkStatus) ? 'unchecked' : node.checkStatus;
            if ((status === 'checked' && (node.checkStatus === 'checked' || node.checkStatus === 'partlyChecked')) ||
              (status === 'unchecked' && node.checkStatus === 'unchecked') || status === 'all') {
              isStatusMatch = true;
            }

            // uncomment || (parent && parent._visible_) if you dont want parent visible and then child visible too
            node._visible_ = (isSearchTextMatch && isCategoryIdMatch && isSubjectIdMatch && isStatusMatch); // || (parent && parent._visible_);
            if (node.child && node.child.length) {
              var childVisibility = filter(node.child, node);
              node._visible_ = node._visible_ || childVisibility;
            }
            if (node._visible_) {
              isAnyVisible = true;
            }
          });
          return isAnyVisible;
        })(vm.data);
      }
    };
  }

})();
