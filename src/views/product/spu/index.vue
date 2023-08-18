<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <el-table border style="margin: 10px 0" :data="records">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          >
          </el-table-column>
          <el-table-column label="SPU名称" prop="spuName"> </el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="SPU操作">
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
                @click="addSku(row)"
              >
              </el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(row)"
              >
              </el-button>
              <el-button
                type="info"
                size="small"
                icon="Search"
                title="查看SKU列表"
              >
              </el-button>
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                title="删除SPU"
              >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout=" prev, pager, next, jumper,->,sizes,total "
          :total="total"
          @current-change="getHasSpu"
          @size-change="changeSize"
        />
      </div>
      <SpuForm
        ref="SpuFormRef"
        v-show="scene === 1"
        @changeScene="changeScene"
      />
      <SkuForm v-show="scene === 2" @changeScene="changeScene" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { SpuData } from "@/api/product/spu/types.ts";
import { ref, watch } from "vue";
import useCategoryStore from "@/store/modules/category";
import { reqHasSpu } from "@/api/product/spu";
import type { HasSpuResponseData, Records } from "@/api/product/spu/types.ts";
import SpuForm from "./components/SpuForm.vue";
import SkuForm from "./components/SkuForm.vue";
let categoryStore = useCategoryStore();
let scene = ref<number>(0);
let pageNo = ref<number>(1);
let pageSize = ref<number>(3);
let records = ref<Records>([]);
let total = ref<number>(0);
let SpuFormRef = ref<any>(null);

watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return;
    getHasSpu();
  }
);
const getHasSpu = (page = 1) => {
  pageNo.value = page;
  reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id).then(
    (res: HasSpuResponseData) => {
      if (res.code === 200) {
        records.value = res.data.records;
        total.value = res.data.total;
      }
    }
  );
};
const changeSize = () => {
  getHasSpu();
};
const addSpu = () => {
  scene.value = 1;
  SpuFormRef.value.initAddSpu(categoryStore.c3Id);
};
const updateSpu = (row: SpuData) => {
  scene.value = 1;
  SpuFormRef.value.initHasSpuData(row);
};
const changeScene = (obj: any) => {
  const { flag, params } = obj;
  scene.value = flag;
  params === "update" && getHasSpu(pageNo.value);
  params !== "update" && getHasSpu();
};
const addSku = (row: any) => {
  console.log(row);
  scene.value = 2;
};
</script>

<style scoped></style>
