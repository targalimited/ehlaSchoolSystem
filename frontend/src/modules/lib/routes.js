import LibMainView from './views/lib-main-view.vue'
import {ifNotAuthenticated, ifAuthenticated } from '@/router/guard.js'
export default [
  {
    path: '/ehla-content',
    name: 'lib-main',
    component: LibMainView,
    beforeEnter: ifAuthenticated
  }
]
