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

    <el-table :data="userList" border style="margin: 10px 0">
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column type="index" align="center" label="#"></el-table-column>
      <el-table-column prop="id" align="center" label="id"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="username"
        align="center"
        label="用户名字"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="name"
        align="center"
        label="用户名称"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="roleName"
        align="center"
        label="用户角色"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="createTime"
        align="center"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="updateTime"
        align="center"
        label="更新时间"
      >
      </el-table-column>
      <el-table-column width="300px" fixed="right" align="center" label="操作">
        <template #default="{}">
          <el-button type="primary" size="small" icon="User">
            分类角色
          </el-button>
          <el-button type="primary" size="small" icon="Edit"> 编辑 </el-button>
          <el-button type="primary" size="small" icon="Delete">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="display: flex; flex-wrap: wrap"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="getHasUser"
      @size-change="() => getHasUser"
    />
  </el-card>
</template>

<script setup lang="ts">
import { reqUserInfo } from "@/api/acl/user";
import { onMounted, ref } from "vue";
import type { UserResponseData, Records } from "@/api/acl/user/type";

let currentPage = ref<number>(0);
let pageSize = ref<number>(5);
let total = ref<number>(0);
let userList = ref<Records>([]);

const getHasUser = async (pager = 1) => {
  currentPage.value = pager;
  let res: UserResponseData = await reqUserInfo(
    currentPage.value,
    pageSize.value
  );
  if (res.code === 200) {
    total.value = res.data.total;
    userList.value = res.data.records;
  }
};

onMounted(() => {
  getHasUser();
});
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
