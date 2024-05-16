<template>
  <div ref="main" class="main"></div>
</template>

<script setup>
import { onMounted, defineProps, ref, watch, nextTick, watchEffect } from 'vue'
import * as echarts from 'echarts'
const main = ref(null)
const myChart = ref(null)
// 设置传入props
// 设置传入props    
const props = defineProps({    
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

const updateChart = () => {    
  if (myChart.value) {    
    myChart.value.setOption({    
      title: {    
        text: props.LineName    
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
          data: props.data,    
          type: 'line',    
        },    
        {    
          name: 'cube',    
          data: props.data1,    
          type: 'line',    
        }    
      ]    
    })    
  }    
}  

watch(props , () => {
    nextTick(() => {    
    updateChart()    
  })   
})
    
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  myChart.value = echarts.init(main.value)
  // 绘制图表

  updateChart()

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