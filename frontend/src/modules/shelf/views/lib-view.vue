<template>
  <div class="lib-view">

    <div class="vi-banner">
      <vi-icon class="vi-banner__icon" name="daily-reading" size="60"/>
      <div class="vi-banner__title">{{catName}}  <small v-if="readings">({{readings.length}} items)</small></div>
    </div>

    <vi-row>
      <vi-select
        v-model="levelList"
        :options="levelOptions"
        option-name="value_name_en"
        :chip="true">
      </vi-select>
      <vi-select
        v-model="difficultyList"
        :options="difficultyOptions"
        option-name="value_name_en"
        :chip="true">
      </vi-select>
      <vi-select
        v-model="texttypeList"
        :options="texttypeOptions"
        option-name="value_name_en"
        :chip="true">
      </vi-select>
    </vi-row>
    <vi-row>
      <vi-select
        v-model="themeList"
        :options="themeOptions"
        option-name="value_name_en"
        :chip="true">
      </vi-select>
      <vi-select
        v-model="subthemeList"
        :options="subthemeOptions"
        option-name="value_name_en"
        :chip="true">
      </vi-select>
      <vi-select
        v-model="weaknessList"
        :options="weaknessOptions"
        option-name="value_name_en"
        :chip="true">
      </vi-select>
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
      }
    },

    methods: {
      toggleReading (i) {
        if (i.chose) this.removeReading(i.id)
        else this.addReading(i.id)
      },
      async addReading (id) {
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
        key: this.$key
      }).then(searchTags => {
        this.levelOptions = searchTags.find(item => item.key === 'level').values
        this.difficultyOptions = searchTags.find(item => item.key === 'difficulty').values
        this.texttypeOptions = searchTags.find(item => item.key === 'texttype').values
        this.themeOptions = searchTags.find(item => item.key === 'theme').values
        this.subthemeOptions = searchTags.find(item => item.key === 'subtheme').values
        this.weaknessOptions = searchTags.find(item => item.key === 'weakness').values
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

</style>
