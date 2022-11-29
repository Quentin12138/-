<template>
  <el-dialog :title="title" :visible="dialogVisible" @close="close">
    <el-form ref="permissionRef" :model="permissionForm" :rules="permissionRules" label-width="80px">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="permissionForm.name" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="permissionForm.code" />
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input v-model="permissionForm.description" />
      </el-form-item>
      <el-form-item label="权限启用">
        <el-switch
          v-model="permissionForm.enVisible"
          active-value="1"
          inactive-value="0"
          active-text="启用"
          inactive-text="不启用"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { addPermission, getPermissionDetail, updatePermission } from '@/api'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 1
    },
    pid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      permissionForm: {
        name: '', // 权限名称
        code: '', // 权限标识
        description: '', // 权限描述
        enVisible: '0', // 权限启用标识
        type: '', // 类型 区分当前是添加菜单权限点还是按钮权限点
        pid: '' // 添加到哪个节点下，权限点的父id
      },
      permissionRules: {
        name: [
          { required: true, message: '请填写权限名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写权限标识', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title() {
      return this.permissionForm.id ? '编辑权限点' : '新增权限点'
    }
  },
  methods: {
    close() {
      this.$emit('close')
      this.$refs.permissionRef.resetFields()
      this.permissionForm = {
        name: '', // 权限名称
        code: '', // 权限标识
        description: '', // 权限描述
        enVisible: '0', // 权限启用标识
        type: '', // 类型 区分当前是添加菜单权限点还是按钮权限点
        pid: '' // 添加到哪个节点下，权限点的父id
      }
    },
    submit() {
      this.$refs.permissionRef.validate(async(valid) => {
        if (!valid) return false
        if (this.permissionForm.id) {
          await updatePermission(this.permissionForm)
        } else {
          await addPermission({
            ...this.permissionForm,
            type: this.type,
            pid: this.pid
          })
        }
        this.$message.success(this.tltle + '成功')
        this.close()
        this.$emit('update')
      })
    },
    async fetchDetail(id) {
      const { data } = await getPermissionDetail(id)
      this.permissionForm = data
    }
  }
}
</script>

<style>

</style>
