<!--
  This component list the pickable asmt options given the selected class and selected category
  And will emit an input event to the parent for the selected item
-->
<template lang="pug">
  panel.asmt-options
    vi-input(slot="head" v-model="search" placeholder="Search.." prefix-icon="search")
    vi-spinner(v-if="!items && loading")
    vi-data-table(
      v-else
      :items="items"
      :item-height="100"
      table-height="400"
      v-model="selectedId"
      item-key="id"
      divided
      :search="search"
      :headers="headers"
      no-header
      :pagination.sync="pagination"
    )
      .vi-table__row.vi-table__row--link(slot="item" slot-scope="{item, toggle, checked}" @click="toggle(item)")
        vi-table-col
          reading-item(small :item="item")
        vi-table-col
          vi-checkbox(:input-value="checked")

</template>

<script>
  export default {
    name: 'asmt-options',

    props: {
      selectedClass: [String, Number],
      selectedCat: String
    },

    data () {
      return {
        search: '',
        loading: false,
        selectedId: '',
        headers: [
          {
            text: '',
            expand: true
          },
          {
            text: '',
            width: '25px',
            align: 'right'
          }
        ],
        pagination: {}
      }
    },

    computed: {
      items () {
        return this.$store.getters.getItemListByClassCat(this.selectedClass, this.selectedCat)
      }
    },

    methods: {
      async initFetch () {
        this.loading = true
        await this.$store.dispatch('getItemListByClassCat', {
          classId: this.selectedClass,
          catId: this.selectedCat
        })
        this.loading = false
      }
    },

    created () {
      this.initFetch()
    },

    watch: {
      selectedId () {
        this.$emit('input', this.selectedId)
      }
    }
  }
</script>

<style lang="stylus">
  .asmt-options
    .vi-input
      width 100%
      border none
      box-shadow none
</style>
