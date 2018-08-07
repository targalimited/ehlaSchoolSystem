import {AuthHttp} from '../../http'
import Vue from 'vue'

const catList = ['WR', 'DR', 'RCD', 'BR']

const defaultCategories = {
  DR: {
    key: 'DR',
    name_en: 'Daily Fun Reading',
    icon: 'daily-reading',
    selectedCount: 0,
    max: 0,
    lvMax: 0,
    image: {
      primary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/primary-daily+reading.jpg',
      secondary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/secondary-a-1529141847982.jpg'
    }
  },
  WR: {
    key: 'WR',
    name_en: 'Weekly Fun Reading',
    icon: 'weekly-reading',
    selectedCount: 0,
    max: 0,
    lvMax: 0,
    image: {
      primary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/primary-weekly+reading.jpg',
      secondary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/secondary-b-1529141848718.jpg'
    }
  },
  RCD: {
    key: 'RCD',
    name_en: 'Reading Comprehension Diagnosis',
    icon: 'diagnosis-reading',
    selectedCount: 0,
    max: 0,
    lvMax: 0,
    image: {
      primary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/Reading+Comprehensive+Diagnosis-primary.jpg',
      secondary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/secondary-c-1529141849068.jpg'
    }
  },
  BR: {
    key: 'BR',
    name_en: 'Daily Fun Reading (Bridging)',
    icon: 'daily-reading',
    selectedCount: 0,
    max: 0,
    maxLv: 0,
    image: {
      primary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/bridging.jpg',
      secondary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/secordary-bridging.jpg'
    }
  }
}

