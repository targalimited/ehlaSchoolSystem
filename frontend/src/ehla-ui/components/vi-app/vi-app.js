// import '../../stylus/app.styl'
// eslint-disable-line no-unused-vars
export default {
  name: 'vi-app',

  render (h) {
    const data = {
      staticClass: 'application',
      attrs: { 'data-app': true }
    }

    return h('div', data, this.$slots.default)
  }
}
