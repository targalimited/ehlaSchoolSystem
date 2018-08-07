import AppLayout from '@/layout/app-layout'
import AsmtAppBar from './layout/asmt-top-bar'
import WeaknessTopBar from './layout/weakness-top-bar'
import AsmtList from './components/asmt-list'
import AsmtReport from './components/current-asmt-report'
import WeaknessList from './components/weakness-list'
import WeaknessReport from './components/weakness-report'
import {ifNotAuthenticated, ifAuthenticated } from '@/router/guard.js'

export default [
  {
    path: '/assignment/class/:classId',
    component: AppLayout,
    beforeEnter: ifAuthenticated,
    props: {
      type: 'panel'
    },
    children: [
      {
        path: '/',
        name: 'asmt-class-progress',
        components: {
          left: AsmtList,
          default: AsmtReport,
          top: AsmtAppBar
        }
      },
      {
        path: 'locked',
        name: 'asmt-class-locked',
        components: {
          left: AsmtList,
          default: AsmtReport,
          top: AsmtAppBar
        },
        props: {
          left: {locked: true},
          default: {locked: true}
        }
      }
    ]
  },
  {
    path: '/report/class/:classId',
    component: AppLayout,
    beforeEnter: ifAuthenticated,
    props: {
      type: 'panel'
    },
    children: [
      {
        path: 'weakness',
        name: 'report-class-weakness',
        components: {
          left: WeaknessList,
          default: WeaknessReport,
          top: WeaknessTopBar
        }
      }
    ]
  }
]
