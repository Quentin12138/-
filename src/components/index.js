// 将自定义组件封装成组件库插件
// vue中使用插件般是Vue.use
// Vue.use会接受个参数这个参数如果是对象 会调用对 象中的install方法
// 如果是方法会将这个方法当作install方法执行
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import UploadImg from './UploadImg'
const componentPlugin = {
  install: (Vue) => {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('UploadImg', UploadImg)
  }
}

export default componentPlugin
// main.js引入
