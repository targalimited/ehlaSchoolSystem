<template>
  <vi-dialog :value="true" width="400">
    <vi-card>
      preview
    </vi-card>
  </vi-dialog>
</template>

<script>
  export default {
    name: 'preview-dialog',

    props: ['selected'],

    methods: {
      onSubmit () {
        this.$close(this.newSelected)
      }
    },

    created () {
//      if (Array.isArray(this.newSelected)) {
//        this.newSelected = this.selected
//      }
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
</style>
