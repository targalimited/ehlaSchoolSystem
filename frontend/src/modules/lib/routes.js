import AppLayout from '../../layout/app-layout'
import LibMainView from './views/lib-main-view'
import TopBar from '../../components/tab-bar'
import {ifNotAuthenticated, ifAuthenticated } from '@/router/guard.js'
export default [
  {
    path: '/ehla-content',
    name: 'lib-main',
    component: AppLayout,
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: '/',
        name: 'lib-main',
        components: {
          top: TopBar,
          right: LibMainView
        },
        props: {
          top: {
            title: 'EHLA Category'
          }
        }
      }
    ]
  }
]
