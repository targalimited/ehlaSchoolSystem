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
    cats: {
      WR: {},
      DR: {},
      RCD: {},
      BR: {},
    },
    selectedItems: null,
    summary: {}
  },

  mutations: {
    gotSummary (state, summary) {
      state.summary = summary
    },

    gotItemsByCategory (state, {items, category, selected, max}) {
      Vue.set(state.items, category, items)
      Vue.set(state.cats[category], 'selected', selected)
      Vue.set(state.cats[category], 'max', max)
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
      state.cats[cat].selected --
    },

    added (state, {id, cat}) {
      state.cats[cat].selected ++
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

    async assignLevels ({commit, dispatch}, {id, levels}) {
      await new AuthHttp().post('/choose_item_for_level', {
        item_id: id,
        item_lv: levels
      })
      await dispatch('getSelectedItems')
      return true
      
    },

    async getDashboard ({dispatch}) {
      dispatch('getSummary')
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

    async getItemsByCategory ({commit}, {cat}) {
      const res = await new AuthHttp().post('/get_by_category', {
        cat_grouper: cat,
        page: 1,
        limit: 500
      })
      const result = res.data
      commit('gotItemsByCategory', {
        items: result,
        category: cat,
        selected: res.metadata.catChosen,
        max: res.metadata.catMax,
      })

      return res.metadata
    },

    async getPreview ({commit}, {id}) {
      const res = await new AuthHttp().post('/get_preview_by_id', {
        id: id
      })
      return res.data
    }
  },

  getters: {
    /**
     * get the 4 category basic info and the num of selected item inside the category
     */
    categories (state) {
      const cats = state.summary && state.summary.items || {}
      for (let key in cats) {
        categories[key].item_ids = cats[key].item_ids
      }
      return categories
    },

    levelOptions (state) {
      if (!state.summary) return
      return state.summary.valid_levels || []
    },

    /**
     * get the list of available levels and the i.e. 12/20 (selected/max quota) selection
     */
    levelsQuota (state, getters) {
      if (!getters.levelOptions || !state.selectedItems) return
      return getters.levelOptions.map(lv => {
        let selected = 0
        state.selectedItems.forEach(item => {
          if (item.levels.includes(lv)) {
            selected++
          }
        })
        return {
          level: lv,
          maxQuota: state.summary.level_item_qtt,
          selected: selected,
          full: selected >= state.summary.level_item_qtt
        }
      })
    },

    selectedCount (state, getters) {
      let count = 0
      for (let key in getters.categories) {
        count += getters.categories[key].item_ids.length
      }
      return count
    },

    /**
     * get the list of reading items per category
     * called in listing page (lib-view.vue)
     */
    readings: (state) => (key) => {
      if (!state.items) return
      return state.items[key]
    }
  }
}
