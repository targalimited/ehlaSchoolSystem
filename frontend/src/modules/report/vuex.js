import {http, AuthHttp} from '../../http'
import Vue from 'vue'

export default {

  state: {
    classList: null,
    asmtList: null,
    asmtReport: {},
    weaknessList: [],
    weaknessReport: {}
  },

  mutations: {
    gotClasses (state, classList) {
      state.classList = classList
    },
    gotAsmtList (state, asmtList) {
      state.asmtList = asmtList
    },
    gotAsmtReport (state, {batchId, report}) {
      console.log('sss',batchId, report)
      Vue.set(state.asmtReport, batchId, report)
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

    // TODO: @bill got 500
    async getClassWeaknessList ({}, {classId}) {
      return await new AuthHttp().post('/get_class_weakness', {
        academic_id: 1, // TODO @bill - what is this
        class_id: classId,
        subject_id: 1,
        weakness_code: "MATCH", // TODO @bill - what is this
      })
    },

    async getClassItemList ({rootGetters, commit}, {classId}) {
      const res = await new AuthHttp().post('/get_school_assignment', {
        teacher_id: rootGetters.teacherId,
        class_id: classId,
        subject_id: 1
      })
      let batches = res.data
      batches = batches.filter(batch => batch.items.length > 0)
      batches.forEach(batch => {
        batch.item = batch.items[0]
        delete batch.items
      })
      commit('gotAsmtList', batches)
      return batches
    },

    async getClassWeaknessReport ({}, {batchId, classId, weaknessCode, weaknessIds}) {
      // TODO hardcoded
      batchId = 36
      classId = 1
      weaknessCode = 'Match'
      weaknessIds = [1082, 1091]
      return await new AuthHttp().post('/get_school_weakness_report', {
        subject_id: 1,
        academic_id: 1,
        class_id: classId,
        weakness_code: weaknessCode,
        weakness_ids: weaknessIds
      })
    },

    async getAsmtReport ({commit}, {classId, batchId, itemId}) {
      const res = await new AuthHttp().post('/get_status_report', {
        class_id: classId,
        subject_id: 1,
        batch_id: batchId,
        item_id: itemId
      })
      const report = res.data
      console.log(report, 'hi')
      commit('gotAsmtReport', {
        report, batchId
      })
      return report
    }
  },

  getters: {
    currentAsmtList (state) {
      // TODO: filtering
      if (!state.asmtList) return null
      return state.asmtList
    }
  }
}
