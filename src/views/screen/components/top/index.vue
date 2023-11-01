<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">运营可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间：{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted, onBeforeUnmount } from "vue";
import dayjs from "dayjs";

let $router = useRouter();
let time = ref(dayjs().format("YYYY-MM-DD HH:mm:ss"));
let timer = ref();

const goHome = () => {
  $router.push("/home");
};

onMounted(() => {
  timer.value = setInterval(() => {
    time.value = dayjs().format("YYYY-MM-DD HH:mm:ss");
  }, 1000);
});
onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>

<style scoped lang="scss">
.top {
  width: 100px;
  height: 40px;
  display: flex;
  .right {
    flex: 1.5;
    background: url(../../../../assets/images/screen/dataScreen-header-left-bg.png)
      no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .rbtn {
      width: 150px;
      height: 40px;
      float: left;
      background: url(../../../../assets/images/screen/dataScreen-header-btn-bg-r.png)
        no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
      cursor: zoom-in;
    }
    .time {
      color: #29fcff;
      text-align: center;
      margin-right: 15px;
      font-size: 18px;
    }
  }
  .left {
    flex: 1.5;
    background: url(../../../../assets/images/screen/dataScreen-header-left-bg.png)
      no-repeat;
    background-size: cover;
    .lbtn {
      width: 150px;
      height: 40px;
      float: right;
      background: url(../../../../assets/images/screen/dataScreen-header-btn-bg-l.png)
        no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .center {
    flex: 2;
    .title {
      width: 100%;
      height: 74px;
      background: url(../../../../assets/images/screen/dataScreen-header-center-bg.png)
        no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
    }
  }
}
</style>
