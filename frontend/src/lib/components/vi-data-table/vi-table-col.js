export default {
  name: 'vi-table-col',

  inject: ['headers'],

  mounted () {
    var parent = this.$el.parentNode
    var childNodes = parent.children
    var child_index
    for (var i = 0; i < childNodes.length; ++i) {
      if (this.$el === childNodes[i]) {
        child_index = i
        break
      }
    }
    const header = this.headers[child_index]
    if (!header) return
    const align = header.align
    if (header.expand) this.$el.style.flex = 1
    if (header.width) this.$el.style.width = header.width
    if (align) this.$el.style.justifyContent = align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start'
  },

  render (h) {
    const data = {
      staticClass: 'vi-table__col'
    }
    return h('div', data, this.$slots.default)
  }
}
