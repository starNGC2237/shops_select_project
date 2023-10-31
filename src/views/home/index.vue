<template>
  <div>
    <el-card body-style="padding:30px">
      <div class="box">
        <el-image :src="userStore.avatar" alt="head pic" class="avatar" />
        <div class="bottom">
          <h4 class="title">
            {{ getMoment() }}，{{ userStore.username }}，开始您一天的工作吧！
          </h4>
          <p class="sub">运营平台</p>
        </div>
      </div>
    </el-card>
    <div class="bot">
      <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";
import { getMoment } from "@/utils/time";
let userStore = useUserStore();
</script>

<style scoped lang="scss">
.box {
  display: flex;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.title {
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 0.5em;
  line-height: 1.75rem;
}
.bottom {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sub {
  color: skyblue;
}
.bot {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
