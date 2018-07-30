<template>
  <div class="vi-expansion-panel" :class="classes">
    <div class="vi-expansion-panel__header" @click="isActive = !isActive">
      <slot name="header" :isActive="isActive"></slot>
      <vi-icon v-if="!minimal" class="header-icon" size="10" :rotate180="isActive" name="down"></vi-icon>
    </div>

    <vi-expand-transition>
      <div v-show="isActive">
        <div class="vi-expansion-panel__body">
          <slot></slot>
        </div>
      </div>
    </vi-expand-transition>

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
