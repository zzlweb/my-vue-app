<template>
  <div ref="main" class="main"></div>
</template>

<script setup>
import { onMounted, defineProps, ref } from 'vue'
import * as echarts from 'echarts'
const main = ref(null)
// 设置传入props
const { data, LineName } = defineProps({
  data: {
    type: Array,
    default: () => []
  }, 
  LineName: {
    type: String, 
    default: 'H'
  }
})

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  console.log(main.value);
  var myChart = echarts.init(main.value)
  // 绘制图表
  myChart.setOption({
    title: {
      text: LineName
    },
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data,
        type: 'line',
        smomth: true
      },
      {
        data: data,
        type: 'line',
        smomth: true
      }
    ]
  })
})
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>