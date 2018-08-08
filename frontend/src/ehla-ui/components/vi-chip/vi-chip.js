export default {
  name: 'vi-chip',

  props: {
    removable: {
      type: Boolean,
      default: false
    },
    prepend: {
      type: String
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    color: {
      type: String
    },
    error: {
      type: Boolean,
      default: false
    }
  },

  render (h) {
    const children = []
    children.push(h('span', {
      staticClass: 'vi-chip__content'
    }, this.$slots.default))
    if (this.removable) {
      const icon = h('vi-icon', {
        nativeOn: {
          click: e => {
            e.stopPropagation()
            this.$emit('remove')
          }
        },
        props: {
          name: 'clear'
        }
      })
      children.push(h('div', {
        staticClass: 'vi-chip__clear'
      }, [icon]))
    }

    if (this.prepend) {
      const prepend = this.$createElement('span', {
        staticClass: 'vi-chip__prepend'
      }, this.prepend)
      children.unshift(prepend)
    }

    return h('div', {
      staticClass: 'vi-chip',
      class: {
        'vi-chip--removable': this.removable,
        'vi-chip--small': this.small,
        'vi-chip--large': this.large,
        'vi-chip--text': this.text,
        'vi-chip--outline': this.outline,
        'vi-chip--error': this.error,
        ['vi-chip--' + this.color]: this.color
      },
    }, children)
  }
}
