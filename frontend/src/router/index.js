import {default as ShelfRoutes} from '@/modules/shelf/routes'
import {default as AuthRoutes} from '@/modules/auth/routes'
import WildRoute from './wild-route'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...ShelfRoutes,
    ...AuthRoutes,
    {
      path: '*',
      name: 'wild',
      component: WildRoute
    }
  ]
})
