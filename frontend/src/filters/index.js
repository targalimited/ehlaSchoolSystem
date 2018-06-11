import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', date => {
  return moment(date, 'YYYY-MM-DDTHH:mm:ss').format('DD MMM YYYY')
})

Vue.filter('join', array => {
  return array.join(', ')
})
