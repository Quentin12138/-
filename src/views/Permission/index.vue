<template>
  <div class="permission-container">
    <div class="app-container">
      <el-card>
        <div style="text-align:right;margin-top:20px">
          <el-button type="primary" size="small" style="" @click="add(1,'0')">
            添加权限
          </el-button>
        </div>
        <el-table border :data="list" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template #default="{row}">
              <el-button type="text" size="small" @click="add(2,row.id)">添加</el-button>
              <el-button type="text" size="small" @click="edit(row)">编辑</el-button>
              <el-button type="text" size="small" @click="del(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <permission-dialog ref="permissionRef" :dialog-visible="showDialog" :type="type" :pid="pid" @close="close" @update="fetchPermissionList" />
  </div>
</template>

<script>
import { getPermissionList, delPermission } from '@/api'
import findSon from '@/utils/findSon'
import permissionDialog from './component/permission-dialog'
export default {
  components: { permissionDialog },
  data() {
    return {
      list: [],
      showDialog: false,
      type: 1,
      pid: ''
    }
  },
  created() {
    this.fetchPermissionList()
  },
  methods: {
    async fetchPermissionList() {
      const { data } = await getPermissionList()
      // 根节点的pid 是前端和后端共同约定
      this.list = findSon(data, '0')
      console.log(this.list)
    },
    add(type, pid) {
      this.showDialog = true
      this.type = type
      this.pid = pid
    },
    close() {
      this.showDialog = false
    },
    async edit(row) {
      console.log(this.$refs.permissionRef)
      await this.$refs.permissionRef.fetchDetail(row.id)
      this.showDialog = true
    },
    del(row) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delPermission(row.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetchPermissionList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>

</style>
