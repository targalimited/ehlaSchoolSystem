export function createSimpleFunctional (c, el = 'div', name) {
  name = name || c.replace(/__/g, '-')

  return {
    name: `v-${name}`,
    functional: true,

    render: (h, { data, children }) => {
      data.staticClass = (`${c} ${data.staticClass || ''}`).trim()

      return h(el, data, children)
    }
  }
}

export function filterObjectOnKeys (obj, keys) {
  const filtered = {}

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (typeof obj[key] !== 'undefined') {
      filtered[key] = obj[key]
    }
  }

  return filtered
}

export function getPadNumber (number) {
  return ('00' + number).slice(-2)
}

export function addOnceEventListener (el, event, cb) {
  var once = () => {
    cb()
    el.removeEventListener(event, once, false)
  }

  el.addEventListener(event, once, false)
}

export function getObjectValueByPath (obj, path) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (!path || path.constructor !== String) return
  path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  path = path.replace(/^\./, '') // strip a leading dot
  const a = path.split('.')
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i]
    if (obj instanceof Object && k in obj) {
      obj = obj[k]
    } else {
      return
    }
  }
  return obj
}

export function isMobileFactory () {
  if (typeof window === 'undefined') return false

  const testExp = new RegExp('Android|webOS|iPhone|iPad|' +
    'BlackBerry|Windows Phone|'  +
    'Opera Mini|IEMobile|Mobile' ,
    'i');

  return testExp.test(navigator.userAgent)
}

const isMobile = isMobileFactory()
export {isMobile}
