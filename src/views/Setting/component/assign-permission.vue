<template>
  <el-dialog :visible="visible" title="分配权限(一级为路由页面查看权限-二级为按钮操作权限)" @close="dialogClose">
    <!-- 权限点树形数据 -->
    <!-- data树形组件渲染的数据
      props树形组件的配置项
      show-checkbox让树形组件显示多选框
      default-expand-all默认展开所有子节点
      check-strictly取消父子节点的关联关系
      node-key标识节点配合getCheckedKets使用
      -->
    <el-tree
      ref="treeRef"
      :data="list"
      :props="props"
      show-checkbox
      check-strictly
      node-key="id"
    />
    <!-- 按钮区域 -->
    <template #footer>
      <div style="text-align: right;">
        <el-button @click="$emit('dialog-close')">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { getPermissionList, assignPermission, getRoleDetail } from '@/api'
import findSon from '@/utils/findSon'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    currentNode: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      props: {
        label: 'name'
      },
      list: []
    }
  },
  methods: {
    // 弹窗关闭，执行的回调
    dialogClose() {
      this.$emit('dialog-close')
      // 清空选中数据通过setCheckedKeys传入空数组实现数据清空
      this.$refs.treeRef.setCheckedKeys([])
    },
    async fetchPermissionList(id) {
      const { data } = await getPermissionList()
      this.list = findSon(data, '0')
      const { data: { permIds }} = await getRoleDetail(id)
      this.$refs.treeRef.setCheckedKeys(permIds)
    },
    async submit() {
      await assignPermission({
        id: this.currentNode.id,
        // 当前树形组件中选中的节点
        // getCheckedKeys用于获取树形组件中选中的节的key所组成的数组
        permIds: this.$refs.treeRef.getCheckedKeys()
      })
      this.$message.success('权限分配成功')
      this.dialogClose()
    }
  }
}
</script>
