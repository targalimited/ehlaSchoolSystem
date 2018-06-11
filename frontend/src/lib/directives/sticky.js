/* eslint-disable */

let listenAction
let onResize

/**
 * How to use it properly:
 * Child element - Must include one single child element in this directive which will be assigned position: fixed
 * Parent element - This plugin will not add any inline style to the parent, so you could apply any style to it,
 * i.e. absolute position, no worries, it won't be override by this plugin.
 * However just one rules for the parent - do not include padding space (which will not be reserved). Use margin.
 * There is also a footer property which allows you to hide the sticky when it overlap with the footer
 */

export default {
  inserted(el, binding) {
    const params = binding.value || {}
    const offset = params.offset || 0
    const footerOffset = params.footerOffset || 0
    const zIndex = params.zIndex || 1000
    let footer
    let child = el.firstElementChild
    let childStyle
    let active = false

    if (getComputedStyle(el, null).getPropertyValue('padding') !== '0px') {
      console.log('warning! padding space will not be reserved during sticky, use margin instead')
    }

    if (!child) {
      // we must only manipulate the child element but not the original element to be fixed
      // otherwise we will loose the ref to resize the width of the sticky element properly when resizing the browser
      console.log('you must hav a child element inside this directive to work')
      return
    } else {
      childStyle = el.firstElementChild.style

      if (el.children.length > 1) {
        console.log('you should only contain one child element inside this directive, only the first element will be sticky')
      }
    }

    // locate the footer if params is given
    if (params.footer && typeof params.footer === 'string') {
      footer = document.querySelector(params.footer)
      if (!footer) {
        console.log(`unable to locate target ${params.footer}`)
      } else {
        childStyle.transition = 'opacity 0.2s'
      }
    }

    const sticky = () => {
      if (active) return
      active = true
      // add a class if sticky is active
      el.classList.add('vi-sticky--active')
      const rect = el.getBoundingClientRect()
      childStyle.left = rect.left + 'px'
      childStyle.width = rect.width + 'px'
      childStyle.top = offset + 'px'
      // childStyle.height = rect.height + 'px' // TODO: do we need height here?
      childStyle.position = 'fixed'
      childStyle.zIndex = zIndex
      el.style.height = rect.height + 'px'
    }

    const reset = () => {
      if (!active) return
      active = false
      el.classList.remove('vi-sticky--active')
      childStyle.left = null
      childStyle.width = null
      childStyle.top = null
      childStyle.position = 'static'
      el.style.height = null
    }

    const hide = () => {
      childStyle.opacity = '0'
    }

    const show = () => {
      childStyle.opacity = '1'
    }

    const isTouchingFooter = () => {
      if (!footer || !active) return

      const childRect = child.getBoundingClientRect()
      const footerToTop = footer.getBoundingClientRect().top
      const elToTop = childRect.top + childRect.height
      return elToTop + footerOffset >= footerToTop
    }

    const check = () => {
      const offsetTop = el.getBoundingClientRect().top

      // when parent element has display:none (where offsetTop would be 0)
      // don't run sticky function
      if (offsetTop === 0) return

      if (offsetTop <= offset) {
        sticky()
        if (isTouchingFooter()) hide()
        else show()
      } else {
        reset()
      }
    }

    listenAction = () => {
      if(!window.requestAnimationFrame){
        return setTimeout(check, 16)
      }

      window.requestAnimationFrame(check)
    }

    onResize = () => {
      active = false
      listenAction()
    }

    window.addEventListener('scroll', listenAction)
    window.addEventListener('resize', onResize)
  },

  unbind() {
    window.removeEventListener('scroll', listenAction)
    window.removeEventListener('resize', onResize)
  }
}
