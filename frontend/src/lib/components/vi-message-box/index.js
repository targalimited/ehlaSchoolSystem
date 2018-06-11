import Vue from 'vue'
import ViMessageBox from './vi-message-box'
let MessageBoxConstructor = Vue.extend(ViMessageBox)

let promise

const defaultCallback = action => {
  if (action === 'confirm') {
    promise.resolve(action);
  } else if (action === 'cancel') {
    console.log('on cancel')
    promise.reject(action);
  }
}

const DeletePrompt = function(options) {
  if (Vue.prototype.$isServer) return

  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  const defaultOptions = {
    title: 'Confirm',
    message: '',
    confirm: 'confirm',
    cancel: 'cancel'
  }
  options = Object.assign({}, defaultOptions, options)
  const {title, message, cancel, confirm} = options

  let instance = new MessageBoxConstructor({
    data: {
      title: title,
      message: message,
      cancel: cancel,
      confirm: confirm
    }
  })
  instance.vm = instance.$mount()
  instance.callback = defaultCallback
  document.body.appendChild(instance.vm.$el)
  Vue.nextTick(() => {
    instance.visible = true;
  });

  return new Promise((resolve, reject) => {
    promise = {
      resolve: resolve,
      reject: reject
    }
  })
}

export default DeletePrompt
