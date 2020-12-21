import Vue from 'vue'
import dayjs from 'dayjs'
// 时间过滤器
Vue.filter('date', (value, format = 'MMM DD, YYYY') => {
  return dayjs(value).format(format)
})
