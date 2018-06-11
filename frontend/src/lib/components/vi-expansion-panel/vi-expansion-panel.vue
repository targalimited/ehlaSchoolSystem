<template>
  <div class="vi-expansion-panel" :class="classes">
    <div class="vi-expansion-panel__header" @click="isActive = !isActive">
      <slot name="header" :isActive="isActive"></slot>
      <vi-icon v-if="!minimal" class="header-icon" size="10" :rotate180="isActive" name="down"></vi-icon>
    </div>
    <div class="vi-expansion-panel__body">
      <vi-expand-transition>
        <div v-show="isActive">
          <slot></slot>
        </div>
      </vi-expand-transition>
    </div>
  </div>
</template>

<script>
  import {ViExpandTransition} from '../transitions'
  import ViIcon from '../vi-icon'
  import '../vi-icon/collection/navigation/down'
  import Toggleable from '../../mixins/toggleable'
  export default {
    name: 'vi-expansion-panel',

    components: {
      ViExpandTransition, ViIcon
    },

    mixins: [Toggleable],

    props: {
      // turn on this option is you dont want any default styling
      minimal: {
        default: false
      }
    },

    computed: {
      classes () {
        return {
          'vi-expansion-panel--active': this.isActive,
          'vi-expansion-panel--minimal': this.minimal
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'

  .vi-expansion-panel:not(.vi-expansion-panel--minimal)

    .vi-expansion-panel__header
      cursor pointer
      display flex
      align-items center
      padding 10px 20px
      font-size 20px

      >:not(.header-icon)
        flex 1

      >.header-icon
        margin-left 10px

      &:hover
        color $brand

    .vi-expansion-panel__body
      padding 10px 20px
</style>
