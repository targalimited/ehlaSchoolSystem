import {AuthHttp} from '../../http'
import Vue from 'vue'

const categories = {
  WR: {
    key: 'WR',
    name_en: 'Daily Fun Reading',
    icon: 'daily-reading',
    item_ids: []
  },
  DR: {
    key: 'DR',
    name_en: 'Weekly Fun Reading',
    icon: 'weekly-reading',
    item_ids: []
  },
  RCD: {
    key: 'RCD',
    name_en: 'Reading Comprehensive Diagnosis',
    icon: 'diagnosis-reading',
    item_ids: []
  },
  BR: {
    key: 'BR',
    name_en: 'Daily Fun Reading (Bridging)',
    icon: 'daily-reading',
    item_ids: []
  }
}

export default {
  namespaced: true,

  state: {
    items: {},
    selectedItems: null,
    summary: {}
  },

  mutations: {
    gotSummary (state, summary) {
      state.summary = summary
    },

    gotItemsByCategory (state, {items, category}) {
      Vue.set(state.items, category, items)
    },

    gotSelectedItems (state, selectedItems) {
      state.selectedItems = selectedItems
    },

    removed (state, {id, cat}) {
      if (state.items[cat]) {
        state.items[cat].find(i => i.id === id).chose = false
      }
      if (state.selectedItems) {
        state.selectedItems = state.selectedItems.filter(i => i.id !== id)
      }
    },

    added (state, {id, cat}) {
      state.items[cat].find(i => i.id === id).chose = true
    }
  },

  actions: {
    async add ({commit}, {id, cat}) {
      await new AuthHttp().post('/choose_item', {
        add_item_ids: [id],
        cat_grouper: cat,
        limit: 500,
        page: 1,
        remove_item_ids: []
      })
      commit('added', {id, cat})
      return true
    },

    async remove ({commit}, {id, cat}) {
      await new AuthHttp().post('/choose_item', {
        add_item_ids: [],
        cat_grouper: cat,
        limit: 500,
        page: 1,
        remove_item_ids: [id]
      })
      commit('removed', {id, cat})
      return true
    },

    // TODO api definition and payload
    async assignLevels ({commit, dispatch}) {
      return await new AuthHttp().post('/choose_item_for_level', {
        add_lv_item_list: [],
        cat_grouper,
        limit: 500,
        page: 1,
        remove_lv_item_list: []
      })
    },

    async getDashboard ({dispatch}) {
      await dispatch('getSummary')
      dispatch('getSelectedItems')
    },

    async getSummary ({commit}) {
      const res = await new AuthHttp().get('/get_school_item_summary')
      commit('gotSummary', res)
      return res
    },

    // get the list of selected items
    async getSelectedItems ({commit, getters, dispatch}) {
      const res = await new AuthHttp().post('/get_selected_item', {
        limit: 500,
        page: 1
      })
      let result = res.data

      // post-process the API data
      result.forEach(item => {
        // add `item.levels`
        const lv = []
        for (let i = 1; i <= 6; i++) {
          if (item['p' + i].tick) lv.push('p' + i)
        }
        for (let i = 1; i <= 6; i++) {
          if (item['s' + i].tick) lv.push('s' + i)
        }
        item.levels = lv
      })

      commit('gotSelectedItems', result)
    },

    async getItemsByCategory ({commit}, {key}) {
      const res = await new AuthHttp().post('/get_by_category', {
        cat_grouper: key,
        page: 1,
        limit: 500
      })
      const result = res.data
      commit('gotItemsByCategory', {
        items: result,
        category: key
      })

      return res.metadata
    },

    async getReadingDetails ({commit}, {id}) {
      const res = await new AuthHttp().post('/itemApi/get_by_ids', {
        id: [id],
        details: 1
      })
      return res.data && res.data[0]
    },

    async getPreview ({commit}, {id}) {
      const res = await new AuthHttp().post('/get_preview_by_id', {
        id: id
      })
      return res.data
    }
  },

  getters: {
    categories (state) {
      const cats = state.summary && state.summary.items || {}
      for (let key in cats) {
        categories[key].item_ids = cats[key].item_ids
      }
      return categories
    },

    selectedCount (state, getters) {
      let count = 0
      for (let key in getters.categories) {
        count += getters.categories[key].item_ids.length
      }
      return count
    },

    readings: (state) => (key) => {
      if (!state.items) return
      return state.items[key]
    }
  }
}
