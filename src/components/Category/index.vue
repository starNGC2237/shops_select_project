<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          @change="handleChangeC1"
          :disabled="scene === 1"
        >
          <el-option
            v-for="item in categoryStore.c1Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2Id"
          @change="handleChangeC2"
          :disabled="scene === 1"
        >
          <el-option
            v-for="item in categoryStore.c2Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id" :disabled="scene === 1">
          <el-option
            v-for="item in categoryStore.c3Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useCategory from "@/store/modules/category";
let categoryStore = useCategory();
onMounted(() => {
  getC1();
});
const getC1 = () => {
  categoryStore.getC1();
};
const handleChangeC1 = () => {
  categoryStore.c2Id = "";
  categoryStore.c2Arr = [];
  categoryStore.c3Id = "";
  categoryStore.c3Arr = [];
  categoryStore.getC2();
};
const handleChangeC2 = () => {
  categoryStore.c3Id = "";
  categoryStore.c3Arr = [];
  categoryStore.getC3();
};
defineProps({
  scene: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped></style>
