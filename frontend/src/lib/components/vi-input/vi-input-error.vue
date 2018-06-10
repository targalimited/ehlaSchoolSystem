<template>
  <div class="vi-input-errors">
    <div v-if="!requirements" class="vi-input-error vi-input-error--error">
      <div class="vi-input-error__icon">
        <vi-icon name="clear"/>
      </div>
      <slot></slot>
    </div>
    <div v-else="!requirements" v-for="(r,i) in requirements" :key="i" class="vi-input-error" :class="r.error ? 'vi-input-error--unsatisfied' : 'vi-input-error--satisfied'">
      <div class="vi-input-error__icon">
        <vi-icon :name="r.error ? 'checkbox-empty' : 'done'"/>
      </div>
      {{r.message}}
    </div>
  </div>
</template>

<script>
  import ViIcon from '../vi-icon'
  import '../vi-icon/collection/content/clear'
  import '../vi-icon/collection/content/checkbox-empty'
  import '../vi-icon/collection/action/done'
  export default {
    name: 'vi-input-error',
    components: {ViIcon},
    props: ['requirements']
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'

  // only directly after vi-input should we add the top padding space
  .vi-input + .vi-input-errors
    padding-top 6px

  .vi-input-error
    color $brand
    font-size 14px
    padding-left 16px
    position relative
    line-height 1.2
    transition $transition
    +not-last()
      padding-bottom 6px

    &__icon
      width 16px
      height 16px
      position absolute
      left 0
      top 1px
      display flex
      align-items center

      .vi-icon
        width 10px
        height 10px

    &--error
      color $brand

    &--satisfied
      color $light-grey

    &--unsatisfied
      color $brand

      .vi-icon
        width 6px
        height 6px
</style>
