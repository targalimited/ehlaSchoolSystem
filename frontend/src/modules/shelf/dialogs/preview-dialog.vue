<template>
  <vi-dialog :value="true" width="600" content-class="preview-dialog">
    <vi-tabs :border="true">
      <vi-tab name="Preview">
        <div ref="html" v-if="html" v-html="html"></div>
      </vi-tab>
      <vi-tab name="Article">
        <div class="article" v-html="article"></div>
      </vi-tab>
    </vi-tabs>
    <vi-button-row>
      <vi-button @click="close">close</vi-button>
    </vi-button-row>
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
      close () {
        // TODO stop all the videos playing
        this.$destroy()
        // this.$close()
      }
    },

    created () {
      this.$store.dispatch('shelf/getPreview', {
        id: this.id
      }).then(res => {
        this.html = res.preview_en
        this.article = res.article || res.article_web
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .vi-button-row
    padding 16px

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

    table span
      font-size 14px

    /*div*/
      /*padding-left 0*/

  .preview-dialog .vi-tabs__list
    padding 0 24px !important
</style>
