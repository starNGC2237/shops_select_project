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
            <el-button type="primary" size="small" icon="User">
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
            <el-button type="danger" size="small" icon="Delete">删除</el-button>
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
  </div>
</template>

<script setup lang="ts">
import { reqAddOrUpdateRole, reqAllRoleList } from "@/api/acl/role";
import { RoleData, RoleResponseData } from "@/api/acl/role/type";
import { nextTick, onMounted, ref } from "vue";
import useLayoutSettingStore from "@/store/modules/setting";
import { ElMessage } from "element-plus";
import { ro } from "element-plus/es/locale";

let roleRef = ref<any>(null);
let pageNo = ref<number>(1);
let pageSize = ref<number>(3);
let keyword = ref<string>("");
let allRole = ref<RoleData[]>();
let total = ref<number>(0);
let settingStore = useLayoutSettingStore();
let dialogVisible = ref<boolean>(false);
let roleParams = ref<RoleData>({
  roleName: "",
});
const rules = {
  roleName: [
    { required: true, message: "请输入职位名称", trigger: "blur" },
    { min: 2, message: "长度在 2 个字符以上", trigger: "blur" },
  ],
};

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
