import ItemReportByClassView from './views/item-report-by-class-view'
import ClassView from './views/class-view'
import AsmtView from './views/asmt-view'
import {ifNotAuthenticated, ifAuthenticated } from '@/router/guard.js'
export default [
  {
    path: '/class/:class_id/assignment',
    name: 'asmt-report',
    component: AsmtView,
    beforeEnter: ifAuthenticated
  },
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
