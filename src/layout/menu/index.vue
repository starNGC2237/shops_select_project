<template>
  <template v-for="item in menuList" :key="item.path">
    <!--没有子路由-->
    <template v-if="!item.children">
      <el-menu-item :index="item.path" v-if="!item.meta.hidden">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          {{ item.meta.title }}
        </template>
      </el-menu-item>
    </template>
    <!--只有一个子路由-->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          {{ item.children[0].meta.title }}
        </template>
      </el-menu-item>
    </template>
    <!--有多个子路由-->
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <AppMenu :menuList="item.children"></AppMenu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
defineProps(["menuList"]);
</script>
<script lang="ts">
export default {
  name: "AppMenu",
};
</script>

<style scoped></style>
