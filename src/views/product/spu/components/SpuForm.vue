<template>
  <el-form :label-width="'100px'">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入名称" v-model="SPuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select placeholder="请选择品牌" v-model="SPuParams.tmId">
        <el-option
          v-for="item in AllTrademark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请输入描述"
        v-model="SPuParams.description"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="SPU图标">
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="
          (file:any) => {
            dialogVisible = true;
            dialogImageUrl = file.url;
          }
        "
        :on-remove="handleRemove"
        :before-upload="handleUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        v-model="saleAttrIdAndValueName"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '无'
        "
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        >
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 10px"
        type="primary"
        icon="Plus"
        :disabled="!saleAttrIdAndValueName"
        @click="addSaleAttr"
      >
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0" :data="saleAttrList">
        <el-table-column label="序号" type="index" align="center" width="80px">
        </el-table-column>
        <el-table-column label="销售属性名" width="120px" prop="saleAttrName">
        </el-table-column>
        <el-table-column label="销售属性值">
          <template #default="{ row, $index }">
            <el-tag
              v-for="item in row.spuSaleAttrValueList"
              :key="item.id"
              closable
              style="margin: 0 5px"
              @close="() => row.spuSaleAttrValueList.splice($index, 1)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              placeholder="请输入属性值"
              size="small"
              style="width: 100px"
              v-if="row.flag == true"
              v-model="row.saleAttrValue"
              @blur="toLook(row)"
            >
            </el-input>
            <el-button
              type="primary"
              size="small"
              icon="Plus"
              @click="toEdit(row)"
              v-else
            >
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #default="{ $index }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="() => saleAttrList.splice($index, 1)"
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save"> 保存 </el-button>
      <el-button type="primary" @click="cancel"> 取消 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type {
  SpuData,
  AllTrademarkResponseData,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  Trademark,
  SaleAttr,
  HasSaleAttr,
} from "@/api/product/spu/types";
import {
  reqAllTrademark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
} from "@/api/product/spu";
import { computed, ref } from "vue";
import { ElMessage } from "element-plus";
import { SaleAttrValue } from "@/api/product/spu/types";
let AllTrademark = ref<Trademark[]>([]);
let imgList = ref<any[]>([]);
let saleAttrList = ref<SaleAttr[]>([]);
let allSaleAttr = ref<HasSaleAttr[]>([]);
let dialogVisible = ref(false);
let dialogImageUrl = ref<string>("");
let SPuParams = ref<SpuData>({
  category3Id: "",
  description: "",
  spuImageList: [],
  spuName: "",
  spuSaleAttrList: [],
  tmId: "",
});
let unSelectSaleAttr = computed(() => {
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttrList.value.every((item1) => {
      return item.name !== item1.saleAttrName;
    });
  });
  return unSelectArr;
});
let saleAttrIdAndValueName = ref<string>("");

const emits = defineEmits(["changeScene"]);
const cancel = () => {
  emits("changeScene", 0);
};
const initHasSpuData = async (spu: SpuData) => {
  SPuParams.value = spu;
  let res: AllTrademarkResponseData = await reqAllTrademark();
  let res1: SpuHasImg = await reqSpuImageList(spu.id as number);
  let res2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number);
  let res3: HasSaleAttrResponseData = await reqAllSaleAttr();

  AllTrademark.value = res.data;
  imgList.value = res1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    };
  });
  saleAttrList.value = res2.data;
  allSaleAttr.value = res3.data;
};
const handleRemove = (file: any, fileList: any) => {
  console.log(file, fileList);
};
const handleUpload = (file: any) => {
  if (
    file.type == "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/gif"
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true;
    } else {
      ElMessage.error("图片大小不能超过3M");
      return false;
    }
  } else {
    ElMessage.error("图片类型应该是jpg,png,gif之一");
    return false;
  }
};
const addSaleAttr = () => {
  let [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(":");
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId: baseSaleAttrId,
    saleAttrName: saleAttrName,
    spuSaleAttrValueList: [],
  };
  saleAttrList.value.push(newSaleAttr);
  saleAttrIdAndValueName.value = "";
};
const toEdit = (row: SaleAttr) => {
  row.flag = true;
  row.saleAttrValue = "";
};
const toLook = (row: SaleAttr) => {
  const { saleAttrValue = "", baseSaleAttrId } = row;
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  };
  if (saleAttrValue.trim() === "") {
    ElMessage.error("属性值不能为空");
    return;
  }
  if (
    row.spuSaleAttrValueList.some(
      (item) => item.saleAttrValueName === saleAttrValue
    )
  ) {
    ElMessage.error("属性值不能重复");
    return;
  }
  row.spuSaleAttrValueList.push(newSaleAttrValue);
  row.flag = false;
};
const save = () => {
  console.log("save");
};
defineExpose({
  initHasSpuData,
});
</script>

<style scoped></style>
