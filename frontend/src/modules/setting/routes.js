import StudentView from './views/student-view'
import TeacherView from './views/teacher-view'
import ClassView from './views/class-view'
import AppLayout from '@/layout/app-layout'
import SettingTopBar from './components/setting-top-bar'

export default [
  {
    path: '/settings',
    component: AppLayout,
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
      },
      {
        name: 'settings-student',
        path: '/students',
        components: {
          top: SettingTopBar,
          default: StudentView
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
          default: TeacherView
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
