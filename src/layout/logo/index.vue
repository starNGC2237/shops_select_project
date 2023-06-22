<template>
  <div class="logo" :class="{ fold: useLayoutSetting.fold ? true : false }">
    <img :src="setting.logo" :alt="setting.title" v-if="!setting.logoHidden" />
    <p v-show="!useLayoutSetting.fold">
      {{ setting.title }}
    </p>
  </div>
</template>

<script setup lang="ts">
import setting from "@/setting.ts";
import useLayoutSettingStore from "@/store/modules/setting";
let useLayoutSetting = useLayoutSettingStore();
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
  padding: 20px;
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
    margin-left: 10px;
  }
}
</style>
