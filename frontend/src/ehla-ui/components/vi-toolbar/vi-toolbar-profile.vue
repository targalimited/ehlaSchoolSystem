<template>
  <div class="vi-toolbar-avatar">
    <vi-avatar :size="30">
      <img :src="imageUrl" :alt="name">
    </vi-avatar>
    <div class="vi-toolbar-avatar__name">
      {{name}}
    </div>
  </div>
</template>

<script>
  import ViAvatar from '../vi-avatar'
  export default {
    name: 'vi-toolbar-avatar',
    component: {
      ViAvatar
    },
    props: ['name', 'imageUrl']
  }
</script>

<style lang="stylus">
  @import '../../stylus/settings.styl'

  .vi-toolbar-avatar
    display inline-flex
    align-items center
    font-size 14px
    color #4a4a4a
    line-height 1
    padding 0 10px

    &__name
      padding-left 6px
</style>
