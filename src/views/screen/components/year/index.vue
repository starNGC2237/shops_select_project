<template>
  <div class="box7">
    <div class="title">
      <p>半年度访问量对比</p>
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
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "line", // 'shadow' as default; can also be 'line' or 'shadow'
      },
      formatter: "{c0}万人次",
    },
    xAxis: {
      type: "category",
      data: ["6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    },
    yAxis: {
      show: false,
    },
    grid: {},
    series: [
      {
        type: "scatter",
        data: [33, 88, 21, 9, 788, 234, 1213],
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
  background: url("../../../../assets/images/screen/dataScreen-main-rc.png")
    no-repeat;
  background-size: 100% 100%;
  .title {
    margin-left: 0;
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
      background: url(../../../../assets/images/screen/dataScreen-title.png)
        no-repeat;
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
