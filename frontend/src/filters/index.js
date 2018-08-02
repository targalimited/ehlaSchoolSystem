import Vue from 'vue'
import moment from 'moment'
import store from '@/store'

Vue.filter('formatDate', date => {
  return moment(date, 'YYYY-MM-DDTHH:mm:ss').format('DD MMM')
})

Vue.filter('levelName', lv => {
  const mapper = store.getters['shelf/levelsTranslate']
  if (!mapper) return lv
  return mapper[lv]
})

Vue.filter('join', array => {
  return array.join(', ')
})
