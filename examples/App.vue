<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { onMounted } from '@vue/runtime-core'
import lineEcharts from './echarts.vue'
import { generate } from '../src'
import sketch from './sketch.vue'

onMounted(() => {
  colors1.value = generate(primaryColor1.value, { colorArray: true, dark: false })
  colors1.value.map((item) => {
    Hdata1.value.push(item.hue())
    Sdata1.value.push(item.saturationv())
    Vdata1.value.push(item.value())
  })
})

// const primaryColor1 = ref<string>('#3e51ad')
const primaryColor1 = ref<string>('#E43CD3')
const showSketch = ref<boolean>(true)

let colors1 = ref<string[]>([])
let Hdata = ref<number[]>([229, 228, 228, 229, 230, 230, 229, 230, 231, 233])
let Sdata = ref<number[]>([11, 22, 33, 45, 56, 64, 69, 74, 78, 80])
let Vdata = ref<number[]>([99, 98, 95, 88, 80, 68, 56, 45, 32, 20])

let Hdata1 = ref<number[]>([])
let Sdata1 = ref<number[]>([])
let Vdata1 = ref<number[]>([])

const onChange = (color: string) => {
  colors1.value = generate(color, { colorArray: true, dark: false })
  // console.log(colors1.value);
  
  Hdata1.value = colors1.value.map(item => item.hue())
  Sdata1.value = colors1.value.map(item => item.saturationv())
  Vdata1.value = colors1.value.map(item => item.value())

  console.log(Vdata1.value);
  
}

const colorHex = (data: any) => {
  primaryColor1.value = '#' + data.hex
  onChange('#' + data.hex)
}

const handleBlur = () => {
  showSketch.value = false
}
</script>

<template>
  <div class="examples">
    <div class="echarts-container flex-row">
      <line-echarts :LineName="'H'" :data="Hdata" :data1="Hdata1" />

      <line-echarts :LineName="'S'" :data="Sdata" :data1="Sdata1" />

      <line-echarts :LineName="'V'" :data="Vdata" :data1="Vdata1" />
    </div>
    <div class="flex-row box">
      <div class="colors">
        <div class="wrapper" @blur="handleBlur">
          <sketch :hex="primaryColor1" @colorHex="colorHex" v-if="showSketch"></sketch>
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
  transition: cubic-bezier(0, 1, 1, 0);
}

.echarts-container {
  height: 500px;
  width: 100%;
  overflow: hidden;
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

.changeTheme {
  position: relative;
  margin-right: 20px;
  cursor: pointer;

  .colorPan {
    position: absolute;
    right: 0;
    z-index: 999;
  }

  .colorPanBtn {
    margin: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);

    img {
      width: 150%;
      margin-top: -25%;
      margin-left: -25%;
    }
  }
}
</style>



