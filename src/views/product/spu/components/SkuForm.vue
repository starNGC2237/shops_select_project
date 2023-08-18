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
        <el-form-item label="内存">
          <el-select> </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select> </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select> </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline>
        <el-form-item label="内存">
          <el-select> </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select> </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select> </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border>
        <el-table-column type="selection" align="center" width="80px">
        </el-table-column>
        <el-table-column align="center" label="图片"> </el-table-column>
        <el-table-column align="center" label="名称"> </el-table-column>
        <el-table-column align="center" label="操作"> </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
let $emit = defineEmits(["changeScene"]);
const cancel = () => {
  $emit("changeScene", { flag: 0, params: "" });
};
</script>

<style scoped></style>
