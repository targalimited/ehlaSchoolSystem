import {http, AuthHttp} from '../../http'
import { isCookieEnabled, getCookie, setCookie, removeCookie } from 'tiny-cookie'

export default {
  actions: {
    async login ({commit}, {password, username}) {
      const res = await http.post('/userApi/login', {
        password: password,
        username: username
      })
      setCookie('ex_token', res['ex_token'])
      setCookie('school_id', res['school_id'])
      return res
    },

    async logout ({commit}) {
      const res = await new AuthHttp().post('/userApi/logout')
      removeCookie('ex_token')
      removeCookie('school_id')
      return res
    }
  }
}
