import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 1、重置浏览器样式
// 2、定义全局的css变量
// 3、定义通用的样式类名
// 4、element样式重置
import '@/styles/index.scss' // global css

import App from './App'

import store from './store'

import router from './router'

import '@/icons' // icon

Vue.use(ElementUI)

Vue.config.productionTip = false

// vue实例化
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
