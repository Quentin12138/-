<template>
  <div>
    <!-- 准备一个 echarts 渲染的 DOM 节点 -->
    <div ref="radar" style="width: 400px;height: 450px;" />
  </div>
</template>

<script>
// 导入 echarts
import * as echarts from 'echarts'

export default {
  mounted() {
    // mounted 中，可以拿到 DOM 了，所以我们在这里做 echarts 图表的初始化工作
    this.echartInit()
  },
  methods: {
    // 初始化
    echartInit() {
      // 获取 DOM 节点，并初始化 echarts 实例
      const myChart = echarts.init(this.$refs.radar)
      // 雷达图的 echarts 配置
      const option = {
        title: {
          text: 'Basic Radar Chart'
        },
        legend: {
          data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'Sales', max: 6500 },
            { name: 'Administration', max: 16000 },
            { name: 'Information Technology', max: 30000 },
            { name: 'Customer Support', max: 38000 },
            { name: 'Development', max: 52000 },
            { name: 'Marketing', max: 25000 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: 'Allocated Budget'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending'
              }
            ]
          }
        ]
      }
      // 把配置项数据，渲染到我图表中
      myChart.setOption(option)
    }
  }
}
</script>
