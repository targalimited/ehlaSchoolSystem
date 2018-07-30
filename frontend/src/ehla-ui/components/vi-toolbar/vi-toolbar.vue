<template>
  <div class="vi-toolbar" :class="classes" :style="styles">
    <div class="vi-toolbar__content" :style="styles">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vi-toolbar',
    props: ['float', 'height'],
    computed: {
      classes () {
        return {
          'vi-toolbar--float': this.float
        }
      },
      styles () {
        let style = {}
        if (this.height) {
          style.height = this.height + 'px'
        }
        return style
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/settings.styl'

  .vi-toolbar
    position relative
    transition: .3s $transition
    width: 100%
    background: white

    &--float
      box-shadow $shadow

    &__content
      height 60px
      padding 0 10px
      border-bottom 1px solid $border-color
      align-items: center
      display: flex

    &__divider
      height 30px
      width 1px
      background $border-color
      margin 0 10px
</style>
