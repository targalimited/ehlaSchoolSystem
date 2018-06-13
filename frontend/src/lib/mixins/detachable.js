function validateAttachTarget (val) {
  const type = typeof val

  if (type === 'boolean' || type === 'string') return true

  return val.nodeType === Node.ELEMENT_NODE
}

export default {
  name: 'detachable',

  data: () => ({
    hasDetached: false
  }),

  props: {
    attach: {
      type: null,
      default: false,
      validator: validateAttachTarget
    },
    contentClass: {
      default: ''
    },
    noDetach: {
      type: Boolean,
      default: false
    }
  },

  mounted () {
    this.initDetach()
  },

  beforeDestroy () {
    if (!this.$refs.content) return

    // IE11 Fix
    try {
      this.$refs.content.parentNode.removeChild(this.$refs.content)
    } catch (e) {}
  },

  methods: {
    initDetach () {
      if (this._isDestroyed ||
        !this.$refs.content ||
        this.noDetach ||
        this.hasDetached ||
        // Leave menu in place if attached
        // and dev has not changed target
        this.attach === '' || // If used as a boolean prop (<v-menu attach>)
        this.attach === true || // If bound to a boolean (<v-menu :attach="true">)
        this.attach === 'attach' // If bound as boolean prop in pug (v-menu(attach))
      ) return

      let target
      if (this.attach === false) {
        // Default, detach to app
        target = document.querySelector('[data-app]') || document.body // TODO: should rm .body
      } else if (typeof this.attach === 'string') {
        // CSS selector
        target = document.querySelector(this.attach)
      } else {
        // DOM Element
        target = this.attach
      }

      if (!target) {
        console.log(`Unable to locate target ${this.attach || '[data-app]'}`, this)
        return
      }

      target.insertBefore(
        this.$refs.content,
        target.firstChild
      )

      this.hasDetached = true
    }
  }
}