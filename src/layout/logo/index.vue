<template>
  <div class="logo" :class="{ fold: !!useLayoutSetting.fold }">
    <img :src="setting.logo" :alt="setting.title" v-if="!setting.logoHidden" />
    <p v-show="showTitle" :key="refresh.toString()">
      {{ setting.title }}
    </p>
  </div>
</template>

<script setup lang="ts">
import setting from "@/setting.ts";
import useLayoutSettingStore from "@/store/modules/setting";
import { ref, watch } from "vue";

let useLayoutSetting = useLayoutSettingStore();
let showTitle = !useLayoutSetting.fold;
let timer = ref();
let refresh = ref(false);

watch(
  () => useLayoutSetting.fold,
  () => {
    clearTimeout(timer.value);
    if (useLayoutSetting.fold) {
      showTitle = !useLayoutSetting.fold;
      refresh.value = !refresh.value;
    } else {
      timer.value = setTimeout(() => {
        showTitle = !useLayoutSetting.fold;
        refresh.value = !refresh.value;
      }, 300);
    }
  }
);
</script>
<script lang="ts">
export default {
  name: "Logo",
};
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  transition: all 0.3s;
  &.fold {
    justify-content: center;
    padding: 10px;
  }
  img {
    width: 40px;
    height: 40px;
    filter: invert(100%);
    display: block;
  }
  p {
    font-size: $base-logo-title-font-size;
    margin-left: 12px;
  }
}
</style>
