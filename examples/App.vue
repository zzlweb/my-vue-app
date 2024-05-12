<script setup lang="ts">
  import { ref } from 'vue';
  import { onMounted } from '@vue/runtime-core';
  import { generate } from 'ued-xxxxxxxxx'

  // import  { generate } from '../src'

  onMounted(() => {
    generate()
  })

  // const primaryColor = ref<string>('#099dfd');
  // let colors = ref<string[]>([]);

  // const onChange = (color: string) => {
  //   colors.value = generate(color);
  // }

  // onMounted(() => {
  //   colors.value = generate(primaryColor.value);
  // })
</script>

<template>
  <div class="examples">
    <!-- <div class="wrapper"> -->
      1
      1111
      <!-- <div class="primary-color">主色: {{ primaryColor }}</div>
      <el-color-picker v-model="primaryColor" @change="onChange"/>
    </div>

    <div class="colors">
      <template v-for="item of colors">
          <div class="colors-item" :style="{backgroundColor: item}">{{ item }}</div>
      </template>
    </div> -->
  </div>
</template>



