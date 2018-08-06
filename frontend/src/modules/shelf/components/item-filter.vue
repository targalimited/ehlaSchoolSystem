<template>
  <div class="search-panel">

    <vi-row class="search-row" justify-center>
      <vi-button @click="menu = false" size="200" primary>Search</vi-button>
    </vi-row>

    <div v-if="levelOptions">
      <vi-input-label>Filter by levels</vi-input-label>
      <div class="options-container">
        <vi-checkbox
          :inlineFlex="true"
          v-for="opt in levelOptions"
          :key="opt.value"
          v-model="levelList"
          :option-value="opt"
          :label="opt.value_name_en"
        />
      </div>
    </div>

    <div v-if="difficultyOptions">
      <vi-input-label>Filter by difficulties</vi-input-label>
      <div class="options-container">
        <vi-checkbox
          :inlineFlex="true"
          v-for="opt in difficultyOptions"
          :key="opt.value"
          v-model="difficultyList"
          :option-value="opt"
          :label="opt.value_name_en"
        />
      </div>
    </div>

    <div v-if="texttypeOptions">
      <vi-input-label>Filter by text types</vi-input-label>
      <div class="options-container">
        <vi-checkbox
          :inlineFlex="true"
          v-for="opt in texttypeOptions"
          :key="opt.value"
          v-model="texttypeList"
          :option-value="opt"
          :label="opt.value_name_en"
        />
      </div>
    </div>

    <div v-if="themeOptions">
      <vi-input-label>Filter by themes</vi-input-label>
      <div class="options-container">
        <vi-checkbox
          :inlineFlex="true"
          v-for="opt in themeOptions"
          :key="opt.value"
          v-model="themeList"
          :option-value="opt"
          :label="opt.value_name_en"
        />
      </div>
    </div>

    <div v-if="subthemeOptions">
      <vi-input-label>Filter by sub-themes</vi-input-label>
      <div class="options-container">
        <vi-checkbox
          :inlineFlex="true"
          v-for="opt in subthemeOptions"
          :key="opt.value"
          v-model="subthemeList"
          :option-value="opt"
          :label="opt.value_name_en"
        />
      </div>
    </div>

    <div v-if="weaknessOptions">
      <vi-input-label>Filter by weakness</vi-input-label>
      <div class="options-container">
        <vi-checkbox
          class="mb-20"
          v-for="opt in weaknessOptions"
          :key="opt.value"
          v-model="weaknessList"
          :option-value="opt"
          :label="opt.value_name_en"
        />
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        levelList: [],
        difficultyList: [],
        texttypeList: [],
        themeList: [],
        subthemeList: [],
        weaknessList: [],
        levelOptions: [],
        difficultyOptions: [],
        texttypeOptions: [],
        themeOptions: [],
        subthemeOptions: [],
        weaknessOptions: []
      }
    },
    methods: {
      searchFilter (items, search) {
        items = this.filterByType(items, 'level')
        items = this.filterByType(items, 'difficulty')
        items = this.filterByType(items, 'texttype')
        items = this.filterByType(items, 'theme')
        items = this.filterByType(items, 'subtheme')
        items = this.filterByType(items, 'weakness')
        return items
      },
      filterByType (items, type) {
        return items
        // if (this[`${type}List`].length === 0) return items
        // let result = items.filter(item => {
        //   if (!item[`ei_${type}`]) return
        //   return item[`ei_${type}`].some(t => {
        //     let value = typeof t === 'string' ? t : t.value
        //     value = value.toLowerCase()
        //     let filterIds = typeof this[`${type}List`][0] === 'string' ? this[`${type}List`] : this[`${type}List`].map(obj => obj.value)
        //     return filterIds.some(filter => {
        //       filter = filter.toLowerCase()
        //       return filter === value
        //     })
        //   })
        // })
        // return result
      },
      clearAllFilter () {
        this.difficultyList = []
        this.levelList = []
        this.themeList = []
        this.subthemeList = []
        this.weaknessList = []
        this.texttypeList = []
      }
    },

    created () {
      this.$store.dispatch('shelf/getItemsByCategory', {
        cat: this.$key
      }).then(metadata => {
        const searchTags = metadata.searchTag

        const level = searchTags.find(item => item.key === 'level')
        const difficulty = searchTags.find(item => item.key === 'difficulty')
        const texttype = searchTags.find(item => item.key === 'texttype')
        const theme = searchTags.find(item => item.key === 'theme')
        const subtheme = searchTags.find(item => item.key === 'subtheme')
        const weakness = searchTags.find(item => item.key === 'weakness')

        this.levelOptions = level && level.values
        this.difficultyOptions = difficulty && difficulty.values
        this.texttypeOptions = texttype && texttype.values
        this.themeOptions = theme && theme.values
        this.subthemeOptions = subtheme && subtheme.values
        this.weaknessOptions = weakness && weakness.values
      })
    }
  }
</script>
