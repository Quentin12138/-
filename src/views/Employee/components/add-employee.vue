<template>
  <el-dialog
    title="提示"
    :visible="dialogVisible"
    @close="close"
    @open="fetchEdpartmentList"
  >
    <span>弹窗</span>
    <!-- 表单 -->
    <el-form ref="addRef" :model="addForm" :rules="addRules" label-width="100px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="addForm.username" style="width:80%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addForm.mobile" style="width:80%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="addForm.timeOfEntry" style="width:80%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="addForm.formOfEmployment" style="width:80%" placeholder="请选择">
          <el-option
            v-for="item in hireMap"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="addForm.workNumber" style="width:80%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <!-- el-cascade r通常用于具有层级关系的数据的选择
          opt ions用于绑定带有层级数据的数据
          props用于配置级联选择器
          label配置展示给用户看的字段
          value配置后端传递的字段
          checkStrickly取消父子关联关系
          show-all-levels是否展示完整的路径关系 -->
        <el-cascader
          v-model="addForm.departmentName"
          style="width: 80%"
          :options="list"
          :props="departProps"
          :show-all-levels="false"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="addForm.correctionTime" style="width:80%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartmentList, addEmployee } from '@/api'
import findSon from '@/utils/findSon'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 聘用形式数据
      hireMap: [
        {
          id: 1,
          value: '正式'
        },
        {
          id: 2,
          value: '非正式'
        }
      ],
      addForm: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      addRules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: ['blur', 'change'] },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: ['blur', 'change'] }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: ['blur', 'change'] }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: ['blur', 'change'] }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: ['blur', 'change'] }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: ['blur', 'change'] }
        ]
      },
      list: [],
      // 级联选择器
      departProps: {
        label: 'name',
        value: 'name',
        checkStrictly: true
      },
      departList: []
    }
  },
  methods: {
    close() {
      this.$emit('close')
      // 表单重置
      this.$refs.addRef.resetFields()
      // 将departmentName手动重置
      this.addForm.departmentName = ''
    },
    // 获取部门数据
    async fetchEdpartmentList() {
      const res = await getDepartmentList()
      this.list = findSon(res.data.depts, '')
      console.log(this.list)
    },
    // 提交表单
    submit() {
      // 表单的兜底校验
      this.$refs.addRef.validate(async(valid) => {
        if (!valid) return false
        await addEmployee({
          ...this.addForm,
          // cscader组件返回的是一 个数组取值需要获取到数组中最后一 个元素传递给后端
          departmentName: this.addForm.departmentName[this.addForm.departmentName.length - 1]
        })
        this.$message.success('新增员工成功')
        this.close()
        this.$emit('update')
      })
    }
  }
}
</script>

<style>

</style>
