// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import browserUpdate from 'browser-update'
import 'babel-polyfill'
import 'svg-innerhtml'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './filters'
import './components'
import ProjectUI from './project-ui'
import * as ModalDialogs from 'vue-modal-dialogs'
import Loading from 'vue-loading-overlay';

Vue.use(ProjectUI)
Vue.use(ModalDialogs)
Vue.use(Loading)

Vue.config.productionTip = false

const user = localStorage.getItem('user')
if (user) {
  store.commit('gotUserInfo', user)
  store.dispatch('getClasses')
  store.dispatch('shelf/getSummary')
}

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
