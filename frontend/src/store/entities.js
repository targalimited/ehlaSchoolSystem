import Vue from 'vue'

const vuex = {
  state: {
    batch: {},
    item: {}
  },
  mutations: {
    updateEntities (state, entities) {
      for (let type in entities) {
        for (let entity in entities[type]) {
          const oldObj = state[type][entity] || {}
          const newObj = Object.assign({}, oldObj, entities[type][entity])
          Vue.set(state[type], entity, newObj)
        }
      }
    }
  },
  getters: {
    batch: (state, getters) => batchId => {
      return state.batch[batchId]
    }
  }
}

export default vuex
