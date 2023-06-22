<template>
  <div class="layout-container">
    <div
      class="layout_slider"
      :class="{ fold: useLayoutSetting.fold ? true : false }"
    >
      <Logo />
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#001529"
          text-color="white"
          router
          :default-active="$route.path"
          :collapse="useLayoutSetting.fold"
          :collapse-transition="false"
        >
          <AppMenu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div
      class="layout_tabbar"
      :class="{ fold: useLayoutSetting.fold ? true : false }"
    >
      <Tabbar />
    </div>
    <div
      class="layout_main"
      :class="{ fold: useLayoutSetting.fold ? true : false }"
    >
      <Main />
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from "./logo/index.vue";
import AppMenu from "./menu/index.vue";
import useUserStore from "@/store/modules/user";
import Main from "./main/index.vue";
import Tabbar from "./tabbar/index.vue";
import { useRoute } from "vue-router";
import useLayoutSettingStore from "@/store/modules/setting";
let userStore = useUserStore();
let $route = useRoute();
let useLayoutSetting = useLayoutSettingStore();
</script>

<script lang="ts">
export default {
  name: "Layout",
};
</script>
<style scoped lang="scss">
.layout-container {
  height: 100vh;
  width: 100%;
  .layout_slider {
    height: 100%;
    width: $base-menu-width;
    background-color: $base-menu-background;
    color: white;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
    &.fold {
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar {
    height: $base-tabbar-height;
    width: calc(100% - $base-menu-width);
    position: fixed;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: yellow;
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
