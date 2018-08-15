<template lang="pug">
  panel.weakness-list
    vi-no-data(v-if="classId < 0" icon="alert" title="No class available" content="You are not in any class!")
    template(v-else)
      template(slot="head")
        vi-input(v-model="search" placeholder="Search weakness" prefix-icon="search")
      vi-spinner(v-if="loading && !weaknessList")
      vi-no-data(v-else-if="weaknessList.length === 0" title="No weakness found" content="This class has no weakness")
      vi-data-table(
        v-else
        :disableVirtualScroll="true"
        :items="weaknessList"
        :item-height="48"
        v-model="selected"
        item-key="id"
        divided
        :search="search"
        :headers="headers"
        no-header
        :pagination.sync="pagination"
        :max="3"
        @input="onSelect"
      )
        .vi-table__row.vi-table__row--link(slot="item" slot-scope="{item, toggle, checked, disabled}" @click="toggle(item)" :class="{'vi-table__row--disabled': disabled}")
          vi-table-col {{item.name_en}}
          vi-table-col
            vi-checkbox(:input-value="checked")
</template>

<script>
  export default {
    name: "asmt-list",
    data () {
      return {
        selected: [],
        loading: false,
        search: '',
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
      weaknessList () {
        return this.$store.getters.weakness_list(this.classId)
      },
      classId () {
        return this.$route.params.classId
      }
    },
    methods: {
      onSelect () {
        this.$store.commit('updateSelectedWeakness', this.selected)
      },
      async fetch () {
        this.loading = true
        await  this.$store.dispatch('getWeaknessList', {
          classId: this.classId
        })
        this.loading = true
      }
    },
    created () {
      this.fetch()
    },
    watch: {
      classId () {
        this.$store.commit('updateSelectedWeakness', null)
        this.fetch()
      }
    }
  }
</script>

<style lang="stylus">
  .weakness-list
    .vi-input
      border none
      width 100%
      box-shadow none !important
</style>
