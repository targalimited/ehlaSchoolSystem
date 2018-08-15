import {http, AuthHttp} from '../../http'
import { isCookieEnabled, getCookie, setCookie, removeCookie } from 'tiny-cookie'

export default {
  state: {
    extoken: localStorage.getItem('extoken') || '',
    user: JSON.parse(localStorage.getItem('user')) || null,
    authStatus: '',
    schoolName: ''
  },

  mutations: {
    login (state) {
      state.authStatus = 'loading'
    },
    login_success (state, res) {
      state.authStatus = 'success'
      state.extoken = res['data']['ex_token']
      state.user = res['data']['user']
    },
    logout (state) {
      localStorage.removeItem("extoken");
      localStorage.removeItem("school_id");
      localStorage.removeItem("user");
      state.authStatus = 'fail'
      state.extoken = ''
      state.user = null
      state.schoolName = ''
    },
    gotUserInfo (state, user) {
      if (!user) return
      user = JSON.parse(user)
      const schoolName = user && user.school && user.school.s_name
      if (schoolName) state.schoolName = schoolName
    }
  },

  actions: {
    async login ({commit, dispatch}, {password, username}) {
      commit('login')
      try {
        const res = await http.post('/userApi/login', {
          password: password,
          username: username
        })

        if (res) {
          localStorage.setItem("extoken", res['data']['ex_token'])
          localStorage.setItem("school_id", res['data']['school_id'])
          const userInfo = JSON.stringify(res['data']['user'])
          localStorage.setItem("user", userInfo)
          commit('login_success', res)
          commit('gotUserInfo', userInfo)
          // TODO: should also return classes in one single API
          dispatch('getClasses')
        }
        return res
      } catch (e) {
        return Promise.reject(e)
      }
    },

    logout ({commit, dispatch}) {
      const res = new AuthHttp().post('/userApi/logout')
      commit('shelf/reset');
      commit('logout');
      return res
    },

    async changepw({commit}, {oldpw, newpw}) {
      const res = await new AuthHttp().post('/userApi/changepw', {
          "oldPw": oldpw,
          "newPw": newpw,
          "reType": newpw
      })
      if (res.success) return true
      else {
        return Promise.reject(res.debug)
      }
    }
  },

  getters: {
    isAuthenticated: state => !!state.extoken,
    authStatus: state => state.authStatus,
    user: state => state.user,
    username: state => state.user && state.user.username,
    eduLv: state => state.user && state.user.school.edu_lv,
    schoolName: state => {
      if (!state.user) return
      return state.user.school.s_name
    },
    teacherId: state => state.user && state.user.user_id,
    userGroupId: state => {
      if (!state.user) return null
      return parseInt(state.user.userGroup.id)
    }
  }
}
