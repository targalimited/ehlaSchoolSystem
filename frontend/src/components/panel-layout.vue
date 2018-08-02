<template lang="pug">
  .panel-layout
    .panel-layout__l
      slot(name="left")
    .panel-layout__r
      slot(name="right")
</template>

<style lang="stylus" scoped>
  @import '../project-ui/stylus/settings.styl'
  .panel-layout
    display flex
    background #fdfcf5
    height 800px

    &__l
      width 350px
      flex-shrink 0

    &__r
      flex 1
      border-left 1px solid $border-color
</style>
