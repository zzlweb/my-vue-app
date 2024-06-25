<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { onMounted } from '@vue/runtime-core'
import lineEcharts from './components/echarts.vue'
import { generate } from '../src'
import { hexToHSV, clipboard } from './assets/utils.ts'
import sketch from './components/sketch.vue'
import { message } from 'ant-design-vue'

const init = (color: string) => {
  colors1.value = generate(color, { colorArray: true, dark: false, format: 'hex' })
  Hdata1.value = []
  Sdata1.value = []
  Vdata1.value = []
  colors1.value.map((item) => {
    Hdata1.value.push(hexToHSV(item)[0] * 360)
    Sdata1.value.push(hexToHSV(item)[1] * 100)
    Vdata1.value.push(hexToHSV(item)[2] * 100)
  })
}

const handleCopy = (item: any) => {
  if (item) {
    clipboard(`${item}`)
      .then(() => {
        message.success('Copy Success!')
      })
      .catch(() => {
        message.error('Copy Failed! Please try again.')
      })
  }
}

const colorHex = (data: any) => {
  primaryColor.value = '#' + data.hex
  init('#' + data.hex)
}

const handleBlur = () => {
  showSketch.value = false
}

onMounted(() => {
  init(primaryColor.value)
})

const primaryColor = ref<string>('#3e51ad')
const showSketch = ref<boolean>(true)

let colors1 = ref<string[]>([])
// 默认
let Hdata = ref<number[]>([229, 228, 228, 229, 230, 230, 229, 230, 231, 233])
let Sdata = ref<number[]>([11, 22, 33, 45, 56, 64, 69, 74, 78, 80])
let Vdata = ref<number[]>([99, 98, 95, 88, 80, 68, 56, 45, 32, 20])
// 切换
let Hdata1 = ref<number[]>([])
let Sdata1 = ref<number[]>([])
let Vdata1 = ref<number[]>([])

// 默认展示颜色
const defaultTemplate = ['#3e51ad','#3EAD70', '#523EAD', '#A43EAD', '#84AD3E']

const handelTemplate = (data:string) => {
    primaryColor.value = data
    init(data)
    message.success('切换颜色成功')
}
</script>

<template>
  <div class="page">
    <div class="header">
    </div>
    <div class="examples">
      <div class="box">
        <div class="colors-panel">
          <div class="wrapper" @blur="handleBlur">
            <sketch :hex="primaryColor" @colorHex="colorHex" v-if="showSketch"></sketch>
          </div>
          <template v-for="(item, index) of colors1" :key="index">
            <div class="colors-item" :style="{ backgroundColor: item }" @click="handleCopy(item)">{{ item }}</div>
          </template>

          <div class="colors-template ">
            <div class="color-box" v-for="item in defaultTemplate" :key="item" @click="handelTemplate(item)" :style="{ backgroundColor: `${item}`}"></div>
          </div>
        </div>
      </div>
      <div class="echarts-container">
        <line-echarts :LineName="'H'" :data="Hdata" :data1="Hdata1" />
        <line-echarts :LineName="'S'" :data="Sdata" :data1="Sdata1" />
        <line-echarts :LineName="'V'" :data="Vdata" :data1="Vdata1" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.examples {
  width: 100%;
  height: calc(100% - 150px);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: cubic-bezier(0, 1, 1, 0);
  position: relative;

  .bg {
    position: absolute;
    top: 0;
    width: 100%;
  }

  .colors-template {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 50px;

    .color-box {
      width: 28px;
      height: 28px;
      padding: 4px;
      box-sizing: border-box;
      border: 1px solid #ededed;
      cursor: pointer;
    }
  }
}

.header {
  height: 150px;
  background: url('./assets/bg.png');
  background-size: cover;
  object-fit: cover;
}

.box {
  width: 50vw;
  justify-content: center;
  align-items: center;
  display: flex;
  height: calc(100vh - 150px);
  position: relative;
  top: -100px;
}

.echarts-container {
  width: 50vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 50px 0;

  .main {
    height: 300px;
    width: 70%;
    margin: 0 15%;

    > div {
      margin: 10px auto;
    }
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
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
  cursor: pointer;
  transition: all 0.2s;
  height: 44px;
  text-align: center;
  line-height: 44px;
  padding: 0 20px;
  font-size: 12px;
  cursor: pointer;
  color: #fff;

  &:hover {
    width: calc(100% + 10px);
    border-radius: 0px 4px 4px 0;
  }
}

.info {
  display: block;
  font-size: 12px;
  margin-top: 20px;
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



