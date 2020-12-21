import Vue from 'vue'
import dayjs from 'dayjs'
import MarkdownIt from 'markdown-it'
let md = new MarkdownIt()

// 时间过滤器
Vue.filter('date', (value, format = 'MMM DD, YYYY') => {
  return dayjs(value).format(format)
})

Vue.filter('md', value => md.render(value))
