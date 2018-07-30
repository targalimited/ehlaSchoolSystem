<template lang="pug">
  panel-layout
    div(slot="left") {{weaknessList}}
    div(slot="right")
      weakness-report(:batch-id="selectedAsmt.batch_id" :item-id="selectedAsmt.item && selectedAsmt.item.item_id")
</template>

<script>
  import WeaknessReport from '../components/current-asmt-report'
  export default {
    name: "asmt-view",
    components: {
      WeaknessReport
    },
    data() {
      return {
        selectedAsmt: {}
      }
    },
    computed: {
      weaknessList () {
        return this.$store.state.report.weaknessList
      }
    },
    methods: {
      getWeaknessList (classId) {
        this.$store.dispatch('report/getClassWeaknessList', {classId})
      },
      onSelect (d) {
        this.selectedAsmt = d
      }
    },
    async created () {
      const classId = this.$route.params.class_id
      this.$store.dispatch('getClassWeaknessList', {classId})
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
