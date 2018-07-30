<template>
  <vi-dialog :value="true" width="444" content-class="vi-message-box" persistent>

    <vi-card>

      <vi-card-content class="vi-card__content--relax">

        <!-- TODO: do we need to conditionally align center vs flex-start?-->
        <vi-item style="height: auto; align-items: flex-start">

          <vi-item-action class="pr-24">
            <vi-icon name="alert-circular" size="56" color="brand"/>
          </vi-item-action>

          <vi-item-content>
            <vi-item-title v-if="title" v-html="title"/>
            <div v-if="content" v-html="content"/>
          </vi-item-content>
        </vi-item>

        <vi-button-row class="mt-24">
          <vi-button v-if="cancel" @click="$close(false)" :primary="reverse">{{cancel}}</vi-button>
          <vi-button @click="$close(true)" :primary="!reverse">{{confirm}}</vi-button>
        </vi-button-row>
      </vi-card-content>
    </vi-card>
  </vi-dialog>
</template>

<script>
  export default {
    name: 'vi-message-box',

    props: {
      title: '',
      content: '',
      cancel: {
        default: 'Cancel'
      },
      confirm: {
        default: 'Confirm'
      },
      reverse: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
