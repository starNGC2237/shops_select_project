<template>
  <div>
    <el-card>
      <el-form inline class="form">
        <el-form-item label="职位搜索">
          <el-input placeholder="请输入搜索关键字" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :disabled="keyword === ''">
            搜索
          </el-button>
          <el-button type="primary" @click="reset"> 重置 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus" @click="addRole">
        添加职位
      </el-button>
      <el-table border style="margin: 10px 0" :data="allRole">
        <el-table-column
          type="index"
          align="center"
          label="#"
        ></el-table-column>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="roleName" label="职位名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="280px"
          align="center"
          fixed="right"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setPermission(row)"
            >
              分配权限
            </el-button>
            <el-button
              type="success"
              size="small"
              icon="Edit"
              @click="updateRole(row)"
            >
              编辑
            </el-button>
            <el-popconfirm title="确认删除吗" width="260px">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="deleteRole(row)"
              >
                删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="display: flex; flex-wrap: wrap"
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @current-change="getHasRole"
        @size-change="() => getHasRole()"
      />
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="`${roleParams.id ? '更新' : '添加'}职位`"
    >
      <el-form :model="roleParams" :rules="rules" ref="roleRef">
        <el-form-item label="职位名称" prop="roleName">
          <el-input placeholder="请输入职位名称" v-model="roleParams.roleName">
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-drawer width="40%" v-model="drawerVisible">
      <template #header>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <div>
          <el-tree
            ref="treeRef"
            :data="menuArr"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="selectedArr"
            :props="{
              children: 'children',
              label: 'name',
            }"
          />
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawerVisible = false">取消</el-button>
          <el-button @click="handler">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOrUpdateRole,
  reqAllPermissionList,
  reqAllRoleList,
  reqRemoveRole,
  reqSetPermission,
} from "@/api/acl/role";
import {
  MenuData,
  MenuResponseData,
  RoleData,
  RoleResponseData,
} from "@/api/acl/role/type";
import { computed, nextTick, onMounted, ref } from "vue";
import useLayoutSettingStore from "@/store/modules/setting";
import { ElMessage } from "element-plus";

let treeRef = ref<any>(null);
let roleRef = ref<any>(null);
let pageNo = ref<number>(1);
let pageSize = ref<number>(3);
let keyword = ref<string>("");
let allRole = ref<RoleData[]>([]);
let total = ref<number>(0);
let settingStore = useLayoutSettingStore();
let dialogVisible = ref<boolean>(false);
let drawerVisible = ref<boolean>(false);
let roleParams = ref<RoleData>({
  roleName: "",
});
const rules = {
  roleName: [
    { required: true, message: "请输入职位名称", trigger: "blur" },
    { min: 2, message: "长度在 2 个字符以上", trigger: "blur" },
  ],
};
let menuArr = ref<MenuData[]>([]);

const getHasRole = async (pager = 1) => {
  pageNo.value = pager;
  let res: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value
  );
  if (res.code === 200) {
    allRole.value = res.data.records;
    total.value = res.data.total;
  }
};
const search = () => {
  getHasRole();
  keyword.value = "";
};
const reset = () => {
  settingStore.refresh = !settingStore.refresh;
};
const addRole = () => {
  roleParams.value = {
    roleName: "",
  };
  nextTick(() => {
    roleRef.value.clearValidate();
  });
  dialogVisible.value = true;
};
const updateRole = (row: RoleData) => {
  nextTick(() => {
    roleRef.value.clearValidate();
  });
  dialogVisible.value = true;
  roleParams.value = Object.assign({}, row);
};
const save = async () => {
  await roleRef.value.validate(async (valid: boolean) => {
    if (valid) {
      let res = await reqAddOrUpdateRole(roleParams.value);
      if (res.code === 200) {
        ElMessage.success("成功");
        dialogVisible.value = false;
        getHasRole(roleParams.value.id ? pageNo.value : 1);
      } else {
        ElMessage.error("失败");
      }
    }
  });
};
const setPermission = async (row: RoleData) => {
  drawerVisible.value = true;
  roleParams.value = Object.assign({}, row);
  let res: MenuResponseData = await reqAllPermissionList(
    roleParams.value.id as number
  );
  if (res.code === 200) {
    menuArr.value = res.data;
  }
};

const selectedArr = computed(() => {
  const filterSelectArr = (arr: any, initArr: any) => {
    arr.forEach((item: any) => {
      if (item.select) {
        initArr.push(item.id);
      }
      if (item.children && item.children.length > 0) {
        filterSelectArr(item.children, initArr);
      }
    });
    return initArr;
  };
  return filterSelectArr(menuArr.value, []);
});
const handler = async () => {
  const roleId = roleParams.value.id;
  if (!roleId) {
    ElMessage.error("请选择职位");
    return;
  }
  let arr1 = treeRef.value.getCheckedKeys();
  let arr2 = treeRef.value.getHalfCheckedKeys();
  let permissionIdList = [...arr1, ...arr2];
  let res = await reqSetPermission(roleId, permissionIdList);
  if (res.code === 200) {
    drawerVisible.value = false;
    ElMessage.success("成功");
    window.location.reload();
  } else {
    ElMessage.error("失败");
  }
};
const deleteRole = async (row: RoleData) => {
  if (!row.id) return;
  let res = await reqRemoveRole(row.id);
  if (res.code === 200) {
    ElMessage.success("成功");
    getHasRole(allRole.value.length === 1 ? pageNo.value - 1 : pageNo.value);
  } else {
    ElMessage.error("失败");
  }
};

onMounted(() => {
  getHasRole();
});
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>
