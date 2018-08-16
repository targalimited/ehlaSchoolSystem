<template lang="pug">
  .browse-notice
    vi-row(align-center)
      vi-icon(name="info-circular" size="22")
      div
        div(v-if="!isAdmin")
          | Only
          strong &nbsp;administrator&nbsp;
          | could add and remove items
        div
          strong {{selectedCount}} / {{summary.total_item_qtt}}&nbsp;
          | Reading packs selected
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
      isAdmin () {
        return this.$store.getters.isAdmin
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../../project-ui/stylus/settings.styl'
  .browse-notice
    padding 8px 20px
    background #f1f1ce

    .vi-icon
      color inherit
      margin-right 12px
      opacity 0.7
</style>
