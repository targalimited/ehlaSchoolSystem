<template lang="pug">
  .default-layout
    .default-layout__l
    .default-layout__r
      router-view
</template>

<script>
  import TopBar from './top-bar'
  export default {
    name: 'default-layout',
    components: {TopBar}
  }
</script>

<style lang="stylus">
  .default-layout
    &__l
      width 40px
      position fixed
      top 0
      bottom 0
      left 0
      background #4b90b6

    &__r
      margin-left 40px

</style>
