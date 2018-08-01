import TeachLayout from './teach-layout'
import AsmtList from './components/asmt-list'
import AsmtReport from './components/current-asmt-report'
import WeaknessList from './components/weakness-list'
import WeaknessReport from './components/weakness-report'
import {ifNotAuthenticated, ifAuthenticated } from '@/router/guard.js'
export default [
  {
    path: '/class/:class_id',
    component: TeachLayout,
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: 'assignment',
        name: 'asmt-status',
        components: {
          left: AsmtList,
          right: AsmtReport
        }
      },
      {
        path: 'assignment/mark',
        name: 'asmt-report',
        components: {
          left: AsmtList,
          right: AsmtReport
        },
        props: {
          left: {locked: true},
          right: {locked: true}
        }
      },
      {
        path: 'weakness',
        name: 'weakness-report',
        components: {
          left: WeaknessList,
          right: WeaknessReport
        }
      }
    ]
  }
]
