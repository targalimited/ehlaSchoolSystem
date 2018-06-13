<template functional>
  <div class="vi-button-row" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'vi-button-row',
    props: {
      center: false
    },
    computed: {
      classes () {
        return {
          'vi-button-row--center': this.center
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'
  .vi-button-row
    display flex
    width 100%
    justify-content center

    .vi-button
      &:not(:first-child)
        margin-left 20px

    &--center
      justify-content center
</style>
