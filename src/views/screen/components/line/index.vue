<template>
  <div class="box5">
    <div class="title">
      <p>未来七天游客量趋势图</p>
      <p class="bg"></p>
    </div>
    <div class="echarts" ref="lineRef"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

let lineRef = ref();
onMounted(() => {
  let mychart = echarts.init(lineRef.value);
  mychart.setOption({
    grid: {
      top: "10%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      splitLine: {
        show: false,
      },
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        data: [82, 9, 90, 34, 120, 130, 132],
        type: "line",
        areaStyle: {},
        smooth: true,
      },
    ],
  });
});
</script>

<style scoped lang="scss">
.box5 {
  width: calc(100% - 20px);
  height: 100%;
  background: url(../../../../assets/images/screen/dataScreen-main-cb.png)
    no-repeat;
  background-size: 100% 100%;
  margin: 0 10px;
  display: flex;
  flex-direction: column;

  .title {
    margin-left: 0;
    height: 70px;
    display: flex;
    flex-direction: column;
    p {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../../../assets/images/screen/dataScreen-title.png)
        no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
  }
  .echarts {
    width: 100%;
    height: calc(100% - 70px);
  }
}
</style>
