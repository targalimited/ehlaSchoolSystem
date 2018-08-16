<template>
  <button @click="onClick" class="vi-button" :style="computedStyle" :class="computedClasses" :disabled="disabled">
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
      outline: [Boolean, String],
      text: [Boolean, String],
      flat: Boolean,
      icon: Boolean,
      round: Boolean,
      float: Boolean,
      disabled: Boolean,
      loading: Boolean,
      lowercase: Boolean,
      large: Boolean,
      small: Boolean,
      size: [String, Number],
      active: Boolean,
      dark: Boolean
    },
    computed: {
      computedClasses () {
        return {
          'vi-button--outline': this.outline,
          [`vi-button--outline-${this.outline}`]: typeof this.outline === 'string',
          [`vi-button--text-${this.text}`]: typeof this.text === 'string',
          'vi-button--text': this.text,
          'vi-button--fill': (!this.text && !this.outline && this.color && !this.flat) || this.primary,
          'vi-button--flat': this.flat,
          'vi-button--round': this.round,
          'vi-button--raise': this.raise,
          'vi-button--float': this.float,
          'vi-button--disabled': this.disabled,
          'vi-button--active': this.active,
          'vi-button--lowercase': this.lowercase,
          'vi-button--large': this.large,
          'vi-button--small': this.small,
          'vi-button--icon': this.icon,
          'vi-button--dark': this.dark,
          ['vi-button--' + this.color]: !!this.color,
        }
      },
      computedStyle () {
        const style = {
          'width': `${this.size}px`
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
