import { addOnceEventListener } from '../../util/helper'

const eventHandlers = (duration) => {
  return {
    enter (el, done) {
      // Remove initial transition
      el.style.transition = 'none'
      addOnceEventListener(el, 'transitionend', done)

      // Get height that is to be scrolled
      el.style.overflow = 'hidden'
      el.style.height = null
      el.style.display = 'block'
      const height = `${el.clientHeight}px`
      el.style.height = 0
      el.style.transition = `height ${duration}s`

      setTimeout(() => (el.style.height = height), 50)
    },

    afterEnter (el) {
      el.style.height = 'auto'
      el.style.overflow = null
      el.style.transition = null
    },

    leave (el, done) {
      // Remove initial transition
      el.style.transition = 'none'
      addOnceEventListener(el, 'transitionend', done)

      // Set height before we transition to 0
      el.style.overflow = 'hidden'
      el.style.height = `${el.clientHeight}px`
      el.style.transition = `height ${duration}s`

      setTimeout(() => (el.style.height = 0), 50)
    },

    afterLeave (el) {
      el.style.transition = null
    }
  }
}

export default {
  functional: true,

  props: {
    css: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'in-out'
    },
    duration: {
      default: 0.3
    }
  },

  render (h, context) {
    const data = {
      props: {
        //...context.props,
        name: 'vi-expand-transition'
      },
      on: eventHandlers(context.props.duration)
    }

    return h('transition', data, context.children)
  }
}
