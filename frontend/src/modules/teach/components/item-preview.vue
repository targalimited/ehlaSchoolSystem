<template lang="pug">
  .item-preview
    // Empty
    div(v-if="!itemId")
      vi-no-data(icon="shelf" title="Item Preview" content="Please select an item to preview")
    // Loading
    vi-spinner(v-else-if="!itemData")
    template(v-else)
      .item-preview__image(:style="{'background-image': `url(${itemData.thumbnail_path})`}")
      .item-preview__title {{itemData.name_en}}
      vi-spinner(v-if="!article")
      .item-preview__article(v-else v-html="article")
</template>

<script>
  export default {
    name: 'item-preview',

    props: ['itemId'],

    computed: {
      itemData () {
        if (!this.itemId) return null
        return this.$store.getters.getItemById(this.itemId)
      },
      html () {
        if (!(this.itemData && this.itemData.preview)) return
        return this.itemData.preview.preview_en
      },
      article () {
        if (!(this.itemData && this.itemData.preview)) return
        return this.itemData.preview.article || this.itemData.preview.article_web
      }
    },

    methods: {
      initFetch () {
        this.$store.dispatch('shelf/getPreview', {
          id: this.itemId
        })
      }
    },

    created () {
      this.initFetch()
    },

    watch: {
      itemId () {
        this.initFetch()
      }
    }
  }
</script>

<style lang="stylus">
  .item-preview
    &__title
      font-size 16px
      margin-bottom 16px
      font-weight bold

    &__article
      font-size 12px

    &__image
      height 140px
      background-size cover
      background-position center
      margin-bottom 16px
      border-radius 10px
</style>
