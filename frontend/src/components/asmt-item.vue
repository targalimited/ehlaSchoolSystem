<template lang="pug">
  vi-row.asmt-item
    .asmt-item__l
      vi-avatar(:size="100" :src="asmtData.thumbnail_path")
    .asmt-item__r
      .asmt-item__title {{asmtData.item.name_en}}
      span.asmt-item__date {{asmtData.end_date | formatDate}}
      div.asmt-item__meta 16/20
      vi-button edit
</template>


<script>
  export default {
    name: 'asmt-item',

    props: {
      asmtData: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus">
  @import '../project-ui/stylus/settings.styl'
  .asmt-item
    padding 16px
    border-bottom 1px solid $border-color

    &__r
      margin-left 8px

    &__title
      font-weight bold
      font-size 16px
      line-height 1.2

    &__date
      color $red
      font-size 12px
</style>
