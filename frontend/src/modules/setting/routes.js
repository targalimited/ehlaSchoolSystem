import StudentView from './views/student-view'
import TeacherView from './views/teacher-view'
import ClassView from './views/class-view'

export default [
  {
    name: 'setting-student',
    path: '/students',
    component: StudentView
  },
  {
    name: 'setting-class',
    path: '/class',
    component: ClassView
  },
  {
    name: 'setting-teacher',
    path: '/teacher',
    component: TeacherView
  }
]
