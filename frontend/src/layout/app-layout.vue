<template lang="pug">
  .app-main(:class="`app-main--${type}`")
    .app-main__top
      router-view(name="top")
    .app-main__top2
      router-view(name="top2")
    .app-view
      .app-view__l
        router-view(name="left")
      .app-view__r
        .app-view__r__default
          router-view(name="default")
        .app-view__r__bottom
          router-view(name="viewBottom")
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
  @import '../project-ui/stylus/settings.styl'
  .app-main
    height 100%
    display flex
    flex-direction column

    &__top
      position relative

    &--single
      .app-view
        overflow-y scroll

      .app-view__l
        display none

      .app-view__r
        max-width 700px
        margin 0 auto
        padding 20px 20px 0 20px
        width 100%

        &__default
          height 100% // TODO: how to stretch with 100%

    &--menu
      .app-view__l
        padding 20px 16px
        background #f0f0f0
        width 240px
        overflow-y scroll
        border-right 1px solid $border-color

      .app-view__r
        width calc(100% - 240px)

        &__default
          padding 16px
          height 100%

    &--panel
      .app-view__l
        width 320px
        padding 20px 10px 0 20px
        flex-shrink 0

      .app-view__r
        width calc(100% - 320px)
        padding 20px 20px 0 10px
        display flex
        flex-direction column

        &__default
          height 100%

  .app-view
    display flex
    flex 1
    background #f9f9f9

    &__l
      flex-shrink 0
</style>
