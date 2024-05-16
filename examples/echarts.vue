<template>
  <div ref="main" class="main"></div>
</template>

<script setup>
import { onMounted, defineProps, ref, watch, nextTick, watchEffect } from 'vue'
import * as echarts from 'echarts'
const main = ref(null)
const myChart = ref(null)
// 设置传入props
const { data, data1, LineName } = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  data1: {
    type: Array,
    default: () => []
  },
  LineName: {
    type: String,
    default: 'H'
  }
})

watch(data1 , () => {
  console.log(data1);
  if (myChart.value) {
    myChart.value.setOption({
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
          name: 'base',
          data: data,
          type: 'line',
        },
        {
          name: 'cube',
          data: data1,
          type: 'line',
        }
      ]
    })
  }
})
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  myChart.value = echarts.init(main.value)
  // 绘制图表

  window.addEventListener('resize', () => {
    myChart.value.resize()
  })
})
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>