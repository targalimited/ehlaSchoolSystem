import store from '../store'

export function ifNotAuthenticated(to, from, next) {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

export function ifAuthenticated(to, from, next) {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

export default {
  ifNotAuthenticated,
  ifAuthenticated
}