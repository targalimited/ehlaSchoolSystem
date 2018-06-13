<template>
  <vi-dialog :value="true" width="600" content-class="preview-dialog">
    <vi-tabs :border="true">
      <vi-tab name="Preview">
        <div v-if="html" v-html="html"></div>
      </vi-tab>
      <vi-tab name="Article">
        <div class="article">{{article}}</div>
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
      this.$store.dispatch('shelf/getPreview', {
        id: this.id
      }).then(res => {
        this.html = res.preview_en
        this.article = res.article
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

  .article
    padding 36px
    background #fafafa
</style>

<style lang="stylus">
  .preview-dialog
    min-height 500px

  .preview-dialog .vi-tabs__list
    padding 0 24px !important
</style>
