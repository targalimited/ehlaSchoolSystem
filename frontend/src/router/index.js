import {default as ShelfRoutes} from '@/modules/shelf/routes'
import {default as AuthRoutes} from '@/modules/auth/routes'
import {default as LibRoutes} from '@/modules/lib/routes'
import WildRoute from './wild-route'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    ...ShelfRoutes,
    ...AuthRoutes,
    ...LibRoutes,
    {
      path: '*',
      name: 'wild',
      component: WildRoute
    }
  ]
})
