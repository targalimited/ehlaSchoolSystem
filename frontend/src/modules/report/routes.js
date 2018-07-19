import ItemReportByClassView from './views/item-report-by-class-view'
import ClassView from './views/class-view'
import {ifNotAuthenticated, ifAuthenticated } from '@/router/guard.js'
export default [
  {
    path: '/item-report/:class',
    name: 'item-report',
    component: ItemReportByClassView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/report/select-class',
    name: 'report-select-class',
    component: ClassView,
    beforeEnter: ifAuthenticated
  }
]
