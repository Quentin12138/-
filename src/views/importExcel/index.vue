<template>
  <div>
    <UploadExcel :on-success="onSuccess" :before-upload="beforeUpload" />
  </div>
</template>

<script>
import { batch } from '@/api'
import { formatDate } from '@/utils'
export default {
  methods: {
    async onSuccess({ results, header }) {
      // console.log(results)
      // console.log(header)
      console.log('上传完成', results, header)

      const headerRelation = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '工号': 'workNumber',
        '聘用形式': 'formOfEmployment',
        '部门': 'departmentName',
        '转正日期': 'correctionTime'
      }
      const data = this.getImportData(results, headerRelation)
      await batch(data)
      this.$message.success('导入成功')
      this.$router.push('/employee')
    },
    getImportData(results, headerRelation) {
      const resArr = []
      results.forEach(element => {
        const obj = {}
        Object.keys(element).forEach((key) => {
          // 表格上传的时间会被转换成和1900年1月1日的天数差值
          // TODO
          // 判断如果当前的英文key在数组中存在的话 就将它转换成标准的时间
          if (['timeOfEntry', 'correctionTime'].includes(headerRelation[key])) {
            obj[headerRelation[key]] = formatDate(element[key])
          } else {
            obj[headerRelation[key]] = element[key]
          }
        })
        resArr.push(obj)
      })
      return resArr
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }

      this.$message({
        message: '文件体积不能超过1M',
        type: 'warning'
      })
      return false
    }
  }
}
</script>

<style>

</style>
