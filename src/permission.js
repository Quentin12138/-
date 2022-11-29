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

// 用户权限
import { asyncRoutes } from './router/asyncRoutes'
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
        // 用户权限设置
        // 位置:在获取用户个人信息之后 跳转页面的时候处理用户权限
        // 1、获取接口数据获取动态路由数据
        const res = await store.dispatch('user/fetchUserInfo')
        // console.log(res)
        const menus = res.menus
        // console.log(menus, '接口返回的权限接口')
        // console.log(asyncRoutes, '需要过滤的原始动态路由')
        // 2、数据的过滤
        const filterRoutes = asyncRoutes.filter(item => {
          return menus.includes(item.children[0].name)
        })
        // console.log(filterRoutes, '过滤后的数据')
        // 3、将过滤出的动态路由放在路由实例上
        // 发现访问过滤之后的页面出现白屏没有报错也没有404
        router.addRoutes([
          ...filterRoutes,
          // 找不到页面的兜底
          { path: '*/', redirect: '/404', hidden: true }
        ])
        // 4、通过vuex获取到一个响应式的路由表数据
        // 5、点击导航进入页面显示正常但是页面刷新或者输入urL进入页面会白屏
        // 原因: router.addRoutes这个方法是异步方法进入到异步队列
        // 代码会先执行next跳转  当next跳转时路由表中还没有新加入的异步路由
        // 所以刷新页面或者直接输入url会白屏
        store.commit('menu/setMenuList', filterRoutes)
        // 6、通过让路由守卫重新进入一次路由方式进入到第轮事件循环中
        // 第一轮中的异步队列中的方法就已经执行完成了
        next({
          ...to,
          replace: true // 进入页面但是不保留历史记录
        })
        return
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
