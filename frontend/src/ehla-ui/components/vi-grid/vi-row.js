export default {
  functional: true,

  name: 'vi-row',

  render (h, {data, children}) {
    data.staticClass = (`vi-row ${data.staticClass || ''}`).trim()

    if (data.attrs) {
      const classes = Object.keys(data.attrs).filter(key => {
        // TODO: Remove once resolved
        // https://github.com/vuejs/vue/issues/7841
        if (key === 'slot') return false

        const value = data.attrs[key]
        return value || typeof value === 'string'
      })

      if (classes.length) data.staticClass += ` ${classes.join(' ')}`
      delete data.attrs
    }

    const firstChild = children[0] || {}
    const childData = firstChild.data || {}
    const staticClass = childData.staticClass || []
    if (staticClass.indexOf('vi-col') !== -1) {
      data.staticClass += ' vi-row--has-col'
    }

    return h('div', data, children)
  }
}
