<template>
  <vi-dialog :value="true" width="600">
    <vi-tabs>
      <vi-tab name="Preview">
        <div v-if="html" v-html="html.preview_en"></div>
      </vi-tab>
      <vi-tab name="Reading">
        reading
      </vi-tab>
    </vi-tabs>
  </vi-dialog>
</template>

<script>
  export default {
    name: 'preview-dialog',

    props: ['id'],

    data () {
      return {
        html: null,
        article: null
      }
    },

    methods: {
      onSubmit () {
        this.$close(this.newSelected)
      }
    },

    created () {
//      this.$store.dispatch('shelf/getReadingDetails', {
//        id: this.id
//      }).then(res => {
//        this.html = res
//      })
      // TODO
      this.$store.dispatch('shelf/getPreview', {
        id: this.id
      }).then(res => {
        console.log(res)
        this.html = res
      })
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
