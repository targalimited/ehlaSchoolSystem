<template>
  <panel class="browse-list" :loading="loading">

    <template slot="head">
      <vi-input v-model="search" placeholder="Search daily fun reading" prefix-icon="search"></vi-input>
    </template>

    <vi-row v-if="!readings" justify-center style="margin-top: 40px">
      <vi-spinner/>
    </vi-row>

    <vi-data-table
      v-else
      :pagination.sync="pagination"
      divided
      class="lib-table"
      :no-header="true"
      :item-height="118"
      :items="readings"
      :headers="headers"
      :custom-filter="searchFilter"
      :search="search">

      <div slot="item" slot-scope="{item}" class="vi-table__row">

        <vi-table-col>
          <reading-item :item="item"/>
        </vi-table-col>

        <vi-table-col>

            <vi-button @click="toggleReading(item)" :color="item.chose ? 'orange' : 'brand'" small outline class="mb-4">{{item.chose ? 'Remove' : 'Add'}}</vi-button>
            <vi-button @click="previewReading(item)" color="brand" small flat>Preview</vi-button>
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
      searchFilter (items, search, filter) {
        items = this.filterBySearch(items, search, filter)
        items = this.filterByType(items, 'level')
        items = this.filterByType(items, 'difficulty')
        items = this.filterByType(items, 'texttype')
        items = this.filterByType(items, 'theme')
        items = this.filterByType(items, 'subtheme')
        items = this.filterByType(items, 'weakness')
        return items
      },
      filterBySearch (items, search, filter) {
        search = search.toString().toLowerCase()
        if (search.trim() === '') return items

        return items.filter(i => (
          Object.keys(i).some(j => filter(i[j], search))
        ))
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
            'Your selection for this category has reached the maximum. You can still choose reading from other category' :
            'Your total selection has reached the maximum'
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
      },
      async initFetch () {
        this.$store.dispatch('shelf/getItemsByCategory', {
          cat: this.$key
        })
      }
    },

    created () {
      this.initFetch()
    },

    watch: {
      '$route.params.key': function () {
        this.initFetch()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../../project-ui/stylus/settings.styl'
  .lib-table .vi-table__col
    &:nth-child(1)
      width calc(100% - 100px)

    &:nth-child(2)
      width 100px
      justify-content flex-end
      flex-direction: column;
      align-items: flex-end;

  .vi-col
    width 33%

  .browse-list
    .vi-input
      box-shadow none
      border none
      width 100%
</style>
