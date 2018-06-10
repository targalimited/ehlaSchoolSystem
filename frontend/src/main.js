// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './filters'
import Dali from './lib/lib.js'
import * as ModalDialogs from 'vue-modal-dialogs'

Vue.use(Dali)
Vue.use(ModalDialogs)

Vue.config.productionTip = false

// initiate Event Bus
const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
