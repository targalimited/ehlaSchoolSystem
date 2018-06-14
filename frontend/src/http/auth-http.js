import Axios from 'axios'
import router from '@/router'
import { isCookieEnabled, getCookie, setCookie, removeCookie } from 'tiny-cookie'

class AuthHttp {
  http = Axios.create({
    baseURL: (process.env.API_BASE_URL || '') + '/v1',
    timeout: 10000,
    headers: {
      'extoken': localStorage.getItem('extoken'),
      'school-id': localStorage.getItem('school_id')
    }
  })

  async get (url) {
    try {
      const res = await this.http.get(url)
      return res.data
    } catch (e) {
      return this.handleException(e)
    }
  }

  async post (url, data) {
    try {
      const res = await this.http.post(url, {
        params: data
      })
      return res.data
    } catch (e) {
      return this.handleException(e)
    }
  }

  async put (url, data) {
    try {
      return await this.http.put(url, data)
      return this.handleError(res)
    } catch (e) {
      return this.handleException(e)
    }
  }

  async delete (url) {
    try {
      return await this.http.delete(url)
      return this.handleError(res)
    } catch (e) {
      return this.handleException(e)
    }
  }

  handleException (e) {
    if (e.response.status === 401) {
      router.replace('/login')
      return
    }
    return Promise.reject(e)
  }
}

export default AuthHttp
