<!-- TODO: the vi-checkbox should accept boolean as well. This is a temprary solution -->
<template>
  <div @click="$emit('input', !value)"
       class="vi-checkbox-boolean"
       :class="classes">

    <template v-if="circular">
      <vi-icon name="checkmark-circular" size="48"/>
    </template>

    <template v-else>
      <vi-icon v-if="value" name="checkbox-checked" color="brand" size="22"/>
      <vi-icon v-else name="checkbox-empty" color="light-grey" size="22"/>
      <div class="label" v-if="label">{{label}}</div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'vi-checkbox-boolean',

    props: ['value', 'label', 'disabled', 'circular'],

    computed: {
      classes () {
        return {
          'disabled': this.disabled,
          'active': this.value,
          'circular': this.circular
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'
  .vi-checkbox-boolean
    font-size 14px
    cursor pointer
    display inline-flex
    align-items center

    .label
      padding-left 10px

    &.disabled
      pointer-events none
      opacity 0.35

    &.circular
      color $grey-2

      &.active
        color $brand
</style>
