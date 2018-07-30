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
          styles.height = this.height + 'px'
        }
        return styles
      }
    }
  }
</script>
