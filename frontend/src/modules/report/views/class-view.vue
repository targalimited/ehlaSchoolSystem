<template lang="pug">
  .panel-layout
    .panel-layout__l
      asmt-item
      asmt-item
    .panel-layout__r
      vi-data-table(
        :items="students"
        :item-height="600"
        :headers="headers"
        :pagination="pagination"
      )
        div(slot="item" slot-scope="{item}")
          vi-table-col {{item.name}}
</template>

<script>
  export default {
    data() {
      return {
        students: [
          {
            name: 'John'
          },
          {
            name: 'John2'
          },
          {
            name: 'John3'
          },
          {
            name: 'John4'
          }
        ],
        headers: [
          {
            text: 'yo'
          }
        ],
        pagination: {}
      }
    },
    methods: {
      getWeaknessList (classId) {
        this.$store.dispatch('report/getClassWeaknessList', {classId})
      },
      getItemList (classId) {
        this.$store.dispatch('report/getClassItemList', {classId})
      },
      getItemReport () {
        this.$store.dispatch('report/getClassItemReport', {
          classId: 1,
          batchId: 1,
          itemId: 1,
        })
      },
      getWeaknessReport () {
        this.$store.dispatch('report/getClassWeaknessReport', {
          classId: 1,
          batchId: 1,
          itemId: 1,
        })
      },
    },
    async created () {
    }
  }
</script>


<style lang="stylus" scoped>
  @import '../../../project-ui/stylus/settings.styl'
  .panel-layout
    display flex
    background #fdfcf5
    height 800px

    &__l
      width 350px

    &__r
      flex 1
      border-left 1px solid $border-color
</style>
