<template>
  <div>
    <!-- action：上传的接口地址 -->
    <!-- show-file-list：是否展示文件列表 -->
    <!-- before-upload：上传之前对文件的限制处理（校验）：格式、大小等 -->
    <!-- http-request：覆盖默认的上传行为，可以自定义上传的实现 -->
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="upload"
    >
      <!-- 上传后展示的图片 -->
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <!-- 默认的加号图片 -->
      <i v-else class="el-icon-plus avatar-uploader-icon" />
      <!-- 加载进度条 -->
      <el-progress v-show="isShow" type="circle" :percentage="percent" class="progress" />
    </el-upload>
  </div>
</template>
<script>
// 引入 COS 模块
const COS = require('cos-js-sdk-v5')
// 实例化对象
const cos = new COS({
  SecretId: 'AKIDaBkCRSFtWBfy5ze8QWRBk5HMH1Z4Sgia', // 身份识别 ID
  SecretKey: 'kKn6HIDyiJhYGrGdr1zlaJpALL7fEetv' // 身份秘钥
})
export default {
  // 一个组件上的v-model 默认会利用名为value的prop和名为input的事件，
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageUrl: '',
      isShow: false,
      percent: 0
    }
  },
  // 在watch中实现对异步数据监听
  watch: {
    value() {
      this.imageUrl = this.value
    }
  },
  methods: {
    // 上传之前对文件的限制处理：格式、大小等
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 自定义上传
    upload(file) {
      // obj：上传的相关信息
      // obj.file 就是我们选择的文件
      // console.log(obj)
      if (file) {
        // 上传到腾讯云
        this.isShow = true
        cos.putObject({
          Bucket: 'wzhao-1305796389', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-beijing', /* 存储桶所在地域，例如 ap-beijing，必须字段 */
          Key: file.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          // StorageClass: 'STANDARD', // 上传模式, 标准模式
          Body: file.file, // 上传文件对象
          onProgress: (progressData) => { // 上传进度
            console.log(JSON.stringify(progressData))
            this.percent = progressData.percent * 100
          }
        }, (err, data) => {
          console.log(err || data)
          // 上传成功之后
          if (data.statusCode === 200) {
            // data.Location 就是返回的图片地址
            setTimeout(() => {
              this.isShow = false
            }, 500)
            this.imageUrl = `https:${data.Location}`
            this.$emit('input', this.imageUrl)
          }
        })
      }
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.progress {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #fff;
}
</style>
