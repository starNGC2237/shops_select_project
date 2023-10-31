<template>
  <div class="box2">
    <div class="title">
      <p>年龄比例</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="chartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

let chartRef = ref<HTMLElement>();
onMounted(() => {
  let myChart = echarts.init(chartRef.value);
  myChart.setOption({
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: 40,
      right: 30,
      orient: "vertical",
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "inside",
          color: "white",
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "军事" },
          { value: 735, name: "新闻" },
          { value: 580, name: "直播" },
          { value: 484, name: "娱乐" },
          { value: 300, name: "财经" },
        ],
      },
    ],
  });
});
</script>

<style scoped lang="scss">
.box2 {
  width: 100%;
  height: 100%;
  background: url(../../../../assets/images/screen/dataScreen-main-lb.png)
    no-repeat;
  background-size: 100% 100%;
  .title {
    margin-left: 0;
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
    height: 260px;
  }
}
</style>
