<template>
  <transition name="slide-x-transition">
    <div v-show="isActive" class="vi-drawer">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  import Overlayable from '../../mixins/overlayable'
  export default {
    name: 'vi-drawer',

    mixins: [Overlayable],

    data () {
      return {
        isActive: this.value
      }
    },

    props: {
      value: {
        required: false
      }
    },

    watch: {
      isActive (val) {
        this.$emit('input', val)
        val ? this.genOverlay() : this.removeOverlay()
        this.$el.scrollTop = 0
      },
      value (val) {
        if (val !== this.isActive) this.isActive = val
      },
      $route () {
        this.isActive = false
      }
    }
  }
</script>

