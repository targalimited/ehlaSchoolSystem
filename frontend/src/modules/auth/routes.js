import LoginView from './views/login-view'
import LogoutView from './views/logout-view'
import ProfileView from './views/profile-view'
export default [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  }
]
