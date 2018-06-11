<template>
  <div @click="$emit('click')"
       class="vi-item"
       :style="styles"
       :class="classes">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'vi-item',
    props: {
      active: {
        default: false
      },
      divided: {
        default: false
      },
      avatar: Boolean,
      selectable: Boolean, // DEPRECATED - use link
      menuLink: Boolean, // DEPRECATED - use link='menu'
      link: {
        type: [Boolean, String],
        default: false
      },
      height: [String, Number],
      disabled: Boolean
    },
    computed: {
      isLink () {
        return !!this.$listeners.click
      },
      classes () {
        const classes = {
          'vi-item--icon': this.icon,
          'vi-item--avatar': this.avatar,
          'vi-item--link': this.link,
          'vi-item--active': this.active,
          'vi-item--divided': this.divided,
          'vi-item--selectable': this.selectable,
          'vi-item--menu-link': this.menuLink,
          'vi-item--disabled': this.disabled,
        }
        if (this.link && typeof this.link === 'string') {
          classes[`vi-item--link-${this.link}`] = true
        }
        return classes
      },
      styles () {
        const styles = {}
        if (this.height) {
          styles.height = this.height === 'auto' ? 'auto' : this.height + 'px'
        }
        return styles
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'

  $width = 40px // the width of the avatar and action column

  .vi-item
    align-items: center
    color: inherit
    display: flex
    font-size: 14px
    font-weight: 400
    height: 40px
    margin: 0
    position: relative
    text-decoration: none
    transition: $transition
    user-select: none

    a
      text-decoration inherit
      color inherit

    &--avatar
      height 70px

      .vi-item__avatar
        width 70px

    &--disabled
      pointer-events none
      cursor default
      color $light-grey

    &--selectable
      cursor pointer
      padding: 0 16px

      &:hover
        background $grey-2

    &--menu-link
      cursor pointer
      padding: 0 16px

      &:hover
        color $brand

        .vi-icon
          color $brand

    &--link
      cursor pointer
      padding: 0 16px

      &:hover
        background $grey-2

      &-no-style
        &:hover
          background none

      &-float
        border-radius $border-radius

        &:hover
          box-shadow $shadow-2
          background none

      &-menu
        &:hover
          color $brand
          background none

          .vi-icon
            color $brand

    &--divided
      +not-last()
        border-bottom 1px solid $border-color

    &__content,
    &__action
      height: 100%

    &__title,
    &__sub-title
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      transition: $transition
      width: 100%

    &__title
      line-height 1.2
      color $dark-grey
      font-weight bold
      position: relative
      text-align: left

    &__sub-title
      line-height 1.2
      color $mild-grey
      padding-top 4px

    &__avatar
      display: flex
      justify-content: flex-start
      min-width $width - 8
      padding-right 8px
      flex-shrink 0

      .vi-icon
        // color $light-grey

    &__action
      display: flex
      justify-content: flex-start
      min-width $width - 8
      padding-right 8px
      align-items: center
      flex-shrink 0

    &__content
      text-align: left
      flex: 1 1 auto
      overflow: hidden
      display: flex
      align-items: flex-start
      justify-content: center
      flex-direction: column

      ~ .vi-item__avatar
        justify-content: flex-end

      ~ .vi-item__action
        justify-content: flex-end
        padding-right 0

  .vi-item-divider
    background $border-color
    height 1px
    display block
    margin 12px 20px
</style>
