import {ifNotAuthenticated, ifAuthenticated } from '@/router/guard.js'
import LoginView from './views/login-view'
import LogoutView from './views/logout-view'
import ProfileView from './views/profile-view'
import AppLayout from '@/layout/app-layout'
import TopBar from '@/components/top-bar'

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
    component: AppLayout,
    beforeEnter: ifAuthenticated,
    children: [
      {
        name: 'profile',
        path: '/',
        components: {
          top: TopBar,
          default: ProfileView
        },
        props: {
          top: {
            title: 'Profile'
          }
        }
      }
    ]
  }
]
