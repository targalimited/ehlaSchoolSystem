export default {
  name: 'vi-col',

  render (h) {
    return h('div', {
      staticClass: 'vi-col'
    }, this.$slots.default)
  }
}
