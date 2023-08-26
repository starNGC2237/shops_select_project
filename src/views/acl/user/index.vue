<template>
  <div>
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
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button type="primary">批量删除</el-button>

      <el-table :data="userList" border style="margin: 10px 0">
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column
          type="index"
          align="center"
          label="#"
        ></el-table-column>
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
        <el-table-column
          width="300px"
          fixed="right"
          align="center"
          label="操作"
        >
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="User">
              分配角色
            </el-button>
            <el-button
              type="success"
              size="small"
              icon="Edit"
              @click="updateUser(row)"
            >
              编辑
            </el-button>
            <el-button type="danger" size="small" icon="Delete">
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
    <!--抽屉-->
    <el-drawer v-model="drawer" width="45%">
      <template #header>
        <h4>{{ userParams.id ? "更新" : "添加" }}用户</h4>
      </template>
      <template #default>
        <el-form :model="userParams" :rules="rules" ref="formRef">
          <el-form-item label="用户姓名" prop="username">
            <el-input
              placeholder="请输入用户姓名"
              v-model="userParams.username"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input placeholder="请输入用户昵称" v-model="userParams.name">
            </el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
            <el-input
              placeholder="请输入用户密码"
              type="password"
              v-model="userParams.password"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reqAddOrUpdateUser, reqUserInfo } from "@/api/acl/user";
import { nextTick, onMounted, ref } from "vue";
import type { UserResponseData, Records, User } from "@/api/acl/user/type";
import { ElMessage } from "element-plus";

let formRef = ref<any>(null);
let currentPage = ref<number>(0);
let pageSize = ref<number>(5);
let total = ref<number>(0);
let userList = ref<Records>([]);
let drawer = ref<boolean>(false);
let userParams = ref<User>({
  id: 0,
  username: "",
  name: "",
  password: "",
});
const validatorName = (_: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error("长度不能小于5"));
  }
};
const validatorPassword = (_: any, value: any, callBack: any) => {
  if (value.trim().length >= 6) {
    callBack();
  } else {
    callBack(new Error("长度不能小于6"));
  }
};

let rules = {
  username: [{ required: true, validator: validatorName, trigger: "blur" }],
  name: [{ required: true, validator: validatorName, trigger: "blur" }],
  password: [{ required: true, validator: validatorPassword, trigger: "blur" }],
};

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
const addUser = () => {
  drawer.value = true;
  userParams.value = {
    id: 0,
    username: "",
    name: "",
    password: "",
  };
  nextTick(() => {
    formRef.value.clearValidate();
  });
};
const updateUser = (row: User) => {
  drawer.value = true;
  Object.assign(userParams.value, row);
  nextTick(() => {
    formRef.value.clearValidate();
  });
};
const save = async () => {
  if (!formRef.value) return;
  await formRef.value.validate(async (valid: any) => {
    if (valid) {
      let res = await reqAddOrUpdateUser(userParams.value);
      if (res.code === 200) {
        drawer.value = false;
        ElMessage.success("成功");
        getHasUser(userParams.value.id ? currentPage.value : 1);
        window.location.reload();
      } else {
        drawer.value = false;
        ElMessage.error("失败");
      }
    }
  });
};
const cancel = () => {
  drawer.value = false;
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
