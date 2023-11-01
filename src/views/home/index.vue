<template>
  <div>
    <el-card body-style="padding:30px">
      <div class="box">
        <div style="display: flex; flex-wrap: wrap; row-gap: 5px">
          <el-image
            :src="userStore.avatar"
            alt="head pic"
            class="avatar"
            fit="fill"
          />
          <div class="bottom">
            <h4 class="title">
              {{ getMoment() }}，{{ userStore.username }}，开始您一天的工作吧！
            </h4>
            <p class="sub">运营平台</p>
          </div>
        </div>
        <div class="things">
          <el-statistic :value="38">
            <template #title>
              <div style="display: flex; justify-content: flex-end">代办</div>
            </template>
            <template #suffix>/100</template>
          </el-statistic>
          <el-statistic :value="26">
            <template #title>
              <div style="display: flex; justify-content: flex-end">项目</div>
            </template>
          </el-statistic>
          <el-statistic :value="72">
            <template #title>
              <div style="display: flex; justify-content: flex-end">人数</div>
            </template>
          </el-statistic>
        </div>
      </div>
    </el-card>
    <div class="todo_box">
      <div class="todo_box_container">
        <div class="left">
          <el-card body-style="padding:30px" shadow="never">
            <template #header>
              <div class="card-header">
                <h2>项目</h2>
                <el-button type="primary" text>更多</el-button>
              </div>
            </template>
          </el-card>
          <el-card
            body-style="padding:30px"
            style="margin-top: 1rem"
            shadow="never"
          >
            <template #header>
              <div class="card-header">
                <h2>最新动态</h2>
                <el-button type="primary" text>更多</el-button>
              </div>
            </template>
          </el-card>
        </div>
        <div class="right">
          <el-card body-style="padding:30px" shadow="never"></el-card>
        </div>
      </div>
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
  justify-content: space-between;
  flex-flow: row wrap;
  row-gap: 5px;
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
.todo_box {
  display: flex;
  padding: 20px 0;
  width: 100%;
  & > .todo_box_container {
    display: flex;
    width: 100%;
    justify-content: space-between;
    & > .left {
      width: calc(60% - 20px);
      display: flex;
      flex-direction: column;
    }
    & > .right {
      width: calc(40% - 20px);
      display: flex;
      flex-direction: column;
    }
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > h2 {
    margin: 0;
  }
}
.things {
  display: flex;
  align-items: center;
  & > .el-statistic {
    margin-right: 2rem;
  }
}
</style>
