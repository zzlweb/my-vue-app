<template>
  <div class="main"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('main'))
  // 绘制图表
  myChart.setOption({
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [11, 22, 33, 45, 56, 64, 69, 74, 78, 80],
        type: 'line'
      }
    ]
  })
})
</script>

<style lang="less" scoped>
</style>