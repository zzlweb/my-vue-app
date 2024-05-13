<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from '@vue/runtime-core'
// import { generate } from 'ued-xxxxxxxxx'

import { generate } from '../src'

onMounted(() => {
  colors1.value = generate(primaryColor1.value, { colorArray: true, dark: false })
  colors2.value = generate(primaryColor2.value, { colorArray: true, dark: false })
  colors3.value = generate(primaryColor3.value, { colorArray: true, dark: false })
  colors4.value = generate(primaryColor4.value, { colorArray: true, dark: false })
})

const primaryColor1 = ref<string>('#3E51AD')
const primaryColor2 = ref<string>('#3EADA9')
const primaryColor3 = ref<string>('#3EADA9')
const primaryColor4 = ref<string>('#3EADA9')
let colors1 = ref<string[]>([])
let colors2 = ref<string[]>([])
let colors3 = ref<string[]>([])
let colors4 = ref<string[]>([])

// const onChange = (color: string) => {
//   colors.value = generate(color);
// }
</script>

<template>
  <div class="examples">
    <div class="flex-row box">
      <div class="colors">
        <div class="wrapper">
          <div class="primary-color">主色: {{ primaryColor1 }}</div>
        </div>
        <template v-for="(item, index) of colors1" :key="index">
          <div class="colors-item" :style="{ backgroundColor: item }">{{ item }}</div>
        </template>
      </div>
      <div class="colors">
        <template v-for="(item, index) of colors2" :key="index">
          <div class="colors-item" :style="{ backgroundColor: item }">{{ item }}</div>
        </template>
      </div>
      <div class="colors">
        <template v-for="(item, index) of colors3" :key="index">
          <div class="colors-item" :style="{ backgroundColor: item }">{{ item }}</div>
        </template>
      </div>
      <div class="colors">
        <template v-for="(item, index) of colors4" :key="index">
          <div class="colors-item" :style="{ backgroundColor: item }">{{ item }}</div>
        </template>
      </div>
    </div>
  </div>
</template>



<style scoped >
.examples {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: cubic-bezier(0, 0.5, 0.5, 1);
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



