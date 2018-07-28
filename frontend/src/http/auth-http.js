import Axios from 'axios'
import router from '@/router'
import store from '@/store'

class AuthHttp {
  http = Axios.create({
    baseURL: (process.env.API_BASE_URL || '') + '/v1',
    timeout: 10000,
    headers: {
      'extoken': localStorage.getItem('extoken'),
      'school-id': localStorage.getItem('school_id')
    }
  })


  async get(url) {
    try {
      const res = await this.http.get(url)
      return res.data
    } catch (e) {
      return this.handleException(e)
    }
  }

  async post(url, data) {
    try {
      const res = await this.http.post(url, {
        params: data
      })
      return res.data
    } catch (e) {
      return this.handleException(e)
    }
  }

  async http_post(url, data) {
    try {
      const res = await this.http.post(url, data)

      return res.data
    } catch (e) {
      return this.handleException(e)
    }
  }

  async post_file(url, data) {
    let formData = new FormData();
    formData.append('file', data);

    try {
      const res = await Axios.post((process.env.API_BASE_URL || '') + '/v1/'+url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'extoken': localStorage.getItem('extoken'),
            'school-id': localStorage.getItem('school_id')
          }
        }
      )
      console.log('success',res.data);
      return res.data
    } catch (e) {
      console.log(Object.keys(e), e);
      return this.handleException(e)
    }


  }

  async put(url, data) {
    try {
      return await this.http.put(url, data)
      return this.handleError(res)
    } catch (e) {
      return this.handleException(e)
    }
  }

  async delete(url) {
    try {
      return await this.http.delete(url)
      return this.handleError(res)
    } catch (e) {
      return this.handleException(e)
    }
  }

  handleException(e) {
    if (e.response && e.response.status === 401) {
      store.commit('logout')
      router.replace('/login')
      return Promise.reject(e)
    }

    return Promise.reject(e)
  }
}

export default AuthHttp
