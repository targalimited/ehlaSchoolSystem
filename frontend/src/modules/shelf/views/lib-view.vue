<template>
  <div class="lib-view">

    <div class="ui-banner">
      <vi-row align-center>
        <span class="ui-banner__title">{{catName}}</span>
      </vi-row>
      <div class="ui-banner__info" v-if="catMax">
        {{catChosen}} Reading Selected <small>(out of {{catMax}} quota)</small>
      </div>
    </div>

    <vi-row mt-2 px-10>
      <vi-col v-if="levelOptions">
        <vi-select
          v-model="levelList"
          :options="levelOptions"
          option-name="value_name_en"
          placeholder="Filter by levels"
          :chip="true">
        </vi-select>
      </vi-col>
      <vi-col v-if="difficultyOptions">
        <vi-select
          v-model="difficultyList"
          :options="difficultyOptions"
          placeholder="Filter by difficulties"
          option-name="value_name_en"
          :chip="true">
        </vi-select>
      </vi-col>
      <vi-col v-if="texttypeOptions">
        <vi-select
          v-model="texttypeList"
          :options="texttypeOptions"
          placeholder="Filter by texttypes"
          option-name="value_name_en"
          :chip="true">
        </vi-select>
      </vi-col>
    </vi-row>
    <vi-row px-10>
      <vi-col v-if="themeOptions">
        <vi-select
          v-model="themeList"
          :options="themeOptions"
          placeholder="Filter by themes"
          option-name="value_name_en"
          :chip="true">
        </vi-select>
      </vi-col>
      <vi-col v-if="subthemeOptions">
        <vi-select
          v-model="subthemeList"
          :options="subthemeOptions"
          placeholder="Filter by subthemes"
          option-name="value_name_en"
          :chip="true">
        </vi-select>
      </vi-col>
      <vi-col v-if="weaknessOptions">
        <vi-select
          v-model="weaknessList"
          :options="weaknessOptions"
          placeholder="Filter by weaknesses"
          option-name="value_name_en"
          :chip="true">
        </vi-select>
      </vi-col>
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
      name_en: 'Daily Fun Reading'
    },
    DR: {
      name_en: 'Weekly Fun Reading'
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
        return this.$store.state.shelf.cats[this.$key].selected
      },
      catMax () {
        return this.$store.state.shelf.cats[this.$key].max
      },// selection reach the max - cannot add new anymore
      isCatFull () {
        return this.catChosen >= this.catMax
      },
      isFull () {
        if (this.catChosen >= this.catMax) return 'cat'
        else if (this.$store.getters['shelf/isFull']) return 'total'
        else return false
      },
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
            const value = typeof t === 'string' ? t : t.value
            return this[`${type}List`].some(filter => filter === value)
          })
        })
        return result
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

  .ui-banner
    /*display flex*/
    /*align-items center*/
    background $brand
    color white
    padding 16px 24px
    height 90px

    small
      font-size 0.75em
      margin-left 0.2em

    &__icon
      margin-right 16px

    &__title
      font-size 22px
      font-weight bold

    &__info
      font-size 16px
      font-weight bold

      small
        font-size 14px

  .vi-col
    width 33%
</style>
