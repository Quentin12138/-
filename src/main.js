import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import PageTools from '@/components/PageTools'// 引入组件

// 1、重置浏览器样式
// 2、定义全局的css变量
// 3、定义通用的样式类名
// 4、element样式重置
import '@/styles/index.scss' // global css

import App from './App'

import store from './store'

import router from './router'
// 引入权限模块
import './permission'

import '@/icons' // icon

// 执行全局指令注册
import '@/directive'

import componentPlugin from '@/components'
Vue.use(componentPlugin)
Vue.use(ElementUI)

// 全局组件的注册
// Vue.component('PageTools', PageTools)

Vue.config.productionTip = false

// vue实例化
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
