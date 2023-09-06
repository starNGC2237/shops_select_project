<template>
  <div>
    <el-card>
      <div class="box">
        <el-image :src="userStore.avatar" alt="head pic" class="avatar" />
        <div class="bottom">
          <h3 class="title">{{ getMoment() }}，{{ userStore.username }}</h3>
          <p class="sub">博客运营平台</p>
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
  font-weight: 900;
  margin-bottom: 30px;
}
.bottom {
  margin-left: 20px;
}
.sub {
  font-style: italic;
  color: skyblue;
}
.bot {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
