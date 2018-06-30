<template>
  <div class="pick-item-view">

    {{selectedItem}}
    <vi-data-table
      v-if="items"
      :pagination.sync="pagination"
      class="lib-table"
      :no-header="true"
      :item-height="135"
      v-model="selectedItem"
      item-key="id"
      :items="items">

      <div slot="item" slot-scope="{item, toggle, checked}" class="vi-table__row">

        <vi-table-col>
          <reading-item :item="item"/>
        </vi-table-col>

        <vi-table-col>
          <vi-button color="brand" outline>Preview</vi-button>
        </vi-table-col>

        <vi-table-col>
          <vi-checkbox-boolean
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
        selectedItem: ''
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
