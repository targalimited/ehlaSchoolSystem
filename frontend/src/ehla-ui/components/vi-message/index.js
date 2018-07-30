import Vue from 'vue'
import ViMessage from './vi-message'
let MessageConstructor = Vue.extend(ViMessage)

let instance
let instances = []
let seed = 1

const Message = function(options) {
  if (Vue.prototype.$isServer) return
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  let id = 'message_' + seed++;

  instance = new MessageConstructor({
    data: options
  })
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instances.push(instance)
}

Message.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

export default Message
