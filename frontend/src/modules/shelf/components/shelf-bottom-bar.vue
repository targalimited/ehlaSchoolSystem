<template lang="pug">
  .shelf-bottom-bar
    .title
      span Selected
      b {{selectedCount}} / {{summary.total_item_qtt}}
      span reading packs
    vi-row(v-if="levelsQuota")
      .label-group(v-for="(lv, i) in levelsQuota" :key="i")
        .label {{lv.level | levelName}}
        span {{lv.selected}}/{{lv.maxQuota}}
        span(v-if="lv.full") full
</template>

<script>
  export default {
    computed: {
      selectedCount () {
        return this.$store.getters['shelf/selectedCount']
      },
      summary () {
        return this.$store.state.shelf.summary || {}
      },
      levelsQuota () {
        return this.$store.getters['shelf/levelsQuota']()
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../../project-ui/stylus/main.styl'
  .shelf-bottom-bar
    padding 20px
    background #f0f0f0
    width 100%

    .title
      font-size 16px
      color $brand

      b
        padding 0 4px

    .label
      width 30px
      height @width
      border-radius 500em
      display inline-flex
      align-items center
      justify-content center
      color white
      background #8db2c5
      margin-right 8px

    .label-group
      display flex
      align-items center
      margin-right 16px
</style>
