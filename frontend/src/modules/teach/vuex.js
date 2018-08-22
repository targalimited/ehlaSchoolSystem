import {batchListSchema, itemListSchema} from './schema'
import { normalize, denormalize } from 'normalizr'
import {AuthHttp} from '../../http'
import Vue from 'vue'

// TODO: move this to somewhere to share across module
const catList = [
  {
    key: 'DR',
    name_en: 'Daily Fun Reading'
  },
  {
    key: 'WR',
    name_en: 'Weekly Fun Reading',
  },
  {
    key: 'RCD',
    name_en: 'Reading Comprehension Diagnosis',
  },
  {
    key: 'BR',
    name_en: 'Daily Fun Reading (Bridging)'
  }
]

export default {
  state: {
    classList: null,
    asmt_list: {},
    weakness_list: [],
    batchList: {}, // the assignment list of the class
    itemList: {}, // the assignable items for the class
    catList: catList,
    selectedWeakness: null,
    selectedWeaknessCode: 'ALL',
    students: {}
  },

  mutations: {
    gotClasses (state, classList) {
      state.classList = classList
    },
    gotBatchList (state, {asmtList, classId}) {
      Vue.set(state.asmt_list, classId, asmtList)
    },
    gotItemList (state, {itemList, classId, catId}) {
      const id = classId + catId
      Vue.set(state.itemList, id, itemList)
    },
    gotWeaknessList (state, {weakness_list, classId}) {
      Vue.set(state.weakness_list, classId, weakness_list)
    },
    updateSelectedWeakness (state, weakness) {
      state.selectedWeakness = weakness
    },
    updateSelectedWeaknessCode (state, weaknessCode) {
      state.selectedWeaknessCode = weaknessCode
    },
    gotStudentsByClass (state, {students, classId}) {
      Vue.set(state.students, [classId], students)
    }
  },

  actions: {
    async getClasses ({commit, rootGetters}) {
      const res = await new AuthHttp().post('/get_classes_by_teacher_id', {
        teacher_id: rootGetters.teacherId,
        subject_id: 1
      })
      const classes = res.data
      commit('gotClasses', classes)
      return classes
    },

    async getWeaknessList ({commit}, {classId, weaknessCode}) {
      const res = await new AuthHttp().post('/get_class_weakness', {
        academic_id: 1,
        class_id: classId,
        subject_id: 1,
        weakness_code: weaknessCode
      })
      const weakness_list = res.data
      commit('gotWeaknessList', {
        classId, weakness_list
      })
      return weakness_list
    },

    async getClassWeaknessReport ({}, {classId, weakness_ids, weaknessCode}) {
      const res = await new AuthHttp().post('/get_school_weakness_report', {
        subject_id: 1,
        academic_id: 1,
        class_id: classId,
        weakness_code: weaknessCode,
        weakness_ids: weakness_ids
      })
      const weakness_report = res.data
      return weakness_report
    },

    /**
     * get the list of assignment for a class
     */
    async getAsmtList ({rootGetters, commit}, {classId}) {
      const res = await new AuthHttp().post('/get_school_assignment', {
        teacher_id: rootGetters.teacherId,
        class_id: classId,
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
      const {entities, result} = normalize(batches, batchListSchema)
      commit('updateEntities', entities)
      commit('gotBatchList', {
        asmtList: result,
        classId: classId
      })
      return batches
    },

    /**
     * get the status (whether is done or not) of an assignment assigned to a class
     */
    async getAsmtReport ({commit}, {classId, batchId, itemId}) {
      const res = await new AuthHttp().post('/get_status_report', {
        class_id: classId,
        subject_id: 1,
        batch_id: batchId,
        item_id: itemId
      })
      const report = res.data
      const entity = {
        batch: {
          [batchId]: {
            report: report
          }
        }
      }
      commit('updateEntities', entity)
      return report
    },

    async getItemListByClassCat ({commit}, {classId, catId}) {
      const res = await new AuthHttp().post('/get_item_list_by_cls_sub_cat', {
        class_id: classId,
        subject_id: 1,
        cat_grouper: catId
      })
      const itemList = res.data
      const {entities, result} = normalize(itemList, itemListSchema)
      commit('updateEntities', entities)
      commit('gotItemList', {
        itemList: result,
        classId: classId,
        catId: catId
      })
      return itemList
    },

    async setAssignment ({commit, rootState, dispatch}, {classId, itemId, batchId, itemType, startDate, endDate, remark, exercises, videos}) {
      const teacherId = rootState.auth.user.user_id
      const item = {
        item_id: itemId,
        item_type: itemType,
        exercise_assignments: exercises,
        video_assignments: videos
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
        classId: classId
      })
    },

    async confirmItem ({commit}, {itemId, classId}) {
      await new AuthHttp().post('/confirm_item', {
        item_id: itemId,
        class_id: classId
      })
      return true
    },

    async lockAsmt ({dispatch}, {batchId, classId}) {
      await new AuthHttp().post('lock_school_assignment', {
        batch_id: batchId
      })
      dispatch('getAsmtList',  {
        classId: classId
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
      const entity = {
        item: {
          [itemId]: {
            videos: res.data.videos,
            exercises: res.data.exercises
          }
        }
      }
      commit('updateEntities', entity, {root: true})
      return res.data
    },

    async getStudentsByClass ({commit}, {classId}) {
      const res = await new AuthHttp().post('/get_students_by_class_id', {
        class_id: classId,
        subject_id: 1
      })
      const students = res.data
      commit('gotStudentsByClass', {
        students, classId
      })
      return students
    }
  },

  getters: {
    // get asmt list by class id
    getBatchListByClass: (state, getters, rootState) => (classId) => {
      const batchIdList = state.asmt_list[classId]
      return denormalize(batchIdList, batchListSchema, {
        batch: rootState.entities.batch
      }) || []
    },
    getBatchById: (state, getters, rootState) => (batchId) => {
      return rootState.entities.batch[batchId]
    },
    getItemListByClassCat: (state, getters, rootState) => (classId, catId) => {
      const id = classId + catId
      const itemIdList = state.itemList[id]
      return denormalize(itemIdList, itemListSchema, {
        item: rootState.entities.item
      })
    },
    getItemById: (state, getters, rootState) => (itemId) => {
      return rootState.entities.item[itemId]
    },
    lockedBatchList: (state, getters) => (classId) => {
      return getters.getBatchListByClass(classId).filter(item => !!parseInt(item.is_locked))
    },
    activeBatchList: (state, getters) => (classId) => {
      return getters.getBatchListByClass(classId).filter(item => !parseInt(item.is_locked))
    },
    asmtReport: (state, getters, rootState) => (batch_id) => {
      return rootState.entities.batch[batch_id]
    },
    weakness_list: (state) => (classId) => {
      return state.weakness_list[classId]
    },
    getClassNameById: (state) => (classId) => {
      if (!state.classList) return
      const classObj = state.classList.find(c => c.class_id === classId)
      return classObj && classObj.c_name
    },
    getCatNameById: (state) => (catId) => {
      if (!state.catList) return
      const catObj = state.catList.find(c => c.key === catId)
      return catObj && catObj.name_en
    },
    defaultClassId (state) {
      if (!state.classList) return
      if (state.classList.length === 0) return -1
      else return state.classList[0].class_id
    },
    getStudentsByClass: state => classId => state.students[classId]
  }
}
