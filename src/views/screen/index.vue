<template>
  <div class="container">
    <div class="screen" ref="screenRef">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">左</div>
        <div class="center">中</div>
        <div class="right">右</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import Top from "./components/top/index.vue";

let screenRef = ref<HTMLElement>();

const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w;
  const wh = window.innerHeight / h;
  return Math.min(ww, wh);
};

onMounted(() => {
  screenRef.value &&
    (screenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`);
  window.addEventListener("resize", () => {
    screenRef.value &&
      (screenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", () => {
    screenRef.value &&
      (screenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`);
  });
});
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .right {
        flex: 1;
      }
      .left {
        flex: 1;
      }
      .center {
        flex: 2;
      }
    }
  }
}
</style>
