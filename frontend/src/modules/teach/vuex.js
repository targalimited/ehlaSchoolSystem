import {batchListSchema} from './schema'
import {http, AuthHttp} from '../../http'
import Vue from 'vue'

export default {

  state: {
    classList: null,
    asmt_list: {},
    asmt_report: {},
    weakness_list: [],
    batchList: {},
    weaknessReport: {}
  },

  mutations: {
    gotClasses (state, classList) {
      state.classList = classList
    },
    gotAsmtList (state, {asmt_list, class_id}) {
      Vue.set(state.asmt_list, class_id, asmt_list)
    },
    gotAsmtReport (state, {batch_id, report}) {
      Vue.set(state.asmt_report, batch_id, report)
    },
    gotWeaknessList (state, {weakness_list, class_id}) {
      Vue.set(state.weakness_list, class_id, weakness_list)
    },
    gotWeaknessReport (state, {batchId, report}) {
      Vue.set(state.weaknessList, batchId, report)
    }
  },

  actions: {
    async getClasses ({commit, rootGetters}) {
      // TODO: @bill this should also return the number of ongoing/completed item, and also weakness
      // so that the tab can display the cont
      const res = await new AuthHttp().post('/get_classes_by_teacher_id', {
        teacher_id: rootGetters.teacherId,
        subject_id: 1
      })
      const classes = res.data
      commit('gotClasses', classes)
      return classes
    },

    async getWeaknessList ({commit}, {class_id}) {
      const res = await new AuthHttp().post('/get_class_weakness', {
        academic_id: 1, // TODO hardcode
        class_id: class_id,
        subject_id: 1,
        weakness_code: "MATCH", // TODO need to filter?
      })
      const weakness_list = res.data
      commit('gotWeaknessList', {
        class_id, weakness_list
      })
      return weakness_list
    },

    async getClassWeaknessReport ({}, {class_id, weakness_ids}) {
      const res = await new AuthHttp().post('/get_school_weakness_report', {
        subject_id: 1,
        academic_id: 1,
        class_id: class_id,
        weakness_code: 'MATCH',
        weakness_ids: weakness_ids
      })
      const weakness_report = res.data
      return weakness_report
    },

    /**
     * get the list of assignment from a class
     */
    async getAsmtList ({rootGetters, commit}, {class_id}) {
      const res = await new AuthHttp().post('/get_school_assignment', {
        teacher_id: rootGetters.teacherId,
        class_id: class_id,
        subject_id: 1
      })
      let batches = res.data
      batches = batches.filter(batch => batch.items.length > 0)
      batches.forEach(batch => {
        for (const prop in batch.items[0]) {
          batch[prop] = batch.items[0][prop]
        }
        delete batch.items
      })
      commit('gotAsmtList', {
        asmt_list: batches,
        class_id: class_id
      })
      return batches
    },

    /**
     * get the status (whether is done or not) of an assignment assigned to a class
     */
    async getAsmtReport ({commit}, {class_id, batch_id, item_id}) {
      const res = await new AuthHttp().post('/get_status_report', {
        class_id: class_id,
        subject_id: 1,
        batch_id: batch_id,
        item_id: item_id
      })
      const report = res.data
      commit('gotAsmtReport', {
        report, batch_id
      })
      return report
    },

    async getItemListByClassCat ({commit}, {class_id, cat_id}) {
      const res = await new AuthHttp().post('/get_item_list_by_cls_sub_cat', {
        class_id: class_id,
        subject_id: 1,
        cat_grouper: cat_id
      })
      return res.data
    },

    async setAssignment ({commit, rootState, dispatch}, {classId, itemId, batchId, itemType, startDate, endDate, remark, exercises, videos}) {
      const teacherId = rootState.auth.user.user_id
      const exercise_assignments = exercises.map(e => {
        return {
          exercise_id: e
        }
      })
      const video_assignments = videos.map(v => {
        return {
          exercise_id: v
        }
      })
      const item = {
        item_id: itemId,
        item_type: itemType,
        exercise_assignments: exercise_assignments,
        videos_assignments: video_assignments
      }
      const payload = {
        teacher_id: teacherId,
        class_id: classId,
        subject_id: 1,
        batch_id: batchId,
        start_date: startDate + ' 00:00:00',
        end_date: endDate + ' 23:59:59',
        remark: remark,
        is_published: 1, // TODO: is this needed?
        is_deleted: 0, // TODO: is this needed?
        items: [item]
      }
      await new AuthHttp().post('/set_school_assignment', payload)
      dispatch('getAsmtList',  {
        class_id: classId
      })
    },

    async lockAsmt ({dispatch}, {batchId, classId}) {
      await new AuthHttp().post('lock_school_assignment', {
        batch_id: batchId
      })
      dispatch('getAsmtList',  {
        class_id: classId
      })
      return 'done'
    },

    /**
     * get the details of an item, which includes exercises and videos of an item
     */
    async getItemById ({commit}, {classId, itemId}) {
      const res = await new AuthHttp().post('/get_item_by_id', {
        class_id: classId,
        subject_id: 1,
        item_id: itemId
      })
      return res.data
    },
  },

  getters: {
    // get asmt list by class id
    asmtList: (state) => (class_id) => {
      // TODO: filtering
      return state.asmt_list[class_id] || []
    },
    lockedAsmtList: (state, getters) => (classId) => {
      return getters.asmtList(classId).filter(item => !!parseInt(item.is_locked))
    },
    activeAsmtList: (state, getters) => (classId) => {
      return getters.asmtList(classId).filter(item => !parseInt(item.is_locked))
    },
    asmtReport: (state) => (batch_id) => {
      return state.asmt_report[batch_id]
    },
    weakness_list: (state) => (class_id) => {
      return state.weakness_list[class_id]
    },
  }
}
