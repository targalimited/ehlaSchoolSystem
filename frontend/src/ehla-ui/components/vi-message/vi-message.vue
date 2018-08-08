<template>
  <transition name="slide-y-reverse-transition">
    <div v-show="visible" class="vi-message" :class="classes">
      <div class="vi-message__icon">
        <vi-icon size="18" :name="iconName"/>
      </div>
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

    // TODO: for the workaround way - message and type are as props, should be data
    props: {
      message: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'warning'
      }
    },

    data () {
      return {
        visible: false,
        duration: 3000,
        timer: null,
        position: 'top'
      }
    },

    computed: {
      classes () {
        return {
          [`vi-message--${position}`]: true,
          [`vi-message--${type}`]: true
        }
      },
      iconName () {
        const map = {
          'success': 'done',
          'warning': 'alert-circular',
          'error': 'clear'
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
      requestAnimationFrame(() => {
        this.$el.style.marginLeft = - (this.$el.clientWidth / 2) + 'px'
      })
      this.startTimer()
    }
  }
</script>
