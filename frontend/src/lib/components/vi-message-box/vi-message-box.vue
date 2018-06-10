<template>
  <vi-dialog :value="true" width="444" content-class="vi-message-box" persistent>

    <vi-card>

      <div class="vi-card-bar">
        <vi-icon name="alert-circular" size="26"/> {{title}}
      </div>

      <vi-card-content class="vi-card__content--relax">

        <vi-row align-center class="message-row">

          <vi-icon name="alert-circular" size="46" color="brand"/>

          <p v-if="message" v-html="message"></p>
        </vi-row>

      </vi-card-content>

      <vi-button-row>
        <vi-button v-if="onCancel" @click="onCancel">{{cancel}}</vi-button>
        <vi-button @click="onConfirm" primary>{{confirm}}</vi-button>
      </vi-button-row>
    </vi-card>
  </vi-dialog>
</template>

<script>
  export default {
    name: 'vi-message-box',

    data () {
      return {
        title: '',
        message: '',
        cancel: '',
        confirm: ''
      }
    },

    methods: {
      onConfirm () {
        // TODO: callback after transition end
        this.callback('confirm')
        this.destroy()
      },
      onCancel () {
        this.callback('cancel')
        this.destroy()
      },
      destroy () {
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .vi-item__title + .vi-item__sub-title
    padding-top 8px

  .vi-button-row
    margin-top 24px
    padding 16px 32px
    border-top 1px solid #e1e1e1

  .vi-button
    min-width 120px

  .vi-card-bar
    background #009aec
    color #fff
    display flex
    height 50px
    padding 0 16px
    font-size 16px
    text-transform: uppercase
    align-items center
    font-weight bold

    .vi-icon
      color #fff
      margin-right 16px
      display none

  .message-row
    .vi-icon
      flex-shrink 0
      margin-right 16px
</style>
