import {http, AuthHttp} from '../../http'
import Vue from 'vue'

export default {

  state: {
    classList: null,
    asmt_list: {},
    asmt_report: {},
    weakness_list: [],
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

    async getAsmtList ({rootGetters, commit}, {class_id}) {
      const res = await new AuthHttp().post('/get_school_assignment', {
        teacher_id: rootGetters.teacherId,
        class_id: class_id,
        subject_id: 1
      })
      let batches = res.data
      batches = batches.filter(batch => batch.items.length > 0)
      batches.forEach(batch => {
        // batch.item = batch.items[0]
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
    }
  },

  getters: {
    // get asmt list by class id
    asmtList: (state) => (class_id) => {
      // TODO: filtering
      return state.asmt_list[class_id]
    },
    asmtReport: (state) => (batch_id) => {
      return state.asmt_report[batch_id]
    },
    weakness_list: (state) => (class_id) => {
      return state.weakness_list[class_id]
    },
  }
}
