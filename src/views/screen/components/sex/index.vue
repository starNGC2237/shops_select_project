<template>
  <div class="box1">
    <div class="title">
      <p>男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../../../assets/images/screen/man.png" alt="" />
      </div>
      <div class="woman">
        <img src="../../../../assets/images/screen/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <p>男士48%</p>
      <p>女士52%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
let charts = ref<HTMLElement>();
onMounted(() => {
  let mycharts = echarts.init(charts.value);
  mycharts.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
      formatter: "{a0}: {c0}%<br />{a1}: {c1}%",
    },
    xAxis: {
      show: false,
      min: 0,
      max: 100,
      type: "value",
    },
    yAxis: {
      show: false,
      type: "category",
      data: ["人数比例"],
    },
    series: [
      {
        name: "男士",
        stack: "total",
        data: [48],
        type: "bar",
        barWidth: 20,
        itemStyle: {
          color: "#29fcff",
          borderRadius: [10, 0, 0, 10],
        },
        label: {
          show: true,
          formatter: "{c}%",
        },
        emphasis: {
          focus: "series",
        },
      },
      {
        name: "女士",
        stack: "total",
        data: [52],
        type: "bar",
        barWidth: 20,
        itemStyle: {
          color: "#ff6c6c",
          borderRadius: [0, 10, 10, 0],
        },
        label: {
          show: true,
          formatter: "{c}%",
        },
        emphasis: {
          focus: "series",
        },
      },
    ],
    grid: {
      left: "0%",
      right: "0%",
      bottom: "0%",
      top: "0%",
    },
  });
});
</script>

<style scoped lang="scss">
.box1 {
  width: 100%;
  height: 100%;
  background: url("../../../../assets/images/screen/dataScreen-main-lc.png")
    no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;
  .title {
    height: 50px;
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
  .sex {
    display: flex;
    justify-content: center;
    .man {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url(../../../../assets/images/screen/man-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .woman {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url(../../../../assets/images/screen/woman-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rate {
    display: flex;
    justify-content: space-between;
    color: white;
    padding: 0 20px;
    margin-bottom: 20px;
  }
  .charts {
    width: calc(100% - 40px);
    margin: 0 auto;
    height: 20px;
  }
}
</style>
