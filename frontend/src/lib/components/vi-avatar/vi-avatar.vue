<template>
  <div class="vi-avatar"
       :class="{'vi-avatar--border': border}"
       :style="{'width': size + 'px', 'height': size + 'px'}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'vi-avatar',
    props: {
      size: {
        default: 50
      },
      border: {
        default: true
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'
  .vi-avatar
    align-items: center
    border-radius: 50%
    display: inline-flex
    justify-content: center
    position: relative
    text-align: center
    vertical-align: middle

    &--border
      img, .vi-icon
        border: 2px solid $dark-border-color
        border-radius: 50%

    img,
    .icon
      border-radius: 50%
      height: inherit
      width: inherit

    &--tile
      border-radius: 0

      img,
      .icon
        border-radius: 0
</style>
