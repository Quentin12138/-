<template>
  <div class="employee-container">
    <div class="app-container">
      <PageTools>
        <template #left>
          <div class="tips">
            <i class="el-icon-info" />
            <span>共90条数据</span>
          </div>
        </template>
        <template #right>
          <!--按钮权限-->
          <!-- 先给按钮起一个前后端约定好的名字
          比如表格导出起名叫做aa
          判断后端接口的返回值中是否有aa这个字段
          如果有则说明当前用户可以操作这个按钮
          如果没有说明当前用户没有操作按钮的权限
          使用v- if让按钮隐藏不显示即可 -->
          <el-button v-if="$store.state.user.userInfo.roles.points.includes('aa')" type="danger" size="small" @click="handleDownoad">普通excel导出</el-button>
          <el-button v-access="'aa'" type="success" size="small" @click="$router.push('/import')">excel导入</el-button>
          <el-button type="primary" size="small" @click="showDialog">新增员工</el-button>
        </template>
      </PageTools>
      <el-card style="margin-top: 10px;">
        <el-table :data="list" border>
          <el-table-column label="序号" width="60" type="index" />
          <el-table-column label="姓名" sortable prop="username" />
          <el-table-column label="头像" width="100">
            <template #default="{row}">
              <img :src="row.staffPhoto" alt="" style="width:60px;height:60px;border-radius:50%">
            </template>
          </el-table-column>
          <el-table-column label="手机号" sortable prop="mobile" />
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column label="聘用形式" sortable>
            <template #default="{row}">
              {{ hierMap[+row.formOfEmployment] || '未知' }}
            </template>
          </el-table-column>
          <el-table-column label="部门" sortable prop="departmentName" />
          <el-table-column label="入职时间" width="180" sortable>
            <template #default="{row}">
              {{ formateDate(row.timeOfEntry) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="200">
            <template #default="{row}">
              <el-button type="text" size="small" @click="toDetail(row.id)">查看</el-button>
              <el-button type="text" size="small" @click="assignRoles(row)">分配角色</el-button>
              <el-button type="text" size="small" @click="del(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            :current-page="params.page"
            :page-size="params.size"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
    <addEmployee :dialog-visible="dialogVisible" @close="close" @update="fetchEmpolyeeList" />
    <el-dialog title="分配角色" :visible="assignRoleVisible" @close="assignRoleClose">
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <template #footer>
        <el-button size="small" @click="assignRoleClose">取消</el-button>
        <el-button size="small" type="primary" @click="submitRoles">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// import PageTools from '@/components/PageTools'
import { getEmployeeList, delEmployee, getRoleList, getUserDetailById, assignRoles } from '@/api'
import dayjs from 'dayjs'
import addEmployee from './components/add-employee.vue'
export default {
  components: {
    // PageTools
    addEmployee
  },
  data() {
    return {
      params: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      // 聘用形式的映射关系
      hierMap: {
        1: '正式',
        2: '非正式'
      },
      dialogVisible: false,
      assignRoleVisible: false,
      // 角色列表
      roleList: [],
      currentNode: {},
      // 当前员工选中的角色
      checkList: []
    }
  },
  created() {
    this.fetchEmpolyeeList()
  },
  methods: {
    async fetchEmpolyeeList() {
      const { data: { rows, total }} = await getEmployeeList(this.params)
      this.list = rows
      this.total = total
    },
    // 时间格式化
    formateDate(date) {
      // 时间类型的转换 将各种格式的date 转换成标准时间格式  这个方法可以放在当前页下 也可以放在utils下
      //
      return dayjs(date).format('YYYY-MM-DD')
    },
    handleCurrentChange(newPage) {
      this.params.page = newPage
      this.fetchEmpolyeeList()
    },
    showDialog() {
      this.dialogVisible = true
      // console.log(this.$store.state.user.userInfo)
    },
    close() {
      this.dialogVisible = false
    },
    // 删除员工
    del(row) {
      this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delEmployee(row.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        if (this.params.page > 1 && this.list.length === 1) {
          this.params.page--
        }
        this.fetchEmpolyeeList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleDownoad() {
      // 当handLeDownload方法被调用的时候才会将@/vendor/Export2Excel引入进来
      // 异步引入
      // 优点在于能够缩小首展文件的体积缩短加载时间
      // 动态引入 @/vendor/Export2Excel 包
      import('@/vendor/Export2Excel').then(async(excel) => {
        // 调用员工列表接口，获取要导出的员工列表
        const res = await getEmployeeList(this.params)
        // 数据转换
        // 表头
        const headerArr = ['姓名', '手机号', '入职日期', '工号', '聘用形式', '部门']
        // 中英对照关系
        const headerRelation = {
          '姓名': 'username',
          '手机号': 'mobile',
          '入职日期': 'timeOfEntry',
          '工号': 'workNumber',
          '聘用形式': 'formOfEmployment',
          '部门': 'departmentName'
        }
        // 根据员工列表数据、表头、中英文对应关系，将数据转换成二维数组
        const twoArr = this.getExportData(res.data.rows, headerArr, headerRelation)
        // 导出

        // excel：是 @/vendor/Export2Excel 包中的 excel 导出模块
   		  // export_json_to_excel：将 json 数据转换为 excel
        excel.export_json_to_excel({
        // 表头 header 必填，是一个数组
          header: headerArr,
          // 表格 body 具体数据，是一个二维数组
          data: twoArr,
          filename: 'excel-list', // 文件名称
          autoWidth: true, // 宽度是否自适应
          bookType: 'xlsx' // 生成的文件类型
        })
      })
    },
    // 表格导出数据处理
    getExportData(arr, headerArr, headerRelation) {
    //  [{}, {}, {}] => [[]， []，[]]
    // 1、定义一个结果数据towArr
    // 2、将原始数据遍历获取到其中的每一 项对象item
    // 3、定义一个二维数组中的字数组，
    // 4、便利headerArr 获取表格中需要展示的数组字段
    // 5、通过headerRe lat ion将中文的key转换成英文的key
    // 6、通过item[key] 获取到每一 个字段的value再将这个value push到子数组arr中
    // 7、将子数组push到towArr完成数据拼装
      const twoArr = []
      const hireMap = {
        1: '正式',
        2: '非正式'
      }
      arr.forEach(item => {
        const arr = []
        headerArr.forEach(key => {
          const englishKey = headerRelation[key]
          if (englishKey === 'formOfEmployment') {
            arr.push(hireMap[+item[englishKey]])
          } else {
            arr.push(item[englishKey])
          }
        })
        twoArr.push(arr)
      })
      console.log(twoArr)
      return twoArr
    },
    toDetail(id) {
      this.$router.push({
        path: '/employeeDetail',
        query: {
          id
        }
      })
    },
    async assignRoles(row) {
      this.currentNode = row
      const { data: { rows }} = await getRoleList()
      this.roleList = rows
      // 角色信息回显
      const { data: { roleIds }} = await getUserDetailById(row.id)
      this.checkList = roleIds || []
      this.assignRoleVisible = true
    },
    assignRoleClose() {
      this.assignRoleVisible = false
    },
    // 提交
    async submitRoles() {
      await assignRoles({
        id: this.currentNode.id,
        roleIds: this.checkList
      })
      this.$message.success('角色分配成功')
      this.assignRoleClose()
    }
  }
}
</script>

<style>

</style>
