import StudentView from './components/student-list'
import TeacherView from './components/teacher-list'
import ClassView from './components/class-list'
import AppLayout from '@/layout/app-layout'
import SettingTopBar from './components/setting-top-bar'
import TeacherFilter from './components/teacher-filter'
import StudentFilter from './components/student-filter'

export default [
  {
    path: '/settings',
    component: AppLayout,
    props: {
      type: 'single'
    },
    children: [
      {
        name: 'settings-class',
        path: '/classes',
        components: {
          top: SettingTopBar,
          default: ClassView
        },
        props: {
          top: {
            title: 'Class Setting'
          }
        }
      }
    ]
  },
  {
    path: '/settings',
    component: AppLayout,
    props: {
      type: 'menu'
    },
    children: [
      {
        name: 'settings-student',
        path: '/students',
        components: {
          top: SettingTopBar,
          default: StudentView,
          left: StudentFilter
        },
        props: {
          top: {
            title: 'Student Setting'
          }
        }
      },
      {
        name: 'settings-teacher',
        path: '/teachers',
        components: {
          top: SettingTopBar,
          default: TeacherView,
          left: TeacherFilter
        },
        props: {
          top: {
            title: 'Teacher Setting'
          }
        }
      }
    ]
  }
]
