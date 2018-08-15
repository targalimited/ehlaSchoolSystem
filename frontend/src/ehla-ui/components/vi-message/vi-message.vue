<template>
  <transition name="slide-x-reverse-transition">
    <div v-show="visible" class="vi-message" :class="classes">
      <vi-icon class="vi-message__icon" size="26" :name="iconName"/>
      <div class="vi-message__content">
        {{message}}
      </div>
    </div>
  </transition>
</template>

<script>
  import ViIcon from '../vi-icon'
  export default {
    components: {
      ViIcon
    },

    data () {
      return {
        visible: false,
        duration: 3000,
        timer: null,
        position: 'top',
        message: '',
        type: 'success'
      }
    },

    computed: {
      classes () {
        return {
          [`vi-message--${this.position}`]: true,
          [`vi-message--${this.type}`]: true
        }
      },
      iconName () {
        const map = {
          'success': 'done',
          'warning': 'alert-circular',
          'error': 'alert-circular'
        }
        return map[this.type]
      }
    },

    methods: {
      destroyElement() {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },

      close() {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      },

      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) this.close()
          }, this.duration);
        }
      }
    },

    mounted() {
      this.visible = true
      this.startTimer()
    }
  }
</script>
