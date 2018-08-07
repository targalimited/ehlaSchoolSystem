<template lang="pug">
  .browse-notice {{catChosen}} Reading packs selected
    small(v-if="catMax !== 999") (out of {{catMax}} quota)
</template>

<script>
  export default {
    computed: {
      $key () {
        return this.$route.params.key
      },
      catChosen () {
        return this.$store.state.shelf.cats[this.$key].selectedCount
      },
      catMax () {
        return this.$store.state.shelf.cats[this.$key].max
      }
    }
  }
</script>

<style lang="stylus">
  .browse-notice
    padding 8px 20px
    background #f1f1ce
</style>
