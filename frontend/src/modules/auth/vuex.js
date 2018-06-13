import {http, AuthHttp} from '../../http'
import { isCookieEnabled, getCookie, setCookie, removeCookie } from 'tiny-cookie'

export default {
  state: {
    extoken: localStorage.getItem('extoken') || '',
    status: ''
  },

  getters: {
    isAuthenticated: state => !!state.extoken,
    authStatus: state => state.status
  },

  mutations: {
    login (state) {
      state.status = 'loading'
    },
    login_success (state, res) {
      state.status = 'success'
      state.extoken = res['ex_token']
    },
    logout (state) {
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
      setCookie('ex_token', res['ex_token'])
      setCookie('school_id', res['school_id'])
      commit('login_success', res);
      return res
    },

    async logout ({commit, dispatch}) {
      const res = await new AuthHttp().post('/userApi/logout')
      localStorage.removeItem("extoken");
      localStorage.removeItem("school_id");
      removeCookie('ex_token')
      removeCookie('school_id')
      commit('logout');
      return res
    }
  }
}
