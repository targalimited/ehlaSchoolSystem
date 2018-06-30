<template>
  <div class="pick-item-view">

    <vi-app-bar title="Assignment">

    </vi-app-bar>

    <vi-data-table
      v-if="items"
      :headers="headers"
      :items="items"
      v-model="selectedItem"
      item-key="id"
      :pagination.sync="pagination"
      no-header
      :item-height="135">

      <div slot="item" slot-scope="{item, toggle, checked}" class="vi-table__row">

        <vi-table-col>
          <reading-item :item="item"/>
        </vi-table-col>

        <vi-table-col>
          <vi-button color="brand" outline>Preview</vi-button>
          <vi-checkbox-boolean
            class="ml-20"
            @click.native="toggle(item)"
            :value="checked"/>
        </vi-table-col>
      </div>
    </vi-data-table>
  </div>
</template>

<script>
  export default {
    name: 'pick-item-view',

    props: {

    },

    data() {
      return {
        pagination: {},
        selectedItem: '',
        headers: [
          {
            text: 'name',
            expand: true
          },
          {
            text: 'name',
            width: '140px'
          }
        ]
      }
    },

    computed: {
      items () {
        return this.$store.getters['shelf/readings']('WR')
      }
    },

    methods: {

    },

    created () {
      this.$store.dispatch('shelf/getItemsByCategory', {
        cat: 'WR'
      })
    }
  }
</script>

<style lang="stylus">
  @import '../../../lib/stylus/main.styl'
</style>
