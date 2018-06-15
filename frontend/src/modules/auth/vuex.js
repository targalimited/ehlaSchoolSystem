import {http, AuthHttp} from '../../http'
import { isCookieEnabled, getCookie, setCookie, removeCookie } from 'tiny-cookie'

export default {
  state: {
    extoken: localStorage.getItem('extoken') || '',
    authStatus: '',
    schoolName: ''
  },

  getters: {
    isAuthenticated: state => !!state.extoken,
    authStatus: state => state.authStatus
  },

  mutations: {
    login (state) {
      state.authStatus = 'loading'
    },
    login_success (state, res) {
      state.authStatus = 'success'
      state.extoken = res['data']['ex_token']
    },
    logout (state) {
      localStorage.removeItem("extoken");
      localStorage.removeItem("school_id");
      localStorage.removeItem("user");
      state.authStatus = 'fail'
      state.extoken = ''
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
      commit('login');
      const res = await http.post('/userApi/login', {
        password: password,
        username: username
      })
      if(res){
        localStorage.setItem("extoken", res['data']['ex_token'])
        localStorage.setItem("school_id", res['data']['school_id'])
        const userInfo = JSON.stringify(res['data']['user'])
        localStorage.setItem("user", userInfo)
        commit('login_success', res)
        commit('gotUserInfo', userInfo)
      }
      return res
    },

    logout ({commit, dispatch}) {
      const res = new AuthHttp().post('/userApi/logout')
      commit('logout');
      return res
    },

    async changepw({commit}, {oldpw, newpw}) {
      const res = await new AuthHttp().post('/userApi/changepw', {
          "oldPw": oldpw,
          "newPw": newpw,
          "reType": newpw
      })
      return res
    }
  }
}
