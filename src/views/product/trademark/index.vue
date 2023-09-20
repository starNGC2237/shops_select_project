<template>
  <el-card>
    <el-button
      type="primary"
      icon="Plus"
      @click="addTrademark"
      v-has="'btn.Trademark.add'"
    >
      添加品牌
    </el-button>
    <el-table style="margin: 10px 0" border :data="trademarkArr">
      <el-table-column label="序号" width="80px" align="center" type="index">
      </el-table-column>
      <el-table-column label="品牌名称" align="center" prop="tmName">
      </el-table-column>
      <el-table-column label="品牌LOGO" align="center">
        <template #default="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" align="center">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="() => updateTrademark(row)"
          >
          </el-button>
          <el-popconfirm
            :title="`确认删除${row.tmName}吗?`"
            width="250px"
            icon="Delete"
            @confirm="removeTradeMark(row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @current-change="getHasTrademark"
      @size-change="sizeChange"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      background
      layout="prev,pager,next,jumper,->,sizes, total"
      :total="total"
    />
  </el-card>
  <el-dialog
    v-model="dialogFormVisible"
    :title="`${trademarkParams.id ? '修改' : '添加'}品牌`"
  >
    <el-form
      style="width: 80%"
      label-position="left"
      :model="trademarkParams"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="品牌名称" label-width="80px" prop="tmName">
        <el-input
          v-model="trademarkParams.tmName"
          placeholder="请输入品牌名称"
        />
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="80px" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue";
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from "@/api/product/trademark";
import type {
  Records,
  TradeMarkResponseData,
  Trademark,
} from "@/api/product/trademark/types";
import { ElMessage } from "element-plus";
import type { FormInstance, UploadProps } from "element-plus";

let currentPage = ref(1);
let pageSize = ref(3);
let total = ref(0);
let trademarkArr = ref<Records>([]);
let dialogFormVisible = ref<boolean>(false);
let trademarkParams = reactive<Trademark>({
  tmName: "",
  logoUrl: "",
});
let formRef = ref<FormInstance | null>(null);
const validatorTmName = (rule: any, value: any, callBack: any) => {
  console.log(rule, value, callBack);
  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error("品牌名称应大于等于2"));
  }
};
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  console.log(rule, value, callBack);
  if (value) {
    callBack();
  } else {
    callBack(new Error("请上传品牌LOGO"));
  }
};
let rules = {
  tmName: [{ required: true, trigger: "blur", validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
};
const getHasTrademark = async (page = 1) => {
  currentPage.value = page;
  let res: TradeMarkResponseData = await reqHasTrademark(
    currentPage.value,
    pageSize.value
  );
  if (res.code === 200) {
    const { data } = res;
    total.value = data.total;
    trademarkArr.value = data.records;
  }
};
const removeTradeMark = async (id: number) => {
  let res = await reqDeleteTrademark(id);
  if (res.code === 200) {
    ElMessage.success("删除成功");
    getHasTrademark(
      trademarkArr.value.length === 1
        ? currentPage.value - 1
        : currentPage.value
    );
  } else {
    ElMessage.error("删除失败");
  }
};
const sizeChange = () => {
  getHasTrademark();
};
const addTrademark = () => {
  dialogFormVisible.value = true;
  trademarkParams.tmName = "";
  trademarkParams.logoUrl = "";
  trademarkParams.id = 0;
  nextTick(() => {
    formRef.value?.clearValidate();
  });
};
const updateTrademark = (row: Trademark) => {
  nextTick(() => {
    formRef.value?.clearValidate();
  });
  dialogFormVisible.value = true;
  Object.assign(trademarkParams, row);
};
const cancel = () => {
  dialogFormVisible.value = false;
};
const confirm = async () => {
  if (!formRef.value) return;
  await formRef.value.validate();
  let res = await reqAddOrUpdateTrademark(trademarkParams);
  if (res.code === 200) {
    ElMessage.success("操作成功");
    dialogFormVisible.value = false;
    getHasTrademark(trademarkParams.id ? currentPage.value : 1);
  } else {
    ElMessage.error("操作失败");
  }
};
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
    rawFile.type == "image/jpeg" ||
    rawFile.type == "image/png" ||
    rawFile.type == "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 > 4) {
      ElMessage.error("不能大于4MB!");
      return false;
    }
    return true;
  } else {
    ElMessage.error("上传图片只能是 JPG/PNG/GIF 格式!");
    return false;
  }
};
const handleAvatarSuccess: UploadProps["onSuccess"] = (res) => {
  trademarkParams.logoUrl = res.data;
  formRef.value?.clearValidate("logoUrl");
};

onMounted(() => {
  getHasTrademark();
});
</script>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
}
:deep(.pagination > *) {
  margin: 5px 0;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}
:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