export default {
  namespaced: true,

  state: {
    items: {},
    cats: defaultCategories,
    selectedItems: null,
    summary: {},
    levels_translate: {},
    levelOptions: [],
    difficultyOptions: [],
    texttypeOptions: [],
    themeOptions: [],
    subthemeOptions: [],
    weaknessOptions: [],
    levelFilter: [],
    difficultyFilter: [],
    texttypeFilter: [],
    themeFilter: [],
    subthemeFilter: [],
    weaknessFilter: []
  },

  mutations: {
    changeLevelFilter (state, filters) {
      state.levelFilter = filters
    },
    changeDifficultyFilter (state, filters) {
      state.difficultyFilter = filters
    },
    changeTexttypeFilter (state, filters) {
      state.texttypeFilter = filters
    },
    changeThemeFilter (state, filters) {
      state.themeFilter = filters
    },
    changeSubthemeFilter (state, filters) {
      state.subthemeFilter = filters
    },
    changeWeaknessFilter (state, filters) {
      state.weaknessFilter = filters
    },
    reset (state) {
      state.summary = {}
      state.items = {}
      // otherwise when logout the data will not be cleared
      catList.forEach(cat => {
        state.cats[cat].selectedCount = 0
        state.cats[cat].max = 0
        state.cats[cat].maxLv = 0
      })
      Vue.set(state, 'cats', defaultCategories)
      state.selectedItems = null
      state.summary = {}
    },

    gotSummary (state, summary) {
      state.summary = summary
      catList.forEach(CAT => {
        const cat = CAT.toLowerCase()
        let max = summary[`${cat}_max`]
        if (max) state.cats[CAT].max = max

        let maxLv = summary[`${cat}_lv_max`]
        if (maxLv) state.cats[CAT].maxLv = maxLv

        let items = summary.items[CAT]
        if (items) {
          state.cats[CAT].selectedCount = items.item_ids.length
        }
      })
    },

    gotItemsByCategory (state, {items, category, selected, max, searchTags}) {
      Vue.set(state.items, category, items)
      state.cats[category].max = max
      state.cats[category].selectedCount = selected

      const level = searchTags.find(item => item.key === 'level')
      const difficulty = searchTags.find(item => item.key === 'difficulty')
      const texttype = searchTags.find(item => item.key === 'texttype')
      const theme = searchTags.find(item => item.key === 'theme')
      const subtheme = searchTags.find(item => item.key === 'subtheme')
      const weakness = searchTags.find(item => item.key === 'weakness')

      state.levelOptions = level && level.values
      state.difficultyOptions = difficulty && difficulty.values
      state.texttypeOptions = texttype && texttype.values
      state.themeOptions = theme && theme.values
      state.subthemeOptions = subtheme && subtheme.values
      state.weaknessOptions = weakness && weakness.values
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
      state.cats[cat].selectedCount --
    },

    added (state, {id, cat}) {
      state.cats[cat].selectedCount ++
      state.items[cat].find(i => i.id === id).chose = true
    }
  },

  actions: {
    async add ({commit, getters, dispatch}, {id, cat}) {
      if (getters.isFull) return

      try {
        await new AuthHttp().post('/choose_item', {
          add_item_ids: [id],
          cat_grouper: cat,
          limit: 500,
          page: 1,
          remove_item_ids: []
        })
        dispatch('getSummary')
        commit('added', {id, cat})
        return true
      } catch (e) {}
    },

    async remove ({commit, dispatch}, {id, cat, withLevels}) {
      if (withLevels) {
        console.log('need to rm lebels first')
        await dispatch('assignLevels', {
          id: id,
          levels: []
        })
      }
      try {
        await new AuthHttp().post('/choose_item', {
          add_item_ids: [],
          cat_grouper: cat,
          limit: 500,
          page: 1,
          remove_item_ids: [id]
        })
        dispatch('getSummary')
        commit('removed', {id, cat})
        return true
      } catch (e) {}
    },

    async assignLevels ({commit, dispatch}, {id, levels}) {
      try {
        await new AuthHttp().post('/choose_item_for_level', {
          item_id: id,
          item_lv: levels
        })
        await dispatch('getSelectedItems')
        return true
      } catch (e) {}
    },

    async getDashboard ({dispatch}) {
      dispatch('getSummary')
      dispatch('getSelectedItems')
    },

    async getSummary ({commit}) {
      try {
        const res = await new AuthHttp().get('/get_school_item_summary')
        commit('gotSummary', res)
        return res
      } catch (e) {}
    },

    // get the list of selected items
    async getSelectedItems ({commit, getters, dispatch}) {
      try {
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
      } catch (e) {}
    },

    async getItemsByCategory ({commit}, {cat}) {
      try {
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
          searchTags: res.metadata.searchTag
        })
        return res.metadata
      } catch (e) {}
    },

    async getPreview ({commit}, {id}) {
      try {
        const res = await new AuthHttp().post('/get_preview_by_id', {
          id: id
        })
        return res.data
      } catch (e) {}
    }
  },

  getters: {
    /**
     * get the 4 category basic info and the num of selected item inside the category
     */
    categories (state) {
      return state.cats
    },

    levelOptions (state) {
      if (!state.summary) return
      return state.summary.valid_levels || []
    },

    /**
     * get the list of available levels and the i.e. 12/20 (selected/max quota) selection
     */
    levelsQuota: (state, getters) => (cat) => {
      if (!getters.levelOptions || !state.selectedItems) return
      return getters.levelOptions.map(lv => {
        let selected = 0
        let selectedItemInCat = 0
        state.selectedItems.forEach(item => {
          if (item.levels.includes(lv)) {
            selected++
          }
          if (cat && item.levels.includes(lv) && item.cat_grouper === cat) {
            selectedItemInCat++
          }
        })
        const obj = {
          level: lv,
          maxQuota: state.summary.level_item_qtt,
          maxCatQuota: state.summary.level_item_qtt,
          selected: selected,
          full: selected >= state.summary.level_item_qtt
        }
        if (cat) {
          obj.maxCatQuota = state.cats[cat].maxLv
          obj.catFull = selectedItemInCat >= state.cats[cat].maxLv
        }
        return obj
      })
    },

    /**
     * get the total nuber of selected reading
     */
    selectedCount (state, getters) {
      let count = 0
      for (let key in getters.categories) {
        count += getters.categories[key].selectedCount
      }
      return count
    },

    /**
     * get the max of readings that the school can select
     */
    maxSelection (state) {
      if (!state.summary) return
      return state.summary.total_item_qtt
    },

    /**
     * is the selection reach the maxium - could not add anymore reading
     * used in library page when calling add
     */
    isFull (state, getters) {
      if (!getters.selectedCount || !getters.maxSelection) return
      return getters.selectedCount >= getters.maxSelection
    },

    /**
     * get the list of reading items per category
     * called in listing page (lib-view.vue)
     */
    readings: (state) => (key) => {
      if (!state.items) return
      return state.items[key]
    },

    /**
     * determine to show which photos
     */
    primarySecondary (state) {
      return state.summary.edu_lv === 's' ? 'secondary' : 'primary'
    },

    levelsTranslate (state) {
      return state.summary.levels_translate
    },

    isPilot (state) {
      return state.summary.is_pilot
    },

    unassignedItems (state) {
      if (!state.selectedItems) return
      return state.selectedItems.filter(item => item.levels.length === 0)
    },

    assignedItems (state) {
      if (!state.selectedItems) return
      return state.selectedItems.filter(item => item.levels.length > 0)
    }
  }
}
