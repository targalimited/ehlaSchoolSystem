import {ifNotAuthenticated, ifAuthenticated } from '@/router/guard.js'
import HomeView from './views/home-view'
import LibView from './views/lib-view'
import LibCatsView from './views/lib-cats-view'
import ShelfView from './views/shelf-view'
import Topbar from '@/components/top-bar'
import AppLayout from '../../layout/app-layout'
import ShelfTopbar from './components/shelf-top-bar'
import ShelfBottomBar from './components/shelf-bottom-bar'
import BrowseBottomBar from './components/browse-bottom-bar'
import BrowseTopbar from './components/browse-top-bar'
import ItemFilter from './components/item-filter'

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
    component: AppLayout,
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: '/',
        components: {
          top: ShelfTopbar,
          left: ItemFilter,
          default: ShelfView,
          bottom: ShelfBottomBar
        }
      }
    ]
  },
  {
    path: '/pilot/browse',
    component: AppLayout,
    beforeEnter: ifAuthenticated,
    props: {
      type: 'menu'
    },
    children: [
      {
        path: '/',
        name: 'browse-root',
        components: {
          top: Topbar,
          default: LibCatsView
        },
        props: {
          top: {
            title: 'Pilot 100'
          },
          default: {
            type: 'pilot'
          }
        }
      },
      {
        path: ':key',
        name: 'browse-category',
        components: {
          top: BrowseTopbar,
          left: ItemFilter,
          default: LibView,
          viewBottom: BrowseBottomBar
        }
      }
    ]
  },
  {
    path: '/free-access-scheme',
    name: 'free-access',
    components: {
      top: Topbar,
      right: LibCatsView
    },
    beforeEnter: ifAuthenticated,
    props: {
      top: {
        title: 'School Pilot 100'
      },
      right: {
        type: 'free'
      }
    }
  }
]
