import {default as ShelfRoutes} from '@/modules/shelf/routes'
import {default as AuthRoutes} from '@/modules/auth/routes'
import {default as SettingRoutes} from '@/modules/setting/routes'
import {default as TeachRoutes} from '@/modules/teach/routes'
import WildRoute from './wild-route'
import ComingSoonView from './wild-route-2'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    ...ShelfRoutes,
    ...AuthRoutes,
    ...SettingRoutes,
    ...TeachRoutes,
    {
      path: '/config',
      name: 'config',
      component: ComingSoonView,
      props: { title: 'Config' }
    },
    {
      path: '/settings',
      name: 'settings',
      component: ComingSoonView,
      props: { title: 'Settings' }
    },
    {
      path: '*',
      name: 'wild',
      component: WildRoute
    }
  ]
})

export default router
