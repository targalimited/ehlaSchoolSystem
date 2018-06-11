import '../../stylus/components/_menus.styl'

import Delayable from '../../mixins/delayable'
import Toggleable from '../../mixins/toggleable'
import Detachable from '../../mixins/detachable'
import Menuable from '../../mixins/menuable'
import ClickOutside from '../../directives/click-outside'

import Generators from './menu-generator'

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
    activatorClickHandler (e) {
      if (this.openOnClick && !this.isActive) {
        e.stopPropagation()
        this.updateDimensions()
        // to get around the menu flying from the top right corner if opening for the first time
        setTimeout(() => {
          this.getActivator().focus()
          requestAnimationFrame(() => {
            this.isActive = true
          })
          this.absoluteX = e.clientX
          this.absoluteY = e.clientY
        }, 50)
      } else if (this.closeOnClick && this.isActive) {
        this.getActivator().blur()
        this.isActive = false
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
