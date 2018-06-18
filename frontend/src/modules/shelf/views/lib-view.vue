<template>
  <div class="lib-view" :class="{'mt-38' : searchList.length > 0}">

    <vi-app-bar
      :title="catName">
      <div>
        {{catChosen}} Reading packs selected<small v-if="catMax !== 999">(out of {{catMax}} quota)</small>
      </div>
      <div slot="action">
        <vi-menu v-model="menu" content-class="filter-menu" :close-on-content-click="false">
          <vi-button slot="activator" icon flat>
            <vi-icon name="search"/>
          </vi-button>
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
              <vi-input-label>Filter by texttypes</vi-input-label>
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
              <vi-input-label>Filter by subthemes</vi-input-label>
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
        </vi-menu>
      </div>
    </vi-app-bar>

    <vi-row align-center class="search-terms" v-show="searchList.length > 0">
      <vi-icon name="search" size="16" class="mr-10"/>
      <div class="text-ellipsis">Searching for <span class="text-bold ml-6">{{searchList | join}}</span></div>
      <vi-button text icon @click="clearAllFilter">
        <vi-icon name="clear" size="14"/>
      </vi-button>
    </vi-row>

    <vi-row v-if="!readings" justify-center style="margin-top: 40px">
      <vi-spinner/>
    </vi-row>

    <vi-data-table
      v-else
      :pagination.sync="pagination"
      class="lib-table"
      :sticky="60"
      :items="readings"
      :headers="headers"
      :custom-filter="searchFilter"
      :search="search">

      <div slot="item" slot-scope="{item}" class="vi-table__row">

        <vi-table-col>
          <reading-item :item="item"/>
        </vi-table-col>

        <vi-table-col>
          <vi-button @click="previewReading(item)" color="brand" outline>Preview</vi-button>
        </vi-table-col>

        <vi-table-col>
          <vi-checkbox-boolean
            @input="toggleReading(item)"
            :disabled="item.lock_status || loading"
            :value="item.chose"/>
        </vi-table-col>
      </div>
    </vi-data-table>
  </div>
</template>

<script>
  import {previewDialog} from '../dialogs'
  import ReadingItem from '../components/reading-item'

  const map = {
    WR: {
      name_en: 'Weekly Fun Reading'
    },
    DR: {
      name_en: 'Daily Fun Reading'
    },
    RCD: {
      name_en: 'Reading Comprehensive Diagnosis'
    },
    BR: {
      name_en: 'Daily Fun Reading (Bridging)'
    }
  }

  export default {
    name: 'lib-view',

    components: { ReadingItem },

    data () {
      return {
        menu: false, // serach panel visibility
        search: '',
        loading: false,
        headers: [
          {
            text: 'name'
          },
          {
            text: ''
          },
          {
            text: ''
          }
        ],
        pagination: {},
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

    computed: {
      $key () {
        return this.$route.params.key
      },
      catName () {
        return map[this.$key].name_en
      },
      readings () {
        return this.$store.getters['shelf/readings'](this.$key)
      },
      catChosen () {
        return this.$store.state.shelf.cats[this.$key].selectedCount
      },
      catMax () {
        return this.$store.state.shelf.cats[this.$key].max
      },
      isCatFull () {
        return this.catChosen >= this.catMax
      },
      isFull () {
        if (this.catChosen >= this.catMax) return 'cat'
        else if (this.$store.getters['shelf/isFull']) return 'total'
        else return false
      },
      searchList () {
        return [...this.levelList.map(obj => obj.value_name_en), ...this.difficultyList.map(obj => obj.value_name_en), ...this.themeList.map(obj => obj.value_name_en), ...this.subthemeList.map(obj => obj.value_name_en), ...this.weaknessList.map(obj => obj.value_name_en), ...this.texttypeList.map(obj => obj.value_name_en)]
      }
    },

    methods: {
      toggleReading (i) {
        if (i.chose) this.removeReading(i.id)
        else this.addReading(i.id)
      },
      async addReading (id) {
        if (this.isFull) {
          const message = this.isFull === 'cat' ?
            'Your selection for this category has reach the maximum. You can still choose reading from other category' :
            'Your total selection has reach the maximum'
          this.$messageBox({
            title: 'Cannot add more reading!',
            message: message,
            cancel: null
          })
          return
        }
        this.loading = true
        await this.$store.dispatch('shelf/add', {
          id,
          cat: this.$key
        })
        this.loading = false
        this.$message('Reading added')
      },
      async removeReading (id) {
        this.loading = true
        await this.$store.dispatch('shelf/remove', {
          id,
          cat: this.$key
        })
        this.loading = false
        this.$message('Reading removed')
      },
      async previewReading (item) {
        previewDialog(item.id)
      },
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
        if (this[`${type}List`].length === 0) return items
        let result = items.filter(item => {
          if (!item[`ei_${type}`]) return
          return item[`ei_${type}`].some(t => {
            let value = typeof t === 'string' ? t : t.value
            value = value.toLowerCase()
            let filterIds = typeof this[`${type}List`][0] === 'string' ? this[`${type}List`] : this[`${type}List`].map(obj => obj.value)
            return filterIds.some(filter => {
              filter = filter.toLowerCase()
              return filter === value
            })
          })
        })
        return result
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

<style lang="stylus" scoped>
  @import '../../../lib/stylus/main.styl'
  .lib-table .vi-table__col
    &:nth-child(1)
      flex 1

    &:nth-child(2)
      width 50px

    &:nth-child(3)
      width 100px

  .vi-col
    width 33%

  .search-panel
    // padding 10px 0

  .vi-menu__activator
    .vi-button--flat.vi-button:hover
      background rgba(255,255,255,0.4)

    &.vi-menu__activator--active .vi-button
      background rgba(255,255,255,0.4)

  .search-terms
    font-size 14px
    background #fffade
    padding 8px 30px
    top: 70px !important
    left: 220px !important
    right: 0 !important
    position: fixed !important
    max-width: 100% !important
    box-shadow $shadow
    z-index 2
    position relative

    +screen(900px)
      left 74px !important

    .vi-button
      position absolute
      right 0

  .options-container
    margin 4px 0 32px
    font-size 15px

  .search-row
    position fixed
    bottom 0
    left 0
    right 0
    padding 20px
    background white

</style>

<style lang="stylus">
  @import '../../../lib/stylus/main.styl'
  .filter-menu
    top: 70px !important
    left: 220px !important
    right: 0 !important
    bottom: 0 !important
    position: fixed !important
    max-width: 100% !important
    background #f4f4f4
    border-radius !important
    max-height: 9999px !important
    overflow hidden

    +screen(900px)
      left 74px !important
      right: 0 !important

    .search-panel
      overflow auto
      padding 20px 32px
      height 100%
      padding-bottom 80px
</style>
