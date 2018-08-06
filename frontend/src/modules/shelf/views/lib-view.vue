<template>
  <panel class="lib-view">

    <vi-row v-if="!readings" justify-center style="margin-top: 40px">
      <vi-spinner/>
    </vi-row>

    <vi-data-table
      v-else
      :pagination.sync="pagination"
      class="lib-table"
      :no-header="true"
      :table-height="500"
      :item-height="135"
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
          <vi-checkbox
            @input="toggleReading(item)"
            :disabled="loading"
            :input-value="item.chose"/>
        </vi-table-col>
      </div>
    </vi-data-table>
  </panel>
</template>

<script>
  import {previewDialog} from '../dialogs'

  const map = {
    WR: {
      name_en: 'Weekly Fun Reading'
    },
    DR: {
      name_en: 'Daily Fun Reading'
    },
    RCD: {
      name_en: 'Reading Comprehension Diagnosis'
    },
    BR: {
      name_en: 'Daily Fun Reading (Bridging)'
    }
  }

  export default {
    name: 'lib-view',

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
        pagination: {}
      }
    },

    computed: {
      levelFilter () {
        return this.$store.state.shelf.levelFilter
      },
      difficultyFilter () {
        return this.$store.state.shelf.difficultyFilter
      },
      texttypeFilter () {
        return this.$store.state.shelf.texttypeFilter
      },
      themeFilter () {
        return this.$store.state.shelf.themeFilter
      },
      subthemeFilter () {
        return this.$store.state.shelf.subthemeFilter
      },
      weaknessFilter () {
        return this.$store.state.shelf.weaknessFilter
      },
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
        if (this[`${type}Filter`] && this[`${type}Filter`].length === 0) return items
        let result = items.filter(item => {
          if (!item[`ei_${type}`]) return
          return item[`ei_${type}`].some(t => {
            let value = typeof t === 'string' ? t : t.value
            value = value.toLowerCase()
            let filterIds = this[`${type}Filter`]
            return filterIds.some(filter => {
              filter = filter.toLowerCase()
              return filter === value
            })
          })
        })
        return result
      },
      toggleReading (i) {
        if (i.chose) this.removeReading(i)
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
      async removeReading (item) {
        this.loading = true
        await this.$store.dispatch('shelf/remove', {
          id: item.id,
          cat: this.$key,
          withLevels: item.lock_status
        })
        this.loading = false
        this.$message('Reading removed')
      },
      async previewReading (item) {
        previewDialog(item.id)
      }
    },

    created () {
      this.$store.dispatch('shelf/getItemsByCategory', {
        cat: this.$key
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../../project-ui/stylus/settings.styl'
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
  @import '../../../project-ui/stylus/settings.styl'
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
