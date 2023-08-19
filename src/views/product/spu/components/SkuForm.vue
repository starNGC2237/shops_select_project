<template>
  <el-form label-width="100px" label-position="left">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="SkuParams.skuName"> </el-input>
    </el-form-item>
    <el-form-item label="价格（元）">
      <el-input
        placeholder="价格（元）"
        type="number"
        v-model="SkuParams.price"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="重量（克）">
      <el-input
        placeholder="重量（克）"
        type="number"
        v-model="SkuParams.weight"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        placeholder="SKU描述"
        type="textarea"
        v-model="SkuParams.skuDesc"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline>
        <el-form-item
          v-for="item in attrArr"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select v-model="item.attrIdAndValueId">
            <el-option
              v-for="attrValue in item.attrValueList"
              :key="attrValue.id"
              :label="attrValue.valueName"
              :value="`${item.id}:${attrValue.id}`"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline>
        <el-form-item
          v-for="item in saleAttrArr"
          :key="item.id"
          :label="item.saleAttrName"
        >
          <el-select v-model="item.saleIdAndValueId">
            <el-option
              v-for="saleAttrValue in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"
              :value="`${item.id}:${saleAttrValue.id}`"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgArr" ref="tableRef">
        <el-table-column type="selection" align="center" width="80px">
        </el-table-column>
        <el-table-column align="center" label="图片">
          <template #default="{ row }">
            <img
              style="width: 100px; height: 100px"
              :src="row.imgUrl"
              alt="image"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" label="名称" prop="imgName">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handler(row)">
              设置默认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reqAttr } from "@/api/product/attr";
import {
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAddSku,
} from "@/api/product/spu";
import { SkuData } from "@/api/product/spu/types";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
let $emit = defineEmits(["changeScene"]);
let attrArr = ref<any>([]);
let saleAttrArr = ref<any>([]);
let imgArr = ref<any>([]);
let tableRef = ref<any>(null);
// 收集Sku的参数
let SkuParams = reactive<SkuData>({
  category3Id: "",
  spuId: "",
  tmId: "",
  skuName: "",
  price: "",
  weight: "",
  skuDesc: "",
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skyDefaultImg: "",
});

const cancel = () => {
  $emit("changeScene", { flag: 0, params: "" });
};
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: any
) => {
  SkuParams.category3Id = spu.category3Id;
  SkuParams.spuId = spu.id;
  SkuParams.tmId = spu.tmId;
  let res: any = await reqAttr(c1Id, c2Id, spu.category3Id);
  let res1: any = await reqSpuImageList(spu.id);
  let res2: any = await reqSpuHasSaleAttr(spu.id);
  attrArr.value = res.data;
  saleAttrArr.value = res2.data;
  imgArr.value = res1.data;
};
const handler = (row: any) => {
  imgArr.value.forEach((item: any) => {
    tableRef.value.toggleRowSelection(item, false);
  });
  tableRef.value.toggleRowSelection(row, true);
  SkuParams.skyDefaultImg = row.imgUrl;
};
const save = async () => {
  SkuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(":");
      prev.push({
        attrId,
        valueId,
      });
      return prev;
    }
  }, []);
  SkuParams.skuSaleAttrValueList = saleAttrArr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(":");
        prev.push({
          saleAttrId,
          saleAttrValueId,
        });
        return prev;
      }
    },
    []
  );
  let res = await reqAddSku(SkuParams);
  if (res.code === 200) {
    ElMessage.success("添加成功");
    $emit("changeScene", { flag: 0, params: "" });
  } else {
    ElMessage.error("添加失败");
  }
};
defineExpose({
  initSkuData,
});
</script>

<style scoped></style>
