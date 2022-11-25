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
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <permission-dialog :dialog-visible="showDialog" :type="type" :pid="pid" @close="close" @update="fetchPermissionList" />
  </div>
</template>

<script>
import { getPermissionList } from '@/api'
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
    }
  }
}
</script>

<style>

</style>
