<template lang="pug">
  .shelf-bottom-bar
    div {{selectedCount}}/ {{summary.total_item_qtt}} reading packs
    vi-row(v-if="levelsQuota")
      div(v-for="(lv, i) in levelsQuota" :key="i")
        span {{lv.level | levelName}}
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
  .shelf-bottom-bar
    padding 20px
    background #f9f9f9
    width 100%
</style>
