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
    async getAsmtList ({commit, rootState}) {
      const res = await new AuthHttp().post('/get_school_assignment', {
        teacher_id: rootState.auth.user.user_id
      })
      let batches = res.data
      batches = batches.filter(batch => batch.items.length > 0)
      batches.forEach(batch => {
        batch.item = batch.items[0]
        delete batch.items
      })
      commit('gotAsmtList', batches)
      return res.data
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
    }
  },

  getters: {

  }
}
