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
        <tree-tools :node-data="company" :is-root="true" />
        <el-tree :data="list" :props="defaultProps" default-expand-all>
          <template #default="{ data }">
            <tree-tools :node-data="data" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getDepartmentList } from '@/api'
import findSon from '@/utils/findSon'
export default {
  components: {
    treeTools
  },
  data() {
    return {
      list: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      company: { name: '', manager: '负责人', id: '' }
    }
  },
  created() {
    this.fetchDepartmentList()
  },
  methods: {
    async fetchDepartmentList() {
      const res = await getDepartmentList()
      console.log(res)
      console.log(findSon(res.data.depts, ''))
      this.list = findSon(res.data.depts, '')
      this.company.name = res.data.companyName
    }
  }

}
</script>

<style>

</style>
