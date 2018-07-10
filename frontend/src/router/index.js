import {default as ShelfRoutes} from '@/modules/shelf/routes'
import {default as AuthRoutes} from '@/modules/auth/routes'
import {default as LibRoutes} from '@/modules/lib/routes'
import {default as AssignRoutes} from '@/modules/asmt/routes'
import {default as SettingRoutes} from '@/modules/setting/routes'
import WildRoute from './wild-route'
import ComingSoonView from './wild-route-2'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    ...ShelfRoutes,
    ...AuthRoutes,
    ...LibRoutes,
    ...AssignRoutes,
    ...SettingRoutes,
    {
      path: '/report',
      name: 'report',
      component: ComingSoonView,
      props: { title: 'Report' }
    },
    {
      path: '/assignment',
      name: 'assignment',
      component: ComingSoonView,
      props: { title: 'Assign Homework' }
    },
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
