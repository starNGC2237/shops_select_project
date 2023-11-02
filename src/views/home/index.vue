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
              <div style="display: flex; justify-content: flex-end">待办</div>
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
                <el-link type="primary" :underline="false">更多</el-link>
              </div>
            </template>
            暂无
          </el-card>
          <el-card
            body-style="padding:30px"
            style="margin-top: 1rem"
            shadow="never"
          >
            <template #header>
              <div class="card-header">
                <h2>最新动态</h2>
                <el-link type="primary" :underline="false">更多</el-link>
              </div>
            </template>
            暂无
          </el-card>
        </div>
        <div class="right">
          <el-card
            body-style="padding:0px;border:0;border-left: 1px solid var(--el-card-border-color);"
            shadow="never"
            class="paths"
          >
            <template #header>
              <div class="card-header">
                <h2>快捷导航</h2>
              </div>
            </template>
            <div style="display: flex; flex-wrap: wrap">
              <el-card
                @click="$router.push(item.path)"
                shadow="hover"
                body-style="padding:0px;"
                v-for="item in pathsData"
                :key="item.path"
                class="paths_item"
              >
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                  "
                >
                  <el-icon style="width: 20px; height: 20px">
                    <component :is="item.icon"></component>
                  </el-icon>
                  <span style="margin-top: 1rem">
                    {{ item.name }}
                  </span>
                </div>
              </el-card>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";
import { getMoment } from "@/utils/time";
import { ref } from "vue";

let userStore = useUserStore();
let pathsData = ref([
  {
    name: "首页",
    icon: "HomeFilled",
    path: "/home",
  },
  {
    name: "数据大屏",
    icon: "Platform",
    path: "/screen",
  },
  {
    name: "商品管理",
    icon: "Goods",
    path: "/product",
  },
  {
    name: "权限管理",
    icon: "Lock",
    path: "/acl",
  },
]);
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
      width: calc(70% - 7.5px);
      display: flex;
      flex-direction: column;
    }
    & > .right {
      width: calc(30% - 7.5px);
      display: flex;
      flex-direction: column;
    }
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  & > h2 {
    margin: 0;
    font-weight: 700;
  }
}
.things {
  display: flex;
  align-items: center;
  & > .el-statistic {
    margin-right: 2rem;
  }
}
.paths {
  border: 0;
  ::v-deep(.el-card__header) {
    border: 1px solid var(--el-card-border-color);
  }
  .paths_item {
    width: calc(100% / 3);
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-right: 1px solid var(--el-card-border-color);
    border-bottom: 1px solid var(--el-card-border-color);
    cursor: pointer;
    &:hover {
      z-index: 10;
      box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
        0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
    }
  }
}
</style>
