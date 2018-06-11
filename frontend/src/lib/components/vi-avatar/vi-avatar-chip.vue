<template>
  <div class="vi-avatar-chip">
    <div @click="$emit('click')" v-if="closable">
      <vi-close-button/>
    </div>
    <vi-avatar>
      <img :src="imageUrl">
    </vi-avatar>
    <div class="vi-avatar-chip__name">{{name}}</div>
  </div>
</template>

<script>
  import ViAvatar from './vi-avatar'
  import {ViCloseButton} from '../vi-button'
  export default {
    name: 'vi-avatar-chip',
    components: { ViAvatar, ViCloseButton },
    props: {
      name: String,
      imageUrl: String,
      closable: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'
  .vi-avatar-chip
    display inline-block
    position relative
    text-align center
    margin 0 6px

    .vi-close-button
      position absolute
      top -4px
      right -4px
      line-height 1

    &__name
      width 60px
      font-size 12px
      line-height 1.2
      color dark-grey
      margin-top 8px
      text-overflow()
</style>
