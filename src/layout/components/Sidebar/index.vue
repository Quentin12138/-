<template>
  <div :class="{ 'has-logo': showLogo }">
    <!-- 导航菜单上面的 logo -->
    <logo v-if="showLogo" :collapse="isCollapse" />
    <!-- element 滚动条 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 导航菜单组件 -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- 菜单中的每一项 -->
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      // this.$router.options.routes 可以拿到完整的路由表数据
      // this.$router.options.routes的数据不是响应式的 只会在初始化路由的时候发生一次改变
      // 后面路由表发生变化 也不会同步改变
      // return this.$router.options.routes
      // 使用vuex中的嘀应式数据返回vuex中的全量路由数组
      return this.$store.state.menu.menuList
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
