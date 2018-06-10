<template>
  <div class="vi-no-data" :class="{'vi-no-data--small': small}">
    <vi-icon :size="iconSize" v-if="icon" :name="icon"/>
    <div v-if="title" class="vi-no-data__title">{{title}}</div>
    <div class="vi-no-data__content">
      <slot>
        <template v-if="content">{{content}}</template>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vi-no-data',
  props: {
    icon: {
      type: String
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    iconSize: {
      default: 80
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'

  .vi-no-data
    display inline-block
    margin 0 auto
    color $light-grey
    line-height 1.2
    text-align center

    > .vi-icon
      margin-bottom 10px
      color $light-grey


    &__title
      font-size 24px
      font-weight bold

    &__content
      font-size 14px
      margin-top 10px

    &--small
      .vi-no-data__title
        font-size 14px

      .vi-no-data__content
        margin-top 4px
</style>
