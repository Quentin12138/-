import { login, getProfile, getUserDetailById } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// localStorage sessionStorage cookie indexedDB 都是本地存储
// 【共同点】
// 1、用于做本地存储
// 2、存放的数据都在硬盘里
// 3、localStorage sessionStorage cookiedou只能存储字符串，存不了对象
// 4、indexedDB 可以存对象 目前接触较少 以后也不一定用得到
// 【区别】
// localStorage sessionStorage  sessionStorage会话级别的缓存，页面一旦关闭就清除了  localStorage会一直存在，大小5m
// cookie 在请求和响应过程都会携带cookie 后端可以解析cookie 大小只有4k左右 不建议存放大量数据浪费流量 cookie通常用来存放用户信息和token

export default {
  namespaced: true,
  state: {
    // 加入本地存储之后，token先从本地存储中获取。若果获取不到token是undefined 此时给一个默认值
    token: getToken() || '',
    // 存储用户的基本信息
    userInfo: {}
    // 获取用户的基本信息
    // 1、找到接口文档 找到获取用户基本信息的接口
    // 2、在api/user定义接口
    // 3、将定义好的接口导入到xuex中
    // 4、在state中定义userInfo存储用户的基本信息
    // 5、在mutation中定义方法修改userInfo
    // 6、在action中调用接口获取数据 调用mutation中的方法修改state的userInfo变量
    // 7、找一个合适的位置调用xuex定义的action
  },
  // 修改state中的变量
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    REMOVE_TOKEN(state, token) {
      state.token = ''
      removeToken(token)
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  // 调用后端接口 处理异步请求操作
  // 为了代码可读性强，提升代码的内聚程度，将登陆接口卸载vue的action中
  actions: {
    async fetchLogin(store, form) {
      const res = await login(form)
      store.commit('SET_TOKEN', res.data)
      console.log(res)
    },
    async fetchUserInfo(store) {
      // { data: data1 } 解构赋值的重命名
      const { data: data1 } = await getProfile()
      const { data: data2 } = await getUserDetailById(data1.userId)
      // { ...data1, ...data2 } 表示将data1展开后拼接上data2展开，再用花括号包裹形成一个新对象
      store.commit('SET_USERINFO', { ...data1, ...data2 })
      return data1.roles
    }
  }
}
