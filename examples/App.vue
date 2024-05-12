<script setup lang="ts">
  import { ref } from 'vue';
  import { onMounted } from '@vue/runtime-core';
  // import { generate } from 'ued-xxxxxxxxx'

  import  { generate } from '../src'

  onMounted(() => {
    colors.value = generate( primaryColor.value, {colorArray : true, dark: false })
  })

  const primaryColor = ref<string>('#5068ca');
  let colors = ref<string[]>([]);

  // const onChange = (color: string) => {
  //   colors.value = generate(color);
  // }

</script>

<template>
  <div class="examples">
    <div class="wrapper">
      <div class="primary-color">主色: {{ primaryColor }}</div>
      <el-color-picker v-model="primaryColor" @change="onChange"/>
    </div>

    <div class="colors">
      <template v-for="(item, index) of colors" :key="index">
          <div class="colors-item" :style="{backgroundColor: item}" >{{ item }}</div>
      </template>
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

}
.wrapper {
display: flex;
align-items: center;
margin-bottom: 20px;
}

.primary-color {
color: #5c6b77;
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
}

.info {
display: block;
color: #5c6b77;
font-size: 12px;
margin-top: 20px;
}
</style>



