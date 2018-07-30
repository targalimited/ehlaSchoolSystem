import {http, AuthHttp} from '../../http'

export default {
  namespaced: 'true',

  state: {

  },

  mutations: {

  },

  actions: {
    async getClasses ({rootGetters}) {
      // TODO: @bill this should also return the number of ongoing/completed item, and also weakness
      // so that the tab can display the cont
      const res =  await new AuthHttp().post('/get_classes_by_teacher_id', {
        teacher_id: rootGetters.teacherId,
        subject_id: 1
      })
      return res.data
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

    // TODO: @bill this does not return the batch ID for is needed for calling getClassItemReport
    async getClassItemList ({}, {classId}) {
      const res = await new AuthHttp().post('/get_item_list_by_cls_sub_cat/', {
        class_id: classId,
        subject_id: 1,
        cat_grouper: 'WR' // TODO why need this?
      })
      return res
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

    // TODO @bill 500
    async getClassItemReport ({}, {classId, batchId, itemId}) {
      classId = 1
      // batchId = 1
      itemId = 15635
      const res = await new AuthHttp().post('/get_status_report', {
        class_id: classId,
        subject_id: 1,
        batch_id: batchId,
        item_id: itemId
      })
      return res
    }
  },

  getters: {

  }
}
