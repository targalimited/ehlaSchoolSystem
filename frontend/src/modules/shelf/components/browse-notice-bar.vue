<template lang="pug">
  .browse-notice {{selectedCount}} / {{summary.total_item_qtt}} Reading packs selected
</template>

<script>
  export default {
    computed: {
      selectedCount () {
        return this.$store.getters['shelf/selectedCount']
      },
      summary () {
        return this.$store.state.shelf.summary || {}
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../../project-ui/stylus/settings.styl'
  .browse-notice
    padding 8px 20px
    background #f1f1ce
</style>
