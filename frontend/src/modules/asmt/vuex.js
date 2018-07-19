import {fakeAsmtList} from './mock-data'
import {http, AuthHttp} from '../../http'

export default {
  namespaced: true,

  state: {
    asmtList: null
  },

  mutations: {
    gotAsmtList (state, list) {
      state.asmtList = list
    }
  },

  actions: {
    // TODO: dicuss with @Bill whether to have seperate API for draft/ history
    async getAsmtList ({commit}) {
      const res = await new AuthHttp().post('/get_school_assignment')
      console.log(res.data)
      commit('gotAsmtList', res.data)
      return fakeAsmtList
    },

    /**
     * Called in the first step of assign homework
     * Get the list of class available and their respective categories
     */
    async getClassCat ({commit}) {
      return new AuthHttp().post('/get_cls_cat', {
        subject_id: '1'
      })
    },

    /**
     * Called upon the class and category are selected during assign homework
     * get the list of items available based on the selected class and category
     */
    async getItemListByClassCat ({commit}, {classId, catId}) {
      return new AuthHttp().post('/get_item_list_by_cls_sub_cat', {
        class_id: classId,
        subject_id: 1, // TODO: hardcoded the subject ID right now
        cat_grouper: catId
      })
    },

    async getItemById ({commit}, {classId, itemId}) {
      return new AuthHttp().post('/get_item_by_id', {
        class_id: classId,
        subject_id: 1,
        item_id: itemId
      })
    },

    async setAssignment ({commit, rootState}, {classId, itemId, itemType, startDate, endDate, remark, exercises, videos}) {
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
        start_date: startDate + ' 00:00:00',
        end_date: endDate + ' 23:59:59',
        remark: remark,
        is_published: 1, // TODO: is this needed?
        is_deleted: 0, // TODO: is this needed?
        items: [item]
      }
      return new AuthHttp().post('/set_school_assignment', payload)
    }
  },

  getters: {

  }
}
