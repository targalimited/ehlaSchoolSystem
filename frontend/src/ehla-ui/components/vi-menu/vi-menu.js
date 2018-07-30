import Delayable from '../../mixins/delayable'
import Toggleable from '../../mixins/toggleable'
import Detachable from '../../mixins/detachable'
import Menuable from '../../mixins/menuable'
import ClickOutside from '../../directives/click-outside'

import Generators from './menu-generator'

/**
 * overview of how this menu work:
 * isActive (from toggleable.js) - that is watched in turn to modify isContentActive
 * isContentActive (menuable.js) - control visibility of the menu
 * event from 'click activator', 'click outside' will toggle isActive which trigger the above
 * activate() deactivate() is the methods to open and close the menu
 * note that the use of requestAnimationFrame to make isContentActive become true, otherwise the menu will 'fly'
 */

export default {
  name: 'vi-menu',

  mixins: [Delayable, Toggleable, Detachable, Menuable, Generators],

  directives: {ClickOutside},

  props: {
    closeOnClick: {
      type: Boolean,
      default: true
    },
    closeOnContentClick: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    fullWidth: Boolean,
    maxHeight: { default: '300' },
    offsetX: Boolean,
    offsetY: {
      type: Boolean,
      default: true
    },
    openOnClick: {
      type: Boolean,
      default: true
    },
    // TODO there is a known bug not yet fixed (when the mouse nav from the menu back to activator, the menu will close which should not)
    openOnHover: {
      type: Boolean,
      default: false
    },
    origin: {
      type: String,
      default: 'top left'
    },
    transition: {
      type: [Boolean, String],
      default: 'slide-y-transition'
    }
  },

  computed: {
    calculatedLeft () {
      return this.calcLeft()
    },
    calculatedTop () {
      return this.calcTop()
    },
    calculatedMaxHeight () {
      return isNaN(this.maxHeight)
        ? this.maxHeight
        : `${this.maxHeight}px`
    },
    calculatedMaxWidth () {
      return isNaN(this.maxWidth)
        ? this.maxWidth
        : `${this.maxWidth}px`
    },
    calculatedMinWidth () {
      if (this.minWidth) {
        return isNaN(this.minWidth)
          ? this.minWidth
          : `${this.minWidth}px`
      }

      const minWidth = (
        this.dimensions.activator.width +
        this.nudgeWidth +
        (this.auto ? 16 : 0)
      )

      const calculatedMaxWidth = isNaN(parseInt(this.calculatedMaxWidth))
        ? minWidth
        : parseInt(this.calculatedMaxWidth)

      return `${Math.min(
        calculatedMaxWidth,
        minWidth
      )}px`
    },
    styles () {
      return {
        maxHeight: this.calculatedMaxHeight,
        minWidth: this.calculatedMinWidth,
        maxWidth: this.calculatedMaxWidth,
        top: this.calculatedTop,
        left: this.calculatedLeft,
        transformOrigin: this.origin,
        zIndex: this.zIndex || this.activeZIndex
      }
    }
  },

  methods: {
    activate () {
      this.updateDimensions()
      requestAnimationFrame(this.startTransition)
    },
    deactivate () {
      // TODO: otherwise cannot open after the the menu is closed by clicking on activator
      this.isActive = false
      this.isContentActive = false
    },
    activatorClickHandler (e) {
      if (this.disabled) return
      if (this.openOnClick && !this.isActive) {
        e.stopPropagation()
        this.isActive = true
      } else if (this.closeOnClick && this.isActive) {
        this.getActivator().blur()
        this.deactivate()
      }
    },
    mouseEnterHandler () {
      this.updateDimensions()
      this.isActive = true
    },
    mouseLeaveHandler (e) {
      this.runDelay('close', () => {
        if (this.$refs.content.contains(e.relatedTarget)) return

        requestAnimationFrame(() => {
          this.isActive = false
        })
      })
    },
    closeConditional () {
      return this.isActive && this.closeOnClick
    },
  },

  render (h) {
    const data = {
      staticClass: 'vi-menu',
      class: {
        'menu--disabled': this.disabled
      },
      style: {
        display: this.fullWidth ? 'block' : 'inline-block'
      }
    }

    return h('div', data, [
      this.genActivator(),
      this.genTransition()
    ])
  }
}
