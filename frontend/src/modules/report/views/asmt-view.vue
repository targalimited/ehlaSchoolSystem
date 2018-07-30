<template lang="pug">
  panel-layout
    div(slot="left")
      vi-spinner(v-if="!asmtList")
      asmt-item(
        v-else
        v-for="d in asmtList"
        :key="d.batch_id"
        :asmt-data="d"
        @click.native="onSelect(d)"
      )
    div(slot="right")
       current-asmt-report(:batch-id="selectedAsmt.batch_id" :item-id="selectedAsmt.item && selectedAsmt.item.item_id")
</template>

<script>
  import CurrentAsmtReport from '../components/current-asmt-report'
  export default {
    name: "asmt-view",
    components: {
      CurrentAsmtReport
    },
    data() {
      return {
        selectedAsmt: {}
      }
    },
    computed: {
      asmtList () {
        return this.$store.getters.currentAsmtList
      }
    },
    methods: {
      getWeaknessList (classId) {
        this.$store.dispatch('report/getClassWeaknessList', {classId})
      },
      getItemList (classId) {
        this.$store.dispatch('report/getClassItemList', {classId})
      },
      getWeaknessReport () {
        this.$store.dispatch('getClassWeaknessReport', {
          classId: 1,
          batchId: 1,
          itemId: 1,
        })
      },
      onSelect (d) {
        this.selectedAsmt = d
      }
    },
    async created () {
      const classId = this.$route.params.class_id
      this.$store.dispatch('getClassItemList', {classId})
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
