<template>
  <div class="box8">
    <div class="title">
      <p>数据统计</p>
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
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "消费水平", max: 650 },
        { name: "好感度", max: 1600 },
        { name: "出行", max: 3000 },
        { name: "小吃", max: 3800 },
        { name: "爱好", max: 5200 },
        { name: "景点", max: 2500 },
      ],
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: [
          {
            value: [420, 300, 2000, 3500, 5000, 1800],
            name: "购物",
          },
          {
            value: [500, 1400, 2800, 2600, 4200, 2100],
            name: "吃饭",
          },
        ],
      },
    ],
  });
});
</script>

<style scoped lang="scss">
.box8 {
  width: 100%;
  height: 100%;
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
