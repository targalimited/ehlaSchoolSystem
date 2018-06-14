import {http, AuthHttp} from '../../http'
import { isCookieEnabled, getCookie, setCookie, removeCookie } from 'tiny-cookie'

export default {
  state: {
    extoken: localStorage.getItem('extoken') || '',
    authStatus: ''
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
      state.extoken = res['ex_token']
    },
    logout (state) {
      state.authStatus = 'fail'
      state.extoken = ''
    }
  },

  actions: {
    async login ({commit, dispatch}, {password, username}) {
      commit('login');
      const res = await http.post('/userApi/login', {
        password: password,
        username: username
      })
      localStorage.setItem("extoken", res['ex_token']);
      localStorage.setItem("school_id", res['school_id']);
      // setCookie('ex_token', res['ex_token'])
      // setCookie('school_id', res['school_id'])
      commit('login_success', res);
      return res
    },

    async logout ({commit, dispatch}) {
      const res = await new AuthHttp().post('/userApi/logout')
      localStorage.removeItem("extoken");
      localStorage.removeItem("school_id");
      // removeCookie('ex_token')
      // removeCookie('school_id')
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
