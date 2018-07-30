import ViDeletePrompt from './vi-delete-prompt'
export default ViDeletePrompt

// TODO
// import Vue from 'vue'
// import ViDeletePrompt from './vi-delete-prompt'
// let MessageBoxConstructor = Vue.extend(ViDeletePrompt)
//
// let promise
//
// const defaultCallback = action => {
//   if (action === 'confirm') {
//     promise.resolve(action);
//   } else if (action === 'cancel') {
//     promise.reject(action);
//   }
// }
//
// const DeletePrompt = function(message) {
//   if (Vue.prototype.$isServer) return
//
//   let instance = new MessageBoxConstructor({
//     data: {
//       message: message
//     }
//   })
//   instance.vm = instance.$mount()
//   instance.callback = defaultCallback
//   document.body.appendChild(instance.vm.$el)
//   Vue.nextTick(() => {
//     instance.visible = true;
//   });
//
//   return new Promise((resolve, reject) => {
//     promise = {
//       resolve: resolve,
//       reject: reject
//     }
//   })
// }
//
// export default DeletePrompt
