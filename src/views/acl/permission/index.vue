<template>
  <div>
    <el-table
      :data="permissionList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column label="名称" min-width="200px" prop="name">
      </el-table-column>
      <el-table-column label="权限值" prop="code" min-width="150px">
      </el-table-column>
      <el-table-column label="修改时间" prop="updateTime" width="200px">
      </el-table-column>
      <el-table-column label="操作" width="260px" fixed="right">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            :disabled="row.level === 4"
            @click="addPermission(row)"
          >
            {{ row.level === 3 ? "添加功能" : "添加菜单" }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            :disabled="row.level === 1"
            @click="updatePermission(row)"
          >
            编辑
          </el-button>
          <el-popconfirm title="确认删除吗" @confirm="removeMenu(row)">
            <template #reference>
              <el-button type="danger" size="small" :disabled="row.level === 1">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="添加菜单" width="30%">
      <el-form>
        <el-form-item label="名称">
          <el-input placeholder="请输入" v-model="menuData.name"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input placeholder="请输入" v-model="menuData.code"></el-input>
        </el-form-item>
      </el-form>
      <template #footer="{}">
        <span>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reqAddMenu, reqAllPermission, reqDeleteMenu } from "@/api/acl/menu";
import type {
  MenuParams,
  Permission,
  PermissionResponseData,
} from "@/api/acl/menu/types";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

let permissionList = ref<Permission[]>([]);
let dialogVisible = ref<boolean>(false);
let menuData = ref<MenuParams>({
  code: "",
  level: -1,
  pid: -1,
  name: "",
});

const getHasPermission = async () => {
  let res: PermissionResponseData = await reqAllPermission();
  if (res.code === 200) {
    permissionList.value = res.data;
  }
};
const addPermission = (row: Permission) => {
  menuData.value = {
    code: "",
    level: -1,
    pid: -1,
    name: "",
  };
  if (!row.id) {
    ElMessage.error("此菜单无法添加子菜单");
    return;
  }
  menuData.value.pid = row.id;
  menuData.value.level = row.level + 1;
  dialogVisible.value = true;
};
const updatePermission = (row: Permission) => {
  menuData.value = {
    id: row.id,
    code: row.code,
    level: row.level,
    pid: row.pid,
    name: row.name,
  };
  dialogVisible.value = true;
};
const save = async () => {
  let res = await reqAddMenu(menuData.value);
  if (res.code === 200) {
    ElMessage.success("成功");
    dialogVisible.value = false;
    getHasPermission();
  } else {
    ElMessage.error("失败");
  }
};
const removeMenu = async (row: Permission) => {
  if (!row.id) {
    ElMessage.error("此菜单无ID ，无法删除");
    return;
  }
  let res = await reqDeleteMenu(row.id);
  if (res.code === 200) {
    ElMessage.success("成功");
    getHasPermission();
  } else {
    ElMessage.error("失败");
  }
};

onMounted(() => {
  getHasPermission();
});
</script>

<style scoped></style>
