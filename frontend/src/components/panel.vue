<template lang="pug">
  .panel(:class="{'panel--disabled': disabled}")
    .panel__loading(v-if="loading")
      vi-spinner
    .panel__head(v-if="$slots.head")
      slot(name="head")
    .panel__body
      slot(name="default")
    .panel__foot(v-if="$slots.foot")
      slot(name="foot")
</template>

<script>
  export default {
    props: {
      disabled: Boolean,
      loading: Boolean
    }
  }
</script>

<style lang="stylus">
  @import '../project-ui/stylus/settings.styl'
  .panel
    border 1px solid $border-color
    height 100%
    display flex
    flex-direction column
    background white
    position relative

    &--disabled
      background #f9f9f9

    &__head
      border-bottom 1px solid $border-color
      height 50px
      display flex
      align-items center
      padding 0 16px
      flex-shrink 0

    &__foot
      border-top 1px solid $border-color
      height 50px
      display flex
      align-items center
      padding 0 16px
      flex-shrink 0

    &__body
      flex 1
      overflow-y auto

    &__loading
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      display flex
      align-items center
      justify-content center
      z-index 2
      background rgba(255,255,255,0.8)
</style>
