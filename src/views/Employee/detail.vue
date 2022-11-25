<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card><!-- 表单 -->
        <el-form ref="userInfoRef" label-width="120px" :model="userInfoForm" :rules="userInfoRules" style="margin-left: 120px; margin-top:30px">
          <el-form-item label="姓名:" prop="username">
            <el-input v-model="userInfoForm.username" style="width:300px" />
          </el-form-item>

          <el-form-item label="手机">
            <el-input v-model="userInfoForm.mobile" disabled style="width:300px" />
          </el-form-item>

          <el-form-item label="入职时间">
            <el-date-picker
              v-model="userInfoForm.timeOfEntry"
              type="date"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>

          <el-form-item label="员工头像" />

          <!-- 保存个人信息 -->
          <el-row class="inline-info" type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary">保存更新</el-button>
              <el-button @click="$router.back()">返回</el-button>
            </el-col>
          </el-row>
        </el-form></el-card>
    </div>
  </div>
</template>

<script>
import { getUserdetailByid } from '@/api'
export default {
  data() {
    return {
      userInfoForm: {
        username: '',
        mobile: '',
        timeOfEntry: '',
        staffPhoto: ''
      },
      userInfoRules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchEmployeeDetail()
  },
  methods: {
    async fetchEmployeeDetail() {
      // console.log(this.$router)
      // console.log(this.$route)
      // $router和$ route的区别
      // $router路由的实例
      // $route路由的对象$route相当于this.$router.currentRoute

      // await getUserdetailByid(this.$router.currentRoute.query.id)
      const { data } = await getUserdetailByid(this.$route.query.id)
      this.userInfoForm = data
    }
  }
}
</script>

<style>

</style>
