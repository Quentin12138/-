<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%;"
  >
    <el-col :span="20">
      <span>{{ nodeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex">
        <!-- 两个内容 -->
        <el-col :span="12" style="overflow: hidden">{{ nodeData.manager }}</el-col>
        <el-col :span="12">
          <!-- 下拉菜单 element -->
          <el-dropdown>
            <span> 操作<i class="el-icon-arrow-down" /> </span>
            <el-dropdown-menu slot="dropdown">
              <!-- 当给自定义组件（不是原生dom标签）绑定clisk事件等原生事件
              如果组件内没有定义一个同名的自定义事件 这个原生事件就不会生效
              可以加上一个事件修饰符 native 表示当前事件为原生事件 -->
              <el-dropdown-item @click.native="addDep">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" @click.native="delDep">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    // 是否是根节点
    isRoot: {
      type: Boolean,
      default: false
    },
    nodeData: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 新增功能步骤
    // 1、绑定一个点击事件 点击事件触发 让弹出层显示
    // 2、需要知道点击的元素是哪一个
    // 3、准备弹出层 el-Dialog
    // 4、准备弹层中的表单
    // 5、准备表单的校验
    // 6、绑定提交按钮的点击事件，将数据发送给后端
    // 7、清空表单的内容和校验
    // 8、关闭弹窗
    // 9、提示用户新增成功
    // 10、重新渲染页面 调用获取数据的方法
    addDep() {
      this.$emit('addDep', this.nodeData)
    },
    delDep() {
      this.$emit('delDep', this.nodeData)
    }
  }
}
</script>

<style>

</style>
