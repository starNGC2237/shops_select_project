<template>
  <div>
    <el-card>
      <el-form inline class="form">
        <el-form-item label="用户名：">
          <el-input placeholder="请输入用户名" v-model="keyWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" @click="addUser" v-has="'btn.User.add'"
        >添加用户</el-button
      >
      <el-button
        type="primary"
        :disabled="selectArr.length <= 0"
        @click="deleteSelectUser"
      >
        批量删除
      </el-button>

      <el-table
        @selection-change="selectChange"
        :data="userList"
        border
        style="margin: 10px 0"
      >
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column type="index" align="center" label="#">
        </el-table-column>
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
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setRole(row)"
            >
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
            <el-popconfirm
              :title="`你确定删除${row.username}吗?`"
              width="260px"
              @confirm="deleteUser(row)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
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
    <el-drawer v-model="drawerRole" width="45%">
      <template #header>
        <h4>分配角色（职位）</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input disabled v-model="userParams.username"></el-input>
          </el-form-item>
          <el-form-item label="职位角色">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="userRole"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="item in allRole"
                :key="item.id"
                :label="item.id"
              >
                {{ item.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="() => (drawerRole = false)">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOrUpdateUser,
  reqUserInfo,
  reqRemoveUser,
  reqAllRole,
  reqSetUserRole,
  reqSelectUser,
} from "@/api/acl/user";
import { nextTick, onMounted, ref, toRaw } from "vue";
import type {
  UserResponseData,
  Records,
  User,
  RoleData,
  SetRoleData,
} from "@/api/acl/user/type";
import { ElMessage } from "element-plus";
import useLayoutSettingStore from "@/store/modules/setting";

let settingStore = useLayoutSettingStore();
let formRef = ref<any>(null);
let currentPage = ref<number>(0);
let pageSize = ref<number>(5);
let total = ref<number>(0);
let userList = ref<Records>([]);
let drawer = ref<boolean>(false);
let drawerRole = ref<boolean>(false);
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

let checkAll = ref<boolean>(false);
let isIndeterminate = ref<boolean>(true);
let allRole = ref<RoleData[]>([]);
let userRole = ref<number[]>([]);
let selectArr = ref<number[]>([]);
let keyWord = ref<string>("");

const handleCheckAllChange = (val: any) => {
  userRole.value = val
    ? allRole.value.reduce((pre: number[], item) => {
        pre.push(item.id as number);
        return pre;
      }, [])
    : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (val: any) => {
  let checkedCount = val.length;
  checkAll.value = checkedCount === allRole.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRole.value.length;
};
const getHasUser = async (pager = 1) => {
  currentPage.value = pager;
  let res: UserResponseData = await reqUserInfo(
    currentPage.value,
    pageSize.value,
    keyWord.value
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
        // getHasUser(userParams.value.id ? currentPage.value : 1);
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
const deleteUser = async (row: User) => {
  if (!row.id) {
    ElMessage.error("删除失败");
    return;
  }
  let res = await reqRemoveUser(row.id);
  if (res.code === 200) {
    ElMessage.success("删除成功");
    getHasUser(
      userList.value.length > 1 ? currentPage.value : currentPage.value - 1
    );
  } else {
    ElMessage.error("删除失败");
  }
};
const setRole = async (row: User) => {
  Object.assign(userParams.value, row);
  let res = await reqAllRole(userParams.value.id as number);
  if (res.code === 200) {
    allRole.value = res.data.allRolesList;
    userRole.value = res.data.assignRoles.reduce((pre: any, item: any) => {
      pre.push(item.id);
      return pre;
    }, []);

    if (userRole.value.length === 0) {
      checkAll.value = false;
      isIndeterminate.value = false;
    } else if (userRole.value.length === allRole.value.length) {
      checkAll.value = true;
      isIndeterminate.value = false;
    } else {
      checkAll.value = false;
      isIndeterminate.value = true;
    }

    drawerRole.value = true;
  }
};
const confirm = async () => {
  let data: SetRoleData = {
    userId: userParams.value.id || 0,
    roleIdList: toRaw(userRole.value),
  };
  let res = await reqSetUserRole(data);
  if (res.code === 200) {
    ElMessage.success("成功");
    drawerRole.value = false;
    getHasUser(currentPage.value);
  } else {
    ElMessage.error("失败");
  }
};
const selectChange = (val: any) => {
  selectArr.value = val.reduce((pre: number[], item: User) => {
    pre.push(item.id as number);
    return pre;
  }, []);
};
const deleteSelectUser = async () => {
  let res = await reqSelectUser(selectArr.value);
  if (res.code === 200) {
    ElMessage.success("删除成功");
    getHasUser(
      userList.value.length > selectArr.value.length
        ? currentPage.value
        : currentPage.value - 1
    );
  } else {
    ElMessage.error("删除失败");
  }
};
const search = () => {
  getHasUser();
  keyWord.value = "";
};
const reset = () => {
  settingStore.refresh = !settingStore.refresh;
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
:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
