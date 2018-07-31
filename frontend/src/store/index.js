import shelf from '@/modules/shelf/vuex'
import auth from '@/modules/auth/vuex'
import asmt from '@/modules/asmt/vuex'
import teach from '@/modules/teach/vuex'
import settings from '@/store/setting.module'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    shelf,
    auth,
    asmt,
    teach,
    settings
  },
  strict: debug,
})
