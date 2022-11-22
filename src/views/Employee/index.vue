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
          <el-button type="danger" size="small">普通excel导出</el-button>
          <el-button type="success" size="small">excel导入</el-button>
          <el-button type="primary" size="small" @click="showDialog">新增员工</el-button>
        </template>
      </PageTools>
      <el-card style="margin-top: 10px;">
        <el-table :data="list" border>
          <el-table-column label="序号" width="60" type="index" />
          <el-table-column label="姓名" sortable prop="username" />
          <el-table-column label="头像" prop="staffPhoto" />
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
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small">删除</el-button>
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
  </div>
</template>

<script>
// import PageTools from '@/components/PageTools'
import { getEmployeeList } from '@/api'
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
      dialogVisible: false
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
      console.log(123)
    },
    close() {
      this.dialogVisible = false
    }
  }
}
</script>

<style>

</style>
