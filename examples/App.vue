<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from '@vue/runtime-core'
import lineEcharts from './echarts.vue'
import { generate } from '../src'

onMounted(() => {
  colors1.value = generate(primaryColor1.value, { colorArray: true, dark: false })
})

const primaryColor1 = ref<string>('#3E51AD')


let colors1 = ref<string[]>([])
let Hdata = ref<number[]>([229, 228, 228, 229, 230, 230, 229, 230, 231, 233 ])
let Sdata = ref<number[]>([1.1, 2.2, 3.3, 4.5, 5.6, 6.4, 6.9, 7.4, 7.8, 8.0])
let Vdata = ref<number[]>([99, 98, 95, 88,  80, 68, 56, 45, 32, 20])

// const onChange = (color: string) => {
//   colors.value = generate(color);
// }

</script>

<template>
  <div class="examples">
    <div class="echarts-container flex-row">
      <line-echarts :LineName="'H'" :data="Hdata" />

      <line-echarts :LineName="'S'" :data="Sdata" />

      <line-echarts :LineName="'V'" :data="Vdata" />
    </div>
    <div class="flex-row box">
      <div class="colors">
        <div class="wrapper">
          <div class="primary-color">主色: {{ primaryColor1 }}</div>
        </div>
        <template v-for="(item, index) of colors1" :key="index">
          <div class="colors-item" :style="{ backgroundColor: item }">{{ item }}</div>
        </template>
      </div>
    </div>
  </div>
</template>



<style scoped lang="less">
.examples {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: cubic-bezier(0.5, 0, 1, 0.5);
}

.echarts-container {
  height: 500px;
  width: 100%;
  display: flex;
  gap: 50px;

  .main {
    flex: 1;
    width: 33.33%;
  }
}

.wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.primary-color {
  font-size: 22px;
  font-weight: 500;
  margin-right: 20px;
}

.colors {
  border-radius: 8px;
}

.colors-item {
  width: 400px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  padding: 0 20px;
  font-size: 12px;
  cursor: pointer;
  color: #fff;
}

.info {
  display: block;
  font-size: 12px;
  margin-top: 20px;
}

.box {
  display: flex;
  flex-wrap: wrap;
  gap: 10%;
}
</style>



