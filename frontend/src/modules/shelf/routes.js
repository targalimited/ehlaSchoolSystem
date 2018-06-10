import HomeView from './views/home-view'
import LibView from './views/lib-view'
import LibCatsView from './views/lib-cats-view'
import ShelfView from './views/shelf-view'

export default [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/manage-reading',
    name: 'shelf',
    component: ShelfView
  },
  {
    path: '/choose-reading',
    name: 'lib-cat',
    component: LibCatsView
  },
  {
    path: '/choose-reading/:key',
    name: 'lib',
    component: LibView
  }
]
