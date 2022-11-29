// 放置全局指令
//  access 权限指令
// 头条项目 自动获取焦点 v-focus

// 1、注册指令需要在vue实例上通过directive注册
// 2、第一个参数是一个指令名，第二个参数是一个对象
// 3、在第二个参数中 有一个内置方法inserted
// 4、inserted方法中接受el和binding两个默认的回调参数
// 5、自定义指令在使用的时候需要在第一 个参数前面加上'V-
// 6、第一个参数e 1是绑定自定义指令的dom元素
// 7、第二个参数是绑定首定义指令的参数值
import Vue from 'vue'
import store from '@/store'

Vue.directive('access', {
  inserted: (el, binding) => {
    // console.log(el, '我是el')
    // console.log(binding, '我是binding')
    if (!store.getters.points.includes(binding.value)) {
      el.remove(el)
    }
  }
})
