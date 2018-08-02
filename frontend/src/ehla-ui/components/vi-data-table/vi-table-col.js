export default {
  name: 'vi-table-col',

  inject: ['headers'],

  methods: {
    setWidth () {
      var parent = this.$el.parentNode
      var childNodes = parent.children
      var child_index
      for (var i = 0; i < childNodes.length; ++i) {
        if (this.$el === childNodes[i]) {
          child_index = i
          break
        }
      }
      if (this.headers) {
        const header = this.headers[child_index]
        if (!header) return
        const align = header.align
        if (header.expand) {
          this.$el.style.flex = 1
          // otherwise will push the other column away in small screen
          this.$el.style.overflow = 'hidden'
        }
        if (header.width) this.$el.style.width = header.width
        if (align) this.$el.style.justifyContent = align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start'
      } else {
        this.$el.style.flex = 1
      }
    }
  },

  mounted () {
    if (this.headers) this.setWidth()
  },

  render (h) {
    const data = {
      staticClass: 'vi-table__col'
    }
    return h('div', data, this.$slots.default)
  },

  watch: {
    headers () {
      if (this.headers) this.setWidth()
    }
  }
}
