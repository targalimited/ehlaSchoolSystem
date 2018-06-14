<template>
  <vi-dialog :value="true" width="600" content-class="preview-dialog">
    <vi-card-content>
      <div v-if="content.success">
        <p>Update Passwrod success</p>
      </div>
      <div v-if="!content.success">
        <p>Update Passwrod fail, please try again</p>
      </div>
    </vi-card-content>
  </vi-dialog>
</template>

<script>
  export default {
    name: 'message-dialog',

    props: ['id'],

    data () {
      return {
      }
    },

    methods: {
      onSubmit () {
        // this.$close(this.newSelected)
      }
    },

    created () {
    }
  }
</script>

<style lang="stylus" scoped>
  .vi-button-row
    margin-top 24px

  .input-group
    margin-bottom 24px

  .vi-checkbox
    margin-bottom 16px

  .article
    padding 36px
    background #fafafa
</style>