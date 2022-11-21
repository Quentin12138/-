<template>
  <div class="department-container">
    <div class="app-container">
      <!--
        新组件库使用的注意事项
        1、熟悉组件库中有哪些现有的组件  对应常用组件 card form(input,readio,checkbox,select,cascader,button) table pagitaion upload
        2、根据ui设计图找到对应的组件 将最合适的组件实例代码cv到项目中
        3、根据实际项目需求进行修改
        4、如果有新的属性和方法看一下组件库中当前组件的文档（属性attribute,methods,slot）
        5、根据实际需要定制自己的组件
       -->
      <!-- 面板结构 -->
      <el-card>
        <!-- 头部 -->
        <!-- 行列布局：栅格布局，将一行分为 24 份，每列占多少份由 el-col 身上的 span 属性决定。 -->
        <!-- type：flex 启用弹性布局。默认是使用的浮动布局 -->
        <!-- justify：flex 布局下的水平排列方式 -->
        <!-- align：flex 布局下的垂直排列方式 -->
        <tree-tools :node-data="company" :is-root="true" @addDep="addDep" />
        <el-tree :data="list" :props="defaultProps" default-expand-all>
          <template #default="{ data }">
            <tree-tools :node-data="data" @addDep="addDep" @delDep="delDep" @editDep="editDep" />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- el-dialog组件一般放在根标签的末尾 -->
    <el-dialog
      :title="departForm.id ? '编辑部门' : '添加子部门'"
      :visible.sync="dialogVisible"
      width="40%"
      @open="dialogOpen"
      @close="closeDialog"
    >
      <!-- 表单内容 -->
      <el-form ref="departRef" :model="departForm" :rules="departRules" label-width="120px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="departForm.name" style="width:80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="departForm.code" style="width:80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select v-model="departForm.manager" style="width:80%" placeholder="请选择">
            <el-option
              v-for="item in employeeList"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="departForm.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" />
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDep">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getDepartmentList, getSimpliList, addDepartment, delDepartment, editDepartment, getDepartment } from '@/api'
import findSon from '@/utils/findSon'
export default {
  components: {
    treeTools
  },
  data() {
    // 自定义校验项
    // 同级部门不能出现相同的部门名称
    const validateName = (rules, value, callback) => {
      let broArr = []
      if (this.departForm.id) {
        // 当前是编辑状态
        if (this.currentNode.name === value) {
          // 并且没有修改过部门名称
          callback()
          return
        } else {
          // 如果修改了部门名称
          broArr = this.originList.filter(item => this.currentNode.pid === item.pid)
        }
      } else {
        broArr = this.originList.filter(item => this.currentNode.id === item.pid)
      }
      // 1、先找到添加子部门元素下的所有其他子部门
      // const broArr = this.originList.filter(item => this.currentNode.id === item.pid)
      // 当前数据的值value不能和broArr中任意一个元素中的name字段一致
      const isSame = broArr.some(item => item.name === value)
      if (isSame) {
        callback(new Error(`同级部门下已经有${value}这个部门了`))
      } else {
        callback()
      }
    }
    // 部门编码不能和其他任何部门一致
    const validateCode = (rules, value, callback) => {
      if (this.departForm.id && this.currentNode.code === value) {
        callback()
        return
      }
      if (this.originList.some(item => item.code === value)) {
        callback(new Error('部门编码不能和其他任何部门一致'))
      } else {
        callback()
      }
    }

    return {
      list: [],
      originList: [],
      currentNode: {},
      // 部门负责人列表
      employeeList: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      company: { name: '', manager: '负责人', id: '' },
      // 弹窗关闭
      dialogVisible: false,
      departForm: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      departRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: ['blur', 'change'] },
          { validator: validateName, trigger: 'change' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: ['blur', 'change'] },
          { validator: validateCode, trigger: 'change' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: ['blur', 'change'] }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {

  },
  created() {
    this.fetchDepartmentList()
  },
  methods: {
    async fetchDepartmentList() {
      const res = await getDepartmentList()
      this.list = findSon(res.data.depts, '')
      this.company.name = res.data.companyName
      // 获取原始数据
      this.originList = res.data.depts
    },
    // 添加子部门
    addDep(value) {
      this.dialogVisible = true
      this.currentNode = value
    },
    async dialogOpen() {
      const { data } = await getSimpliList()
      this.employeeList = data
    },
    // 关闭弹窗时的回调
    closeDialog() {
      this.dialogVisible = false
      // 关闭弹窗的同时重置表单数据和校验结果
      this.$refs.departRef.resetFields()
    },
    // 提交事件
    submitDep() {
      // 1、兜底校验
      // 2、接口的声明
      // 3、接口引入
      // 4、接口调用
      // 5、收集整理参数
      // 6、关闭弹窗
      // 7、提示用户新增成功
      // 8、重新渲染页面
      // 9、表单的数据和校验的重置
      this.$refs.departRef.validate(async(valid) => {
        if (!valid) return false
        if (this.departForm.id) {
          // 编辑
          await editDepartment(this.departForm)
        } else {
          // 新增
          await addDepartment({
            ...this.departForm,
            pid: this.currentNode.id
          })
        }

        this.closeDialog()
        this.$message.success(this.departForm.id ? '编辑部门成功' : '添加子部门成功')
        this.fetchDepartmentList()
      })
    },
    // 删除部门
    delDep(val) {
      // 1. 询问用户
      this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 2. 调用接口
        await delDepartment(val.id)
        // 3. 提示用户
        this.$message.success('删除成功!')
        // 4. 刷新列表
        this.fetchDepartmentList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改部门
    async editDep(val) {
      // 1、编辑功能复用了新增的弹窗
      // 2、点击编辑按钮 触发绑定的点击事件 通知父组件
      // 3、父组件中接收子传父事件 显示新增弹窗
      // 4、在打开弹窗的时候需要调用获取详情数据的接口，对表单做赋值回显
      // 5、 处理编辑逻辑和新增逻辑的不同  可以根据是否有id判断是新增还是编辑
      // 6、对校验逻辑，标题，提交之后的提示，提交接口进行修改
      // 7、 定义接口，接口引入，接口调用
      // 8、关闭弹窗、提示用户、清空表单数据和校验、重新渲染页面
      this.currentNode = val
      const { data } = await getDepartment(val.id)
      this.departForm = data
      this.dialogVisible = true
    }
  }

}
</script>

<style>

</style>
