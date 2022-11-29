import Vue from 'vue'
import Router from 'vue-router'

// import { asyncRoutes } from './asyncRoutes'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// 静态路由
export const constantRoutes = [
  // 登录页面
  {
    path: '/login',
    component: () => import('@/views/Login/index'),
    hidden: true
  },
  // 404 页面
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // demo 页面
  {
    path: '/demo',
    component: () => import('@/views/demo'),
    hidden: true
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      // 路由懒加载 当页面访问到相应的路由时，才会加载对应页面组件
      // 减小首页包的体积 缩短首屏加载时间
      component: () => import('@/views/Dashboard/index'),
      // 路由元数据 定义了路由的名字  路由的图标
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/import',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      component: () => import('@/views/importExcel/index.vue'),
      meta: { title: '表格导入' }
    }]
  },
  {

    path: '/employeeDetail',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      component: () => import('@/views/Employee/detail.vue'),
      meta: {
        title: '员工详情',
        // 进入当前页面 需要激活的菜单
        activeMenu: './emlpoyee'
      }
    }]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  // history 模式与 hash 模式的区别
  // hash模式的url默认带一个url
  // hash模式路由监听的时hashChange事件
  // history模式路由变更监听的是locatio.href的改变
  // histroy模式触发的方法是pushState 和 popState 并且不会自动触发
  // history是html5新推出的api 兼容性不如hash好
  mode: 'history',
  // 控制路由跳转后的滚动行为 在返回值中配置滚动条滚动的位置
  // 只在浏览器支持pushState的情况下生效
  scrollBehavior: () => ({ y: 0 }),
  // 将定义好的路由数据 添加到路由实例上
  // routes: [...constantRoutes, ...asyncRoutes]
  routes: [...constantRoutes]
})

const router = createRouter()

// reset 路由方法
export function resetRouter() {
  // 得到一个全新的 router 实例对象
  const newRouter = createRouter()
  // 使用新的路由记录覆盖掉老的路由记录
  router.matcher = newRouter.matcher // reset router
}

export default router
