<template>
  <div class="header-color">
    <div class="hex">{{ hex }}</div>
    <div>
      <div
        class="color_selector"
        @click="
          () => {
            colorObj.showSelColor = true;
          }
        "
      >
        <div class="color_selector_inner" :style="{ backgroundColor: hex }"> </div>
      </div>
      <Sketch
        style="position: absolute; z-index: 1"
        v-model="colorObj.color"
        v-show="colorObj.showSelColor"
        @changButton="changeColor"
      />
    </div>
    <!-- <div
      ><down-outlined style="font-size: 9px" v-if="!colorObj.showSelColor" /><up-outlined
        style="font-size: 9px"
        v-else
    /></div> -->
  </div>
</template>
 
<script setup lang="ts">
import { reactive } from 'vue'
  import { Sketch } from '@ans1998/vue3-color';
  const props = defineProps({
    hex: {
      type: String,
      default: '#3e51ad',
    },
    data: {
      type: Object,
      default: () => {},
    },
  });
  const emits = defineEmits(['colorHex']);
  const colorObj = reactive({
    color: '',
    showSelColor: false,
  });
  const changeColor = (e) => {
    // console.log(e);
    if (!e.isOk) {
      colorObj.showSelColor = false;
      return;
    }
    // colorObj.hex = '#' + e.hex;
    // props.hex = '#' + e.hex;
    emits('colorHex', e);
    colorObj.showSelColor = false;
  };
</script>
 
<style lang="less" scoped>
  .header-color {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 130px;
    height: 36px;
    border-radius: 4px;
    opacity: 1;
    background: #ffffff;
    box-sizing: border-box;
    border: 1px solid #ededed;
    .hex {
      width: 60px;
    }
  }
  .color_selector {
    width: 28px;
    height: 28px;
    padding: 4px;
    box-sizing: border-box;
    border: 1px solid #ededed;
    cursor: pointer;
    .color_selector_inner {
      width: 100%;
      height: 100%;
    }
  }
</style>