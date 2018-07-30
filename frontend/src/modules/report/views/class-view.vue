<template>
  <div class="class-view">
    <vi-app-bar title="Report: select class"></vi-app-bar>

    <div v-if="classList" v-for="c in classList" :key="c.class_id">
      {{c.class_name}}
      <button @click="getWeaknessList(c.class_id)">see weakness</button>
      <button @click="getItemList(c.class_id)">see items</button>
      <button @click="getItemReport">get class item report</button>
      <button @click="getWeaknessReport">get weakness report</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
       classList: null
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
      const res = await this.$store.dispatch('report/getClasses')
      console.log(res)
      this.classList = res
    }
  }
</script>


<style lang="stylus" scoped>
  @import '../../../lib/stylus/settings.styl'

  .vi-card
    background #dfeef6
    height 200px
    display flex
    flex-flow row wrap
    align-items center
    justify-content center
    font-size 20px
    box-shadow $shadow
    cursor pointer
    transition all $transition

    &:hover
      box-shadow $shadow-2

    .bottom
      position absolute
      bottom 4px
      left 8px

    .vi-menu
      position absolute
      top 8px
      right 8px

</style>
