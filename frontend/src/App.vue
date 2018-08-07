<template lang="pug">
  vi-app.app-layout
    dialogs-wrapper(wrapper-name="default")
    .app-layout__side
      sidebar
    .app-layout__main
      router-view
</template>

<script>
import Sidebar from './layout/sidebar'
export default {
  name: 'App',
  components: { Sidebar }
}
</script>

<style lang="stylus">
  body
    overflow: hidden

  .app-layout
    &__side
      width 60px
      position fixed
      top 0
      bottom 0
      left 0
      background #2e81af

      .logo
        width 40px

    &__main
      margin-left 60px
      height 100vh
      display flex
      flex-direction column
</style>
