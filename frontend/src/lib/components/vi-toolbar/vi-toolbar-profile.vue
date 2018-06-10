<template>
  <div class="vi-toolbar-avatar">
    <vi-avatar :size="30">
      <img v-if="imageUrl" :src="imageUrl" :alt="name">
      <vi-icon v-else name="avatar"/>
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
  @import '../../stylus/main.styl'

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
