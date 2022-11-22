<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- 新增角色按钮 -->
        <el-row style="height:60px">
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
            @click="addRole"
          >新增角色</el-button>
        </el-row>
        <!-- 表格 -->
        <el-table :data="list">
          <el-table-column label="序号" align="center" type="index" width="120" />
          <el-table-column label="角色名称" prop="name" align="center" width="240" />
          <el-table-column label="描述" prop="description" align="center" />
          <el-table-column label="操作" width="240" fixed="right">
            <template #default="{ row }">
              <el-button size="small">分配权限</el-button>
              <el-button size="small" @click="edit(row.id)">编辑</el-button>
              <el-button size="small" type="danger" @click="del(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            :current-page="params.page"
            :page-size="params.pagesize"
            :total="total"
            layout="total,prev,pager,next"
            @current-change="pageChange"
          />
        </el-row>
      </el-card>
    </div>
    <el-dialog title="新增角色" :visible="dialogVisibal" @close="close">
      <el-form ref="roleRef" :rules="roleRules" :model="roleForm" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisibal = false">
          取消
        </el-button>
        <el-button type="primary" @click="submit">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, addRole, getRoleDetail, editRoleDetail, delRole } from '@/api'
export default {
  data() {
    return {
      list: [],
      roleForm: {
        name: '',
        description: ''
      },
      roleRules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { message: '角色描述不能为空', trigger: 'blur' }
        ]
      },
      params: {
        page: 1, // 当前是第几页
        pagesize: 10// 一页有多少条
      },
      total: 0, // 总条数
      dialogVisibal: false
    }
  },
  created() {
    this.fetchRoleList()
  },
  methods: {
    async fetchRoleList() {
      const { data: { rows, total }} = await getRoleList(this.params)
      this.list = rows
      this.total = total
    },
    pageChange(newPage) {
      this.params.page = newPage
      this.fetchRoleList()
    },
    // 新增角色
    addRole() {
      this.dialogVisibal = true
    },
    // 关闭弹窗
    close() {
      this.dialogVisibal = false
      // 重置表单数据 重置校验结果
      this.$refs.roleRef.resetFields()
      this.roleForm = {
        name: '',
        descriptionL: ''
      }
    },
    // 表单提交
    submit() {
      this.$refs.roleRef.validate(async(valid) => {
        if (!valid) return
        if (this.roleForm.id) {
          await editRoleDetail(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }

        this.$message.success('新增角色成功')
        this.close()
        this.fetchRoleList()
      })
    },
    async edit(id) {
      this.dialogVisibal = true
      if (id) {
        const { data } = await getRoleDetail(id)
        this.roleForm = data
      }
    },
    del(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delRole(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetchRoleList()
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
