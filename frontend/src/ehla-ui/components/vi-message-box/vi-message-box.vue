<template>
  <vi-dialog v-model="visible" width="450" content-class="vi-message-box">

    <vi-card>

      <vi-card-content>

        <vi-item>

          <vi-item-action class="pr-24">
            <vi-icon name="alert-circular" size="56" color="brand"/>
          </vi-item-action>

          <vi-item-content>
            <vi-item-title v-if="title" v-html="title"/>
            <div v-if="message" v-html="message"/>
          </vi-item-content>
        </vi-item>

        <vi-button-row>
          <vi-button v-if="cancel" @click="cancel" primary>{{cancelText}}</vi-button>
          <vi-button @click="confirm">{{confirmText}}</vi-button>
        </vi-button-row>
      </vi-card-content>
    </vi-card>
  </vi-dialog>
</template>

<script>
  export default {
    name: 'vi-message-box',

    data () {
      return {
        visible: false,
        callback: null,
        title: '',
        message: '',
        cancelText: 'Cancel',
        confirmText: 'Confirm'
      }
    },

    methods: {
      confirm () {
        this.callback('confirm')
        this.destroy()
      },
      cancel () {
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

<style lang="stylus">


  .vi-message-box

    .center-text
      text-align center
      font-size 14px

    .vi-input__inner
      text-align center
</style>
