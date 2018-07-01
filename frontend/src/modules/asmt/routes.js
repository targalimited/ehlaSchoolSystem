import {ifNotAuthenticated, ifAuthenticated } from '@/router/guard.js'
import PickItemView from './views/pick-asmt-view'
import AssignOptionsView from './views/asmt-options-view'
import AsmtListView from './views/asmt-list-view'

export default [
  {
    path: '/pick-asmt',
    name: 'pick-asmt',
    component: PickItemView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/asmt-options-view',
    name: 'asmt-options',
    component: AssignOptionsView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/asmt-list',
    name: 'asmt-list',
    component: AsmtListView,
    beforeEnter: ifAuthenticated
  }
]
