// 权限控制
// 权限控制
// 登陆权限 token是否存在 路由守卫的前置守卫 如果有token 说明已登录 可以访问系统中的其他路由
// 如果没有token 说明用户没有登录 可以访问不需要登陆就能看到的页面 比如游客 登录 注册 404

// 用户权限
// RBAC权限控制 根据不同用户的权限 动态控制路由菜单的展现

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import store from './store'
// 定义白名单
const whiteList = ['/404', '/login']
// 路由前置守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const token = store.state.user.token
  if (token) {
    if (to.path === '/login') {
      next('/')
      // 因为路由守卫逆序是按照同一个路由成对出现的
      // 如果在前置守卫中改变了跳转的地址
      // 就匹配不上之前的后者守卫了
      // 需要将进度条手动
      NProgress.done()
    } else {
      // 获取用户的基本资料应该在用户登录之后进行
      // 让用户进入每个页面都能获取用户的基本资料

      // 判断vuex里是否有用户信息，没有就请求接口
      if (!store.state.user.userInfo.username) {
        await store.dispatch('user/fetchUserInfo')
      }

      // console.log(store.state.user.userInfo)
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
// 页面路由进入之后的后置守卫
router.afterEach((to, from) => {
  NProgress.done()
})
