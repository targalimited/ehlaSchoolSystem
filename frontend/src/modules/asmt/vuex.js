import {fakeAsmtList} from './mock-data'

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
      await new Promise(resolve => {
        setTimeout(() => {
          commit('gotAsmtList', fakeAsmtList)
          resolve()
        }, 300)
      })
      return fakeAsmtList
    }
  },

  getters: {

  }
}
