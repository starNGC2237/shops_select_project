<template>
  <div class="box7">
    <div class="title">
      <p>年度游客量对比</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="chartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

let chartRef = ref();

onMounted(() => {
  let mychart = echarts.init(chartRef.value);
  mychart.setOption({
    xAxis: {
      type: "category",
    },
    yAxis: {
      show: false,
    },
    grid: {},
    series: [
      {
        type: "scatter",
        data: [33, 88, 21, 9, 788, 234, 1213, 2312, 4324],
        symbol: "diamond",
        symbolSize: 16,
        label: {
          show: true,
          position: "top",
          color: "yellow",
        },
        itemStyle: {
          color: "cyan",
        },
      },
    ],
  });
});
</script>

<style scoped lang="scss">
.box7 {
  width: 100%;
  height: calc(100% - 40px);
  margin: 20px 0;
  background: url("../../images/dataScreen-main-rc.png") no-repeat;
  background-size: 100% 100%;
  .title {
    margin-left: 0px;
    height: 40px;
    display: flex;
    flex-direction: column;

    p {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
  }
  .charts {
    width: 100%;
    height: calc(100% - 40px);
  }
}
</style>
