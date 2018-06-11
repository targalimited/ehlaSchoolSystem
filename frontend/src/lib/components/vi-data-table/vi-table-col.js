export default {
  name: 'vi-table-col',

  props: ['width'],

  render (h) {
    const data = {
      staticClass: 'vi-table__col',
      style: {
        width: this.width
      }
    }
    return h('div', data, this.$slots.default)
  }
}
