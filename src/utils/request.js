import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { resetRouter } from '@/router'
const request = axios.create({
  // 项目的基地址
  // process.env.VUE_APP_BASE_URL 环境变量
  // process.env是webpack的语法 在微博pack打包的时候会找到对应的.env文件 获取到.VUE_APP_BASE_URL变量的值 付给baseURL
  // 什么是环境变量  根据执行命令的不同会自动匹配对应环境
  // npm run serve 匹配开发环境 developmen
  // npm run build 匹配生产环境 productio
  // 在此环境下生效的变量就是环境变量

  // 为什么使用环境变量？
  // 因为开发 生产调用的接口是两套不同的接口 所以需要根据不同的环境使用不同的基地址
  baseURL: process.env.VUE_APP_BASE_URL,
  // 接口超时时间
  timeout: 20000 // request timeout
})

// 请求拦截器
// 在请求发起之前执行
// 在headers上绑定 token

// 在使用请求拦截器一定要将config return
request.interceptors.request.use(
  config => {
    const token = store.state.user.token
    // console.log(123)
    // 判断  当headers上没有Authorization字段并且是有值的情况下给请求头添加token
    if (!config.headers.Authorization && token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
// 在请求响应之后执行
// 对请求回来的结果进行处理
// 正确的结果 直接返回
// 错误的结果 状态码不同有不同的结果

// 在使用响应拦截器的时候一定要将正确的结果 返回
request.interceptors.response.use(
  response => {
    const { message, success } = response.data
    if (success) {
      Message.success(message)
      return response.data
    } else {
      Message.error(message)
      // 当后端返回的success字段是false的时候 需要将promise的状态强制变更成拒绝 reject
      return Promise.reject(message)
    }
    // 因为axios会在请求返回的结果外层波过一个data 所以在相应拦截器中将response.data返回
  },
  error => {
    console.dir(error)
    // 当token过期，接口的状态码会返回401 判断401为true 则退出
    if (error.response.status === 401) {
      store.commit('user/REMOVE_TOKEN')
      router.push('./')
      // 退出登陆的路由重置
      resetRouter()
    }
    return Promise.reject(error)
  }
)

export default request
