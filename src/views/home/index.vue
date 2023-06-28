<template>
  <div>
    <h1>我是主页，{{ userStore.username }}</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();
onMounted(() => {
  userStore.getUserInfo();
});
</script>

<style scoped lang="scss"></style>
