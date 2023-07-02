<template>
  <div>
    <h1>我是主页，{{ userStore.username }}</h1>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();
</script>

<style scoped lang="scss"></style>
