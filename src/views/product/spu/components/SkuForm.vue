<template>
  <el-form label-width="100px" label-position="left">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称"></el-input>
    </el-form-item>
    <el-form-item label="价格（元）">
      <el-input placeholder="价格（元）" type="number"></el-input>
    </el-form-item>
    <el-form-item label="重量（克）">
      <el-input placeholder="重量（克）" type="number"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input placeholder="SKU描述" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline>
        <el-form-item
          v-for="item in attrArr"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select>
            <el-option
              v-for="attrValue in item.attrValueList"
              :key="attrValue.id"
              :value="attrValue.valueName"
            ></el-option>
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
          <el-select>
            <el-option
              v-for="saleAttrValue in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :value="saleAttrValue.saleAttrValueName"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgArr">
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
          <template #default>
            <el-button type="primary" size="small"> 默认 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reqAttr } from "@/api/product/attr";
import { reqSpuImageList, reqSpuHasSaleAttr } from "@/api/product/spu";
import { ref } from "vue";
let $emit = defineEmits(["changeScene"]);
let attrArr = ref<any>([]);
let saleAttrArr = ref<any>([]);
let imgArr = ref<any>([]);

const cancel = () => {
  $emit("changeScene", { flag: 0, params: "" });
};
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: any
) => {
  let res: any = await reqAttr(c1Id, c2Id, spu.category3Id);
  let res1: any = await reqSpuImageList(spu.id);
  let res2: any = await reqSpuHasSaleAttr(spu.id);
  attrArr.value = res.data;
  saleAttrArr.value = res2.data;
  imgArr.value = res1.data;
};
defineExpose({
  initSkuData,
});
</script>

<style scoped></style>
