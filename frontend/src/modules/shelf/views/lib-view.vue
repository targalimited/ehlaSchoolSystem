<template>
  <div class="lib-view">

    <div class="vi-banner">
      <vi-icon class="vi-banner__icon" name="daily-reading" size="60"/>
      <div class="vi-banner__title">{{catName}}  <small v-if="readings">({{readings.length}} items)</small></div>
    </div>

    <vi-row v-if="!readings" justify-center style="margin-top: 40px">
      <vi-spinner/>
    </vi-row>

    <vi-data-table
      v-else
      class="lib-table"
      :sticky="60"
      :items="readings"
      :headers="headers"
      :search="search">

      <div slot="item" slot-scope="{item}" class="vi-table__row">

        <vi-table-col class="ellipsis">

          <reading-item :item="item"/>
        </vi-table-col>

        <vi-table-col>
          <vi-checkbox-boolean
            :circular="true"
            @input="toggleReading(item)"
            :disabled="item.lock_status || loading"
            :value="item.chose"/>
        </vi-table-col>
      </div>
    </vi-data-table>
  </div>
</template>

<script>
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
          }
        ]
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
      }
    },

    created () {
      this.$store.dispatch('shelf/getItemsByCategory', {
        key: this.$key
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

</style>
