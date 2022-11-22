<template>
  <el-card>
    <div class="page-tools">
      <div class="left">
        <slot name="left" />
        <!-- <div class="tips">
          <i class="el-icon-info" />
          <span>共90条数据</span>
        </div> -->
      </div>
      <div class="right">
        <slot name="right" />
        <!--
        <el-button type="danger" size="small">普通excel导出</el-button>
        <el-button type="success" size="small">excel导入</el-button>
        <el-button type="primary" size="small">新增员工</el-button> -->
      </div>
    </div>
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.page-tools{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::v-deep .tips{
  border: 1px solid #91d5ff;
  padding: 6px 8px;
  border-radius: 4px;
  background-color: #e6f7ff;
  font-size: 12px;
  i{
    color: #409eff;
    padding-right: 6px;
  }
}
</style>
