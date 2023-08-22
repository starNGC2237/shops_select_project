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
        <template #default="{ row }">
          <el-button
            :type="row.isSale === 1 ? 'info' : 'success'"
            size="small"
            :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"
          >
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="
              () => {
                ElMessage.success('功能待开发');
              }
            "
          >
          </el-button>
          <el-button
            type="info"
            size="small"
            icon="InfoFilled"
            @click="findSpu(row)"
          >
          </el-button>
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
    <el-drawer v-model="drawer" size="40%">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ info.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ info.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ info.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="item in info.skuAttrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="item in info.skuSaleAttrValueList"
              :key="item.id"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in info.skuImageList"
                :key="item.id"
              >
                <div
                  style="
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <el-image
                    :src="item.imgUrl"
                    :alt="item.imgName"
                    fit="contain"
                  />
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import {
  reqSkuCancelSale,
  reqSkuList,
  reqSkuSale,
  reqSkuInfo,
} from "@/api/product/sku";
import { SkuResponseData } from "@/api/product/sku/types";
import { SkuData, SkuInfoResponseData } from "@/api/product/spu/types";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);
let skuArr = ref<SkuData[]>([]);
let drawer = ref<boolean>(false);
let info = ref<SkuData>({});

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
const updateSale = async (row: SkuData) => {
  if (row.isSale === 1) {
    await reqSkuCancelSale(row.id as number);
    ElMessage.success("下架成功");
  } else {
    await reqSkuSale(row.id as number);
    ElMessage.success("上架成功");
  }
  getHasSku(pageNo.value);
};
const findSpu = async (row: SkuData) => {
  let res: SkuInfoResponseData = await reqSkuInfo(row.id as number);
  if (res.code === 200) {
    info.value = res.data;
  }
  drawer.value = true;
};

onMounted(() => {
  getHasSku();
});
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
