<template>
  <div class="goods__edit">
    <el-card :body-style="{ padding: 0 }" :shadow="'never'">
      <el-page-header @back="goBack" class="page-header">
        <template #content>
          <span> 商品添加/编辑 </span>
        </template>
      </el-page-header>
    </el-card>

    <div class="content">
      <el-card shadow="never" class="content__card" body-style="padding:0;">
        <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="基础设置" name="baseSettings">
            基础设置
          </el-tab-pane>
          <el-tab-pane label="价格/库存" name="priceOrInventory">
            <PriceOrInventory />
          </el-tab-pane>
          <el-tab-pane label="物流设置" name="LogisticsSetup">
            物流设置
          </el-tab-pane>
          <el-tab-pane label="商品详情" name="ProductDetails">
            商品详情
          </el-tab-pane>
          <el-tab-pane label="销售设置" name="SalesSettings">
            销售设置
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import PriceOrInventory from "./priceOrInventory/index.vue";
import type { TabsPaneContext } from "element-plus";
import { ref } from "vue";
import { useRouter } from "vue-router";

let $router = useRouter();

let activeTab = ref("priceOrInventory");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const goBack = () => {
  $router.go(-1);
};
</script>

<style scoped lang="scss">
.page-header {
  padding: 20px;
}
.content {
  margin-top: 16px;
  .content__card {
    padding: 10px 20px 20px 20px;
  }
}
</style>
