<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting";
import { watch, ref, nextTick } from "vue";
let settingStore = useLayoutSettingStore();
let flag = ref(true);
watch(
  () => settingStore.refresh,
  () => {
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  }
);
</script>
<script lang="ts">
export default {
  name: "AppMain",
};
</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
