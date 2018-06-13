import {ifNotAuthenticated, ifAuthenticated } from '@/router/guard.js'
import HomeView from './views/home-view'
import LibView from './views/lib-view'
import LibCatsView from './views/lib-cats-view'
import ShelfView from './views/shelf-view'

export default [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/selected-reading',
    name: 'shelf',
    component: ShelfView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/choose-reading',
    name: 'lib-cat',
    component: LibCatsView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/choose-reading/:key',
    name: 'lib',
    component: LibView,
    beforeEnter: ifAuthenticated
  }
]
