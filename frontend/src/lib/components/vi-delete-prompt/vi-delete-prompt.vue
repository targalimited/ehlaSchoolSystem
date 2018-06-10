<template>
  <vi-dialog v-model="visible" width="450" content-class="vi-message-box">

    <vi-card>

      <vi-card-content>

        <vi-item>

          <vi-item-action class="pr-24">
            <vi-icon name="alert-circular" size="56" color="brand"/>
          </vi-item-action>

          <vi-item-content v-html="message"/>
        </vi-item>

        <vi-divider/>

        <div class="center-text mb-16">Type "DELETE" to confirm</div>

        <!-- TODO: autofocus -->
        <vi-input v-model="deletePassCode" placeholder="Type here"/>

        <vi-row justify-center pt-16>
          <vi-input-error class="text-align-center" v-if="showReminder">Please input the text as it is displayed (case sensitive).</vi-input-error>
        </vi-row>

        <vi-divider/>

        <vi-button-row>
          <vi-button size="135" @click="cancel" primary>Cancel</vi-button>
          <vi-button size="135" @click="confirm" :disabled="!valid">Yes, Delete</vi-button>
        </vi-button-row>
      </vi-card-content>
    </vi-card>
  </vi-dialog>
</template>

<script>
import ViDialog from '../vi-dialog'
import {ViCard, ViCardContent} from '../vi-card'
import {ViItem, ViItemContent, ViItemAction} from "../vi-item";
import ViInput from '../vi-input'
import ViIcon from '../vi-icon'
import {ViRow} from "../vi-grid";
import {ViButton, ViButtonRow} from '../vi-button'

export default {
  name: 'vi-message-box',

  components: {
    ViDialog, ViCard, ViCardContent, ViItem, ViItemContent, ViItemAction, ViInput, ViIcon, ViRow, ViButton, ViButtonRow
  },

  data () {
    return {
      callback: null,
      deletePassCode: '',
      message: '',
      visible: false
    }
  },

  methods: {
    confirm () {
      // TODO: callback after transition end
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
  },

  computed: {
    valid () {
      return this.deletePassCode.trim() === 'DELETE'
    },
    showReminder () {
      return this.deletePassCode.trim() === 'delete'
    }
  }
}
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'

  .vi-message-box

    .center-text
      text-align center
      font-size 14px

    .vi-input__inner
      text-align center
</style>
