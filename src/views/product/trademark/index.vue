<template>
  <el-card>
    <el-button type="primary" icon="Plus">添加品牌</el-button>
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
        <template #default="">
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      background
      layout="prev,pager,next,jumper,->,sizes, total"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { reqHasTrademark } from "@/api/product/trademark";
import type {
  Records,
  TradeMarkResponseData,
} from "@/api/product/trademark/types";

let currentPage = ref(1);
let pageSize = ref(3);
let total = ref(0);
let trademarkArr = ref<Records>([]);

const reqTrademark = async () => {
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
onMounted(() => {
  reqTrademark();
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
</style>
