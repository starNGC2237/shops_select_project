<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id === ''"
          @click="addAttr"
        >
          添加平台属性
        </el-button>
        <el-table border style="margin: 10px 0px" :data="attrArr">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          >
          </el-table-column>
          <el-table-column label="属性名称" width="120px" prop="attrName">
          </el-table-column>
          <el-table-column label="属性值名称" prop="">
            <template #default="{ row }">
              <el-tag
                style="margin: 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #default="{ row }">
              <el-button
                type="warning"
                size="small"
                icon="Edit"
                @click="updateAttr(row)"
              >
              </el-button>
              <el-popconfirm title="确定删除吗？" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete">
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene === 1">
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="attrParams.attrName === ''"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button @click="cancel">取消</el-button>
        <el-table
          border
          style="margin: 10px 0"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          >
          </el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputArr[$index] = vc)"
                size="small"
                v-model="row.valueName"
                v-if="row.flag"
                @blur="() => toLook(row, $index)"
                placeholder="请输入属性值名字"
              >
              </el-input>
              <div v-else @click="() => toEdit(row, $index)">
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #default="{ $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="() => attrParams.attrValueList.splice($index, 1)"
              >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="save"
          :disabled="attrParams.attrValueList.length <= 0"
          >保存</el-button
        >
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqAttr, reqAddUpdate, reqDelete } from "@/api/product/attr";
import { AttrResponseData, Attr } from "@/api/product/attr/types";
import useCategory from "@/store/modules/category";
import { ElMessage } from "element-plus";
import { ref, watch, reactive, nextTick, onBeforeUnmount } from "vue";
let categoryStore = useCategory();
let attrArr = ref<Attr[]>([]);
let scene = ref<number>(0);
let attrParams = reactive<Attr>({
  attrName: "",
  attrValueList: [],
  categoryId: "",
  categoryLevel: 3,
});
let inputArr = ref<any[]>([]);
watch(
  () => categoryStore.c3Id,
  () => {
    attrArr.value = [];
    if (!categoryStore.c3Id) return;
    getAttr();
  }
);
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore;
  let res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
  if (res.code === 200) {
    attrArr.value = res.data;
  }
};
const addAttr = () => {
  Object.assign(attrParams, {
    attrName: "",
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  });
  scene.value = 1;
};
const updateAttr = (row: Attr) => {
  scene.value = 1;
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
};
const cancel = () => {
  scene.value = 0;
};
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: "",
    flag: true,
  });
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus();
  });
};
const save = async () => {
  let res: any = await reqAddUpdate(attrParams);
  if (res.code === 200) {
    scene.value = 0;
    ElMessage.success(attrParams.id ? "修改成功" : "添加成功");
    getAttr();
  } else {
    ElMessage.error(attrParams.id ? "修改失败" : "添加失败");
  }
};
const toLook = (row: any, index: number) => {
  if (row.valueName.trim() == "") {
    attrParams.attrValueList.splice(index, 1);
    ElMessage.warning("属性值不能为空");
    return;
  }
  let repeat = attrParams.attrValueList.find((item: any) => {
    if (item != row) {
      return item.valueName === row.valueName;
    }
  });
  if (repeat) {
    attrParams.attrValueList.splice(index, 1);
    ElMessage.error("属性值不能重复");
    return;
  }
  row.flag = false;
};
const toEdit = (row: any, $index: number) => {
  row.flag = true;
  nextTick(() => {
    inputArr.value[$index].focus();
  });
};
const deleteAttr = (attrId: string | number) => {
  reqDelete(attrId).then((res) => {
    if (res.code === 200) {
      ElMessage.success("删除成功");
      getAttr();
    } else {
      ElMessage.error("删除失败");
    }
  });
};
onBeforeUnmount(() => {
  categoryStore.$reset();
});
</script>

<style scoped></style>
