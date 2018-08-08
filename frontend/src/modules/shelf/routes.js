import {ifNotAuthenticated, ifAuthenticated } from '@/router/guard.js'
import HomeView from './views/home-view'
import BrowseList from './views/browse-list'
import BrowsePilotRoot from './views/browse-pilot-root'
import LibraryList from './views/library-list'
import TopBar from '@/components/top-bar'
import AppLayout from '../../layout/app-layout'
import ShelfTopbar from './components/shelf-top-bar'
import ShelfBottomBar from './components/shelf-bottom-bar'
import BrowseBottomBar from './components/browse-bottom-bar'
import PilotTopBar from './components/pilot-top-bar'
import ItemFilter from './components/item-filter'
import PilotIntroBar from './components/pilot-intro-bar'
import EhlaRoot from './views/browse-ehla-root'

export default [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/my-library',
    component: AppLayout,
    beforeEnter: ifAuthenticated,
    props: {
      type: 'single'
    },
    children: [
      {
        path: 'unassigned',
        name: 'library-unassigned',
        components: {
          top: ShelfTopbar,
          default: LibraryList,
          top2: ShelfBottomBar
        },
        props: {
          default: {
            state: 'unassigned'
          }
        }
      },
      {
        path: 'assigned',
        name: 'library-assigned',
        components: {
          top: ShelfTopbar,
          default: LibraryList,
          top2: ShelfBottomBar
        },
        props: {
          default: {
            state: 'assigned'
          }
        }
      }
    ]
  },
  {
    path: '/pilot/browse',
    component: AppLayout,
    beforeEnter: ifAuthenticated,
    props: {
      type: 'single'
    },
    children: [
      {
        path: '/',
        name: 'browse-pilot-root',
        components: {
          top: PilotTopBar,
          top2: PilotIntroBar,
          default: BrowsePilotRoot
        },
        props: {
          top: {
            title: 'Pilot 100'
          },
          top2: {
            type: 'pilot'
          },
          default: {
            type: 'pilot'
          }
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
        path: ':key',
        name: 'browse-pilot-category',
        components: {
          top: PilotTopBar,
          left: ItemFilter,
          default: BrowseList,
          top2: BrowseBottomBar
        }
      }
    ]
  },
  {
    path: '/free-access-scheme/browse',
    component: AppLayout,
    beforeEnter: ifAuthenticated,
    props: {
      type: 'single'
    },
    children: [
      {
        path: '/',
        name: 'browse-free-root',
        components: {
          top: PilotTopBar,
          top2: PilotIntroBar,
          default: BrowsePilotRoot
        },
        props: {
          top: {
            title: 'Pilot 100'
          },
          top2: {
            type: 'free'
          },
          default: {
            type: 'free'
          }
        }
      }
    ]
  },
  {
    path: '/ehla-content/browse',
    component: AppLayout,
    beforeEnter: ifAuthenticated,
    props: {
      type: 'single'
    },
    children: [
      {
        path: '/',
        name: 'browse-ehla-root',
        components: {
          top: TopBar,
          default: EhlaRoot
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
