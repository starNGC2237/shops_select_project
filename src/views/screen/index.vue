<template>
  <div class="container">
    <div class="screen" ref="screenRef">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="center">
          <Map class="map" />
          <Line class="line" />
        </div>
        <div class="right">
          <Rank class="rank" />
          <Year class="year" />
          <Couter class="couter" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import Top from "./components/top/index.vue";
import Age from "./components/age/index.vue";
import Sex from "./components/sex/index.vue";
import Tourist from "./components/tourist/index.vue";
import Map from "./components/map/index.vue";
import Line from "./components/line/index.vue";
import Rank from "./components/rank/index.vue";
import Year from "./components/year/index.vue";
import Couter from "./components/couter/index.vue";

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
  background: url(../../assets/images/screen/bg.png) no-repeat;
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
      box-sizing: border-box;
      padding: 44px 0 10px 0;
      height: 1040px;
      .right {
        display: flex;
        flex-direction: column;
        flex: 1;
        .rank {
          flex: 1.2;
        }
        .year {
          flex: 1;
        }
        .couter {
          flex: 1;
        }
      }
      .left {
        display: flex;
        flex: 1;
        flex-direction: column;
        .tourist {
          flex: 1.2;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          display: flex;
          flex: 2.2;
          margin: 20px 0;
        }
        .line {
          display: flex;
          flex: 1;
        }
      }
    }
  }
}
</style>
