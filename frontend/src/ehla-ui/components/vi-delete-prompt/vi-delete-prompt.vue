<template>
  <vi-dialog :value="true" width="450" content-class="vi-delete-prompt" persistent>

    <vi-card>

      <vi-card-content class="vi-card__content--relax">

        <!-- TODO: do we need to conditionally align center vs flex-start?-->
        <vi-item style="height: auto; align-items: flex-start;">

          <vi-item-action class="pr-24">
            <vi-icon name="alert-circular" size="56" color="brand"/>
          </vi-item-action>

          <vi-item-content v-html="message"/>
        </vi-item>

        <vi-divider/>

        <div class="center-text mb-16">Type "DELETE" to confirm</div>

        <!-- TODO: autofocus -->
        <vi-input @blur="validate" v-model="deletePassCode" placeholder="Type here" :error="showReminder"/>

        <vi-row justify-center pt-16>
          <vi-input-error class="text-align-center" v-if="showReminder">Please input the text as it is displayed (case sensitive).</vi-input-error>
        </vi-row>

        <vi-divider/>

        <vi-button-row>
          <vi-button size="135" @click="$close(false)" primary>Cancel</vi-button>
          <vi-button size="135" @click="$close(true)" :disabled="!valid">Yes, Delete</vi-button>
        </vi-button-row>
      </vi-card-content>
    </vi-card>
  </vi-dialog>
</template>

<script>
  export default {
    name: 'vi-delete-prompt',

    props: ['message'],

    data () {
      return {
        deletePassCode: '',
        showReminder: false
      }
    },

    methods: {
      validate () {
        if (!this.valid) this.showReminder = true
      }
    },

    computed: {
      valid () {
        return this.deletePassCode.trim() === 'DELETE'
      }
    },

    watch: {
      deletePassCode (v) {
        if (v.trim() === 'delete' || v.trim() === 'Delete') this.showReminder = true
        if (v.trim() === 'DELETE') this.showReminder = false
      }
    }
  }
</script>
