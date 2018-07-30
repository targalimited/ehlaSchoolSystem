<template lang="pug">
  vi-row.asmt-item
    .asmt-item__l
      vi-avatar(:size="100") Ts
    .asmt-item__r
      .asmt-item__title Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, suscipit?
      span.asmt-item__date 23 JUL
      div.asmt-item__meta 16/20
      vi-button edit
</template>

<script lang="stylus">
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


</script>
