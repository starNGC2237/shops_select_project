<template>
  <div class="box6">
    <div class="title">
      <p>热门景区排行</p>
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
    yAxis: {},
    grid: {
      left: 20,
      right: 20,
      bottom: 20,
      top: 20,
    },
    series: [
      {
        type: "bar",
        data: [5, 20, 36, 10, 10, 20, 50],
        label: {
          show: true,
          position: "insideTop",
          color: "#000",
        },
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: (data: any) => {
            let arr = [
              "red",
              "orange",
              "yellowgreen",
              "green",
              "purple",
              "hotpink",
              "skyblue",
            ];
            return arr[data.dataIndex];
          },
        },
      },
      {
        type: "line",
        data: [5, 20, 36, 10, 10, 20, 50],
        smooth: true,
      },
      {
        type: "bar",
        data: [5, 20, 36, 10, 10, 20, 50],
        label: {
          show: true,
          position: "insideTop",
          color: "#000",
        },
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: (data: any) => {
            let arr = [
              "red",
              "orange",
              "yellowgreen",
              "green",
              "purple",
              "hotpink",
              "skyblue",
            ];
            return arr[data.dataIndex];
          },
        },
      },
    ],
    tooltip: {},
  });
});
</script>

<style scoped lang="scss">
.box6 {
  width: 100%;
  height: 100%;
  background: url("../../../../assets/images/screen/dataScreen-main-rt.png")
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
    padding: 20px;
    height: calc(100% - 40px);
  }
}
</style>
