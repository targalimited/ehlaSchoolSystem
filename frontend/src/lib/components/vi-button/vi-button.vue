<template>
  <button @click="onClick" class="vi-button" :style="computedStyle" :class="computedClasses">
    <span class="vi-button__content"><slot></slot></span>
  </button>
</template>

<script>
  import ViIcon from '../vi-icon'
  export default {
    name: 'vi-button',
    components: {
      ViIcon
    },
    props: {
      color: String,
      outline: Boolean,
      text: Boolean,
      icon: Boolean,
      round: Boolean,
      raise: Boolean,
      float: Boolean,
      disabled: Boolean,
      loading: Boolean,
      flat: Boolean,
      lowercase: Boolean,
      small: Boolean,
      large: Boolean,
      minWidth: String,
      size: [String, Number],
      primary: Boolean,
      active: Boolean,
      dark: Boolean
    },
    computed: {
      _color () {
        return this.primary ? 'brand-gradient' : this.color
      },
      _float () {
        return this.primary ? true : this.float
      },
      computedClasses () {
        return {
          'vi-button--outline': this.outline,
          'vi-button--text': this.text,
          'vi-button--fill': (!this.text && !this.outline && this.color && !this.flat) || this.primary,
          'vi-button--flat': this.flat,
          'vi-button--dark': this.dark,
          'vi-button--round': this.round,
          'vi-button--raise': this.raise,
          'vi-button--float': this._float,
          'vi-button--disabled': this.disabled,
          'vi-button--active': this.active,
          'vi-button--lowercase': this.lowercase,
          'vi-button--large': this.large,
          'vi-button--small': this.small,
          'vi-button--icon': this.icon,
          ['vi-button--' + this._color]: !!this._color,
        }
      },
      computedStyle () {
        const style = {
          'width': `${this.size}px`,
          'min-width': `${this.minWidth}px`
        }
        if (this.icon) style.height = `${this.size}px`
        return style
      }
    },
    methods: {
      onClick () {
        if (this.disabled) return
        this.$emit('click')
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'
  .vi-button
    align-items: center
    border-radius: $border-radius
    display: inline-flex
    height: 40px
    flex: 0 1 auto
    font-size: 16px
    font-weight: 400
    justify-content: center
    margin: 0 // TODO
    min-width: 80px // TODO
    outline: 0
    text-decoration: none
    transition: 0.3s
    position: relative
    vertical-align: middle
    user-select: none
    cursor pointer
    padding 0
    font-family 'Lato', sans-serif
    // default
    background none
    color $mild-grey
    border 1px solid currentColor

    &--active,
    &:hover,
    &:focus
      color $dark-grey

    &--disabled
      background $grey-2 !important
      border-color $grey-2 !important
      color white !important
      cursor default
      box-shadow none !important

    &__content
      align-items: center
      border-radius: inherit
      color: inherit
      display: flex
      height: inherit
      flex: 1 0 auto
      justify-content: center
      margin: 0 auto
      padding: 0 10px
      // transition: $transition
      white-space: nowrap
      width: inherit
      position relative
      top -1px // TODO

    &--fill
      color white !important // TODO otherwise sometimes the text is black? (in cached multiple dropdown)
      font-weight bold

      &:hover
        color white

      for color_name, color_value in $colors

        &.vi-button--{color_name}
          background-color color_value
          border-color: color_value

          &--active,
          &:hover
            background-color lighten(color_value, 15%)
            border-color lighten(color_value, 15%)

        &.vi-button--brand-gradient
          background-image $brand-gradient
          border none

          &--active,
          &:hover
            background-image $brand-gradient-reverse

    &--dark
      background rgba(255,255,255,0.3)
      border transparent
      font-weight bold

      &:hover
        background rgba(255,255,255,0.4)

    &--outline
      background none

      &.vi-button--active,
      &:hover,
      &:focus
        color $brand

      for color_name, color_value in $colors
        &.vi-button--{color_name}
          color color_value
          border-color currentColor

          if color_name == light-grey
            &.vi-button--active,
            &:hover
              color $mild-grey

          else if color_name == 'grey'
            &.vi-button--active,
            &:hover
              color $dark-grey

          else
            &.vi-button--active,
            &:hover
              background color_value
              color white

    &--text
      background none !important
      border-color transparent !important
      min-width 0

      .vi-button__content
        padding-left 0
        padding-right 0

      for color_name, color_value in $colors
        &.vi-button--{color_name}
          color color_value

          .vi-icon
            color inherit

          if color_name == light-grey
            &.vi-button--active,
            &:hover
              color $dark-grey

          else if color_name == 'grey'
            &.vi-button--active,
            &:hover
              color $dark-grey

          else
            &.vi-button--active,
            &:hover
              color lighten(color_value, 25%)

    // TODO: come back later (now just support default color)
    &--flat
      &.vi-button
        background none
        border-color transparent

        &:hover, &.vi-button--active
          color $dark-grey
          background rgba(0, 0, 0, 0.05)

      &.vi-button--dark
        &:hover, .vi-menu__activator--active &
          background rgba(255,255,255,0.3)

    &--large
      height: 50px

      &.vi-button--icon
        width: 50px
        height: 50px

    &--small
      height: 24px

      &.vi-button--icon
        width: 50px
        height: 50px

    &--round
      border-radius 500em

    &--lowercase
      text-transform none

    &--float
      box-shadow $shadow-2

    &--raise
      &.vi-button--active,
      &:hover,
      &:focus
        box-shadow $shadow-2

    &--icon
      background: transparent
      box-shadow: none !important
      border-radius: 50%
      justify-content: center
      min-width: 0
      width: 40px
      height: 40px

      .vi-button__content
        padding 0

    .vi-icon
      &--left
        margin-right 6px

      &--right
        margin-left 6px

</style>
