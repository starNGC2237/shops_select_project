<template>
  <el-button circle size="small" icon="Refresh" @click="updateRefresh">
  </el-button>
  <el-button circle size="small" icon="FullScreen" @click="fullScreen">
  </el-button>
  <el-popover title="主题设置" :width="200" trigger="hover">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="selectedColor"
          show-alpha
          :predefine="predefineColors"
          @change="themeChange"
        >
        </el-color-picker>
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="value"
          active-icon="MoonNight"
          inactive-icon="Sunny"
          inline-prompt
          @change="changeDark"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button circle size="small" icon="Setting"> </el-button>
    </template>
  </el-popover>

  <img
    :src="userStore.avatar"
    style="width: 20px; height: 20px; margin: 0 10px"
    alt="avatar"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
let settingStore = useLayoutSettingStore();
let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
const selectedColor = ref("#4A5DFF");
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);
let value = ref<boolean>(false);

onMounted(() => {
  value.value = localStorage.getItem("dark") === "dark";
  changeDark();
});
const updateRefresh = () => {
  settingStore.refresh = !settingStore.refresh;
};
const fullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
const logout = async () => {
  await userStore.userLogout();
  await $router.push({ path: "/login", query: { redirect: $route.fullPath } });
};
const changeDark = () => {
  value.value
    ? (document.documentElement.className = "dark")
    : (document.documentElement.className = "");
  localStorage.setItem("dark", value.value ? "dark" : "");
};
const themeChange = () => {
  const el = document.documentElement;
  // 设置 css 变量
  el.style.setProperty("--el-color-primary", selectedColor.value);
  el.style.setProperty("--el-color-primary", selectedColor.value);
};
</script>
<script lang="ts">
export default {
  name: "Setting",
};
</script>
<style scoped></style>
