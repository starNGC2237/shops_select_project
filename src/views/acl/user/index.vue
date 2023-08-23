<template>
  <el-card>
    <el-form inline class="form">
      <el-form-item label="用户名：">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="primary">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary">添加用户</el-button>
    <el-button type="primary">批量删除</el-button>

    <el-table border style="margin: 10px 0">
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column align="center" label="#"></el-table-column>
      <el-table-column align="center" label="id"></el-table-column>
      <el-table-column align="center" label="用户名字"></el-table-column>
      <el-table-column align="center" label="用户名称"></el-table-column>
      <el-table-column align="center" label="用户角色"></el-table-column>
      <el-table-column align="center" label="创建时间"></el-table-column>
      <el-table-column align="center" label="更新时间"></el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="260px"
      ></el-table-column>
    </el-table>
    <el-pagination
      style="display: flex; flex-wrap: wrap"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="400"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

let currentPage = ref<number>(0);
let pageSize = ref<number>(5);
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
