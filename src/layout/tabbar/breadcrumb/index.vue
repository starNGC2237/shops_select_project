<template>
  <el-icon @click="changeIcon" style="margin-right: 10px; cursor: pointer">
    <component :is="settingStore.fold ? 'Fold' : 'Expand'" />
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
      <template #default>
        <div style="display: flex; align-items: center">
          <el-icon style="margin: auto 5px">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </div>
      </template>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting";
let settingStore = useLayoutSettingStore();
const changeIcon = () => {
  settingStore.fold = !settingStore.fold;
};
</script>
<script lang="ts">
export default {
  name: "Breadcrumb",
};
</script>
<style scoped></style>
