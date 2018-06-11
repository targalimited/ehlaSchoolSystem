export default {
  name: 'vi-chip',

  props: {
    removable: Boolean,
    prepend: String,
    small: Boolean,
    outline: Boolean,
    text: Boolean,
    color: String,
    error: Boolean
  },

  render (h) {
    const children = []
    children.push(h('span', {
      staticClass: 'vi-chip__content'
    }, this.$slots.default))
    if (this.removable) {
      const icon = h('vi-icon', {
        staticClass: 'vi-chip__clear',
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
      children.push(icon)
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
        'vi-chip--text': this.text,
        'vi-chip--outline': this.outline,
        'vi-chip--error': this.error,
        ['vi-chip--' + this.color]: this.color
      },
    }, children)
  }
}
