import {ifNotAuthenticated, ifAuthenticated } from '@/router/guard.js'
import LoginView from './views/login-view'
import LogoutView from './views/logout-view'
import ProfileView from './views/profile-view'

export default [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    beforeEnter: ifAuthenticated
  }
]
