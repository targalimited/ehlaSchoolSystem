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
      state.extoken = res['data']['ex_token']
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
      if(res){
        localStorage.setItem("extoken", res['data']['ex_token']);
        localStorage.setItem("school_id", res['data']['school_id']);
        localStorage.setItem("user", JSON.stringify(res['data']['user']));
        commit('login_success', res);
      }
      return res
    },

    logout ({commit, dispatch}) {
      const res = new AuthHttp().post('/userApi/logout')
      localStorage.removeItem("extoken");
      localStorage.removeItem("school_id");
      localStorage.removeItem("user");
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
