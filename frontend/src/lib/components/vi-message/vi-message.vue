<template>
  <transition name="scale-transition">
    <div v-show="visible" class="vi-message"
         :class="{
         error: type !== 'success',
         top: position === 'top',
         center: position === 'center',
         bottom: position === 'bottom'
         }">
      <div class="vi-message__icon">
        <vi-icon size="16" :name="type === 'success' ? 'done' : 'clear'"/>
      </div>
      <div class="vi-message__content" v-if="message.length > 1">
        <p v-for="(item, index) in message" :key="index" v-html="item"></p>
      </div>
      <div class="vi-message__content" v-else v-html="message"></div>
    </div>
  </transition>
</template>

<script>
  import ViIcon from '../vi-icon'
  export default {
    components: {
      ViIcon
    },

    data() {
      return {
        visible: false,
        message: '',
        duration: 3000,
        type: 'success',
        timer: null,
        position: 'top'
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
  };
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'
  .vi-message
    flex-row 40px 20px
    background #68b100
    color white
    text-align center
    border-radius $border-radius
    box-shadow $shadow
    max-width 500px
    position fixed
    margin 0 auto
    padding 10px 20px
    left 50%
    transform: translateX(-50%)
    z-index 9999
    min-width 400px
    font-weight bold
    box-shadow 0 4px 20px -4px rgba(0,0,0,0.55)

    &__icon
      margin-right 8px

    &.error
      background #ff5252

    &.top
      top 20px

    &.bottom
      bottom 20px

    &.center
      top 50%
      transform translate3d(-50%, -50%, 0)


    .vi-message__content
      text-align left
</style>
