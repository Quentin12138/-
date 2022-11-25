<template>
  <div>
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      Drop excel file here or
      <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
        Browse
      </el-button>
    </div>
  </div>
</template>

<script>
// 这里是 xlsx 的最新导入形式
import * as XLSX from 'xlsx'

export default {
  props: {
    // 上传 excel 文件之前，对文件格式、大小等校验工作
    beforeUpload: Function, // eslint-disable-line
    // 解析 excel 成功之后的回调函数
    onSuccess: Function// eslint-disable-line
  },
  data() {
    return {
      // 上传按钮的 loading
      loading: false,
      // 解析后的 excel 数据
      excelData: {
        // excel 表头数据
        header: null,
        // excel 表体数据
        results: null
      }
    }
  },
  methods: {
    // 将转换好的 excel 数据，传递给 excelData，并调用 onSuccess，将 excelData 数据传给组件的使用者。
    generateData({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
    },
    // 处理拖拽操作
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const rawFile = files[0] // only use files[0]

      if (!this.isExcel(rawFile)) {
        this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    // 文件进入拖拽区域
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    // 模拟文件点击
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    // 获取用户选择的文件
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      // 读取文件
      this.upload(rawFile)
    },
    // 处理选择的文件
    upload(rawFile) {
      // 将文件读取后的 input file 的 value 设置为 null，方便下次读取
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel
      // 如果用户没传上传之前的校验函数
      if (!this.beforeUpload) {
        // 直接读取文件数据
        this.readerData(rawFile)
        return
      }
      // 用户传递了上传之前的校验函数，将文件传入函数，进行文件格式的校验
      const before = this.beforeUpload(rawFile)
      // 校验通过
      if (before) {
        // 开始读取文件数据
        this.readerData(rawFile)
      }
    },
    // 读取 excel 文件，得到 excel 里面的数据
    readerData(rawFile) {
      // 开启按钮 loading
      this.loading = true
      return new Promise((resolve, reject) => {
        // 创建文件读取器
        const reader = new FileReader()
        // 监听文件读取后触发的回调函数
        reader.onload = e => {
          // 文件读取后的结果
          const data = e.target.result
          // 使用 XLSX，将 excel 文件转换为数据
          // 读取 ArrayBuffer 格式的文件，并返回工作簿
          const workbook = XLSX.read(data, { type: 'array' })
          // 拿到第一个工作表名称
          const firstSheetName = workbook.SheetNames[0]
          // 读取第一个工作表
          const worksheet = workbook.Sheets[firstSheetName]
          // 得到 excel 表头数据
          const header = this.getHeaderRow(worksheet)
          // 得到 excel 表体数据
          const results = XLSX.utils.sheet_to_json(worksheet)
          // 调用 generateData 方法，传入表头和表体数据
          this.generateData({ header, results })
          // 结束按钮 loading
          this.loading = false
          resolve()
        }
        // 读取文件并转换为 ArrayBuffer 格式的数据
        reader.readAsArrayBuffer(rawFile)
      })
    },
    // 获取 excel 表头信息
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    // 判断是否为 excel 文件
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    }
  }
}
</script>

<style scoped>
.excel-upload-input{
  display: none;
  z-index: -9999;
}
.drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
