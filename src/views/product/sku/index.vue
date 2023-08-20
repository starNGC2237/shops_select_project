<template>
  <el-card>
    <el-table border style="margin: 10px 0" :data="skuArr">
      <el-table-column label="序号" type="index" align="center" width="80px">
      </el-table-column>
      <el-table-column
        prop="skuName"
        label="名称"
        show-overflow-tooltip
        width="150px"
      >
      </el-table-column>
      <el-table-column
        prop="skuDesc"
        label="描述"
        show-overflow-tooltip
        width="150px"
      >
      </el-table-column>
      <el-table-column label="图片" width="150px">
        <template #default="{ row }">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.skuDefaultImg"
            fit="contain"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="150px">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="150px">
      </el-table-column>
      <el-table-column label="操作" width="300px" fixed="right">
        <template #default>
          <el-button size="small" icon="Bottom"> </el-button>
          <el-button type="primary" size="small" icon="Edit"> </el-button>
          <el-button type="info" size="small" icon="InfoFilled"> </el-button>
          <el-button type="danger" size="small" icon="Delete"> </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="getHasSku"
      @size-change="handler"
    />
  </el-card>
</template>

<script setup lang="ts">
import { reqSkuList } from "@/api/product/sku";
import { SkuResponseData } from "@/api/product/sku/types";
import { SkuData } from "@/api/product/spu/types";
import { onMounted, ref } from "vue";

let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);
let skuArr = ref<SkuData[]>([]);

const getHasSku = async (pager: any = 1) => {
  pageNo.value = pager;
  let res: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value);
  if (res.code === 200) {
    total.value = res.data.total;
    skuArr.value = res.data.records;
  }
};
const handler = () => {
  getHasSku();
};

onMounted(() => {
  getHasSku();
});
</script>

<style scoped></style>
