<script setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { onMounted } from "vue";
onMounted(() => {
  if (localStorage.getItem("dark") === "dark") {
    document.documentElement.className = "dark";
  }
});
</script>
<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped lang="scss"></style>
