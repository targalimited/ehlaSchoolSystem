import Vue from 'vue'
import ViMessageBox from './vi-message-box'
let MessageBoxConstructor = Vue.extend(ViMessageBox)

let currentMsg

const defaultCallback = action => {
  if (currentMsg) {
    let callback = currentMsg.callback;
    if (typeof callback === 'function') {
      if (instance.showInput) {
        callback(instance.inputValue, action);
      } else {
        callback(action);
      }
    }
    if (currentMsg.resolve) {
      if (action === 'confirm') {
        currentMsg.resolve(action);
      } else if (action === 'cancel' && currentMsg.reject) {
        currentMsg.reject(action);
      }
    }
  }
}

const MessageBox = function(options) {
  console.log(options)
  if (Vue.prototype.$isServer) return
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }

  let instance = new MessageBoxConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  instance.callback = defaultCallback
  document.body.appendChild(instance.vm.$el)
  Vue.nextTick(() => {
    instance.visible = true;
  });

  return new Promise((resolve, reject) => {
    currentMsg = {
      resolve: resolve,
      reject: reject
    }
  })
}

export default MessageBox
