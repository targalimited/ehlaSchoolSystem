<template lang="pug">
  .bottom-bar
    slot
</template>

<style lang="stylus">
  @import '../project-ui/stylus/main.styl'
  .bottom-bar
    padding 20px
    position relative
    z-index 1
    background #f0f0f0
    box-shadow $box-shadow-2
</style>
