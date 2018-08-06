<template lang="pug">
  .app-main(:class="`app-main--${type}`")
    .app-main__top
      router-view(name="top")
    .app-main__tab
      router-view(name="tab")
    .app-view
      .app-view__l
        router-view(name="left")
      .app-view__r
        router-view(name="default")
    .app-main__btm
      router-view(name="bottom")
</template>

<script>
  import Sidebar from './sidebar'
  export default {
    name: 'app-layout',
    props: {
      type: {
        type: String,
        default: 'single'
      }
    },
    components: {
      Sidebar
    }
  }
</script>

<style lang="stylus">
  @import '../project-ui/stylus/main.styl'
  .app-main
    height 100%
    display flex
    flex-direction column

    &--single
      .app-view__l
        display none

      .app-view__r
        max-width 700px
        margin 0 auto

    &--menu
      .app-view__l
        margin 0
        background #f9f9f9
        width 240px

  .app-view
    display flex
    flex 1

    &__l
      width 320px
      margin 20px 10px 0 20px

    &__r
      flex 1
      margin 20px 20px 0 10px
      // overflow scroll // TODO make it optional
</style>
