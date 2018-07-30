<template>
  <div class="vi-avatar" :style="styles" :class="classes">
    <div v-if="border && !color" class="vi-avatar__border"></div>
    <div class="vi-avatar__img" v-if="src" :style="{'background-image': `url(${this.src})`}"></div>
    <slot v-else></slot>
  </div>
</template>

<script>
  export default {
    name: 'vi-avatar',

    props: {
      size: {
        type: Number | String,
        default: 50
      },
      border: {
        type: Boolean,
        default: true
      },
      src: {
        type: String,
        required: false
      },
      color: {
        type: String,
        required: false
      }
    },

    computed: {
      classes () {
        return {
          [`vi-avatar--${this.color}`]: this.color
        }
      },
      styles () {
        if (this.size === 50) return false
        return {
          'width': `${this.size}px`,
          'height': `${this.size}px`
        }
      }
    }
  }
</script>
