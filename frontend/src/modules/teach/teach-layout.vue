<template lang="pug">
  .teach-layout
    top-bar
    .panel-layout
      .panel-layout__l
        router-view(name="left")
      .panel-layout__r
        router-view(name="right")
</template>

<script>
  import TopBar from '../../layout/top-bar'
  export default {
    name: 'default-layout',
    components: {TopBar},
    created () {
      console.log('yo')
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../project-ui/stylus/settings.styl'
  .panel-layout
    display flex
    background #fdfcf5
    height 800px
    margin-top 75px

    &__l
      width 350px

    &__r
      flex 1
      border-left 1px solid $border-color
</style>
