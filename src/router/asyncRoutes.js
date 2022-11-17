/* Layout */
import Layout from '@/layout'
export const asyncRoutes = [
  // 组织架构
  {
    path: '/department',
    component: Layout,
    children: [{
      path: '',
      name: 'departments',
      component: () => import('@/views/Department/index'),
      meta: { title: '组织架构', icon: 'tree' }
    }]
  },
  // 角色管理
  {
    path: '/setting',
    component: Layout,
    children: [{
      path: '',
      name: 'settings',
      component: () => import('@/views/Setting/index'),
      meta: { title: '角色管理', icon: 'setting' }
    }]
  },
  // 员工管理
  {
    path: '/employee',
    component: Layout,
    children: [{
      path: '',
      name: 'employees',
      component: () => import('@/views/Employee/index'),
      meta: { title: '员工管理', icon: 'people' }
    }]
  },
  // 权限点
  {
    path: '/permission',
    component: Layout,
    children: [{
      path: '',
      name: 'permissions',
      component: () => import('@/views/Permission/index'),
      meta: { title: '权限点管理', icon: 'lock' }
    }]
  },
  // 工资管理页面
  {
    // 路由路径
    path: '/salarys',
    // 路由组件
    component: Layout,
    // 二级子路由
    children: [{
      path: '', // 如果children path置空的话 当前这个路由会作为一级渲染的默认路由
      // 自己添加的自定义字段 用于做路由过滤
      name: 'salarys',
      // 路由组件 路由懒加载
      component: () => import('@/views/Salary'),
      // 路由的元数据 title标题 icon 图标
      meta: { title: '工资管理', icon: 'money' }
    }]
  }
]
