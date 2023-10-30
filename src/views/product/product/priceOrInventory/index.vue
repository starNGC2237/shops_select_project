<template>
  <div>
    <el-form label-position="right" label-width="120px">
      <el-form-item label="商品规格">
        <el-radio-group v-model="radio" style="margin-left: 16px">
          <el-radio label="single">单规格</el-radio>
          <el-radio label="multi">多规格</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-form
      :rules="singleFormRule"
      label-position="right"
      label-width="120px"
      v-show="radio === 'single'"
      :model="singleForm"
    >
      <el-form-item label="商品价格" prop="good_price">
        <div class="w-60">
          <el-input v-model="singleForm.good_price" placeholder="请输入金额">
            <template #append>元</template>
          </el-input>
        </div>
      </el-form-item>
      <el-form-item label="划线价" prop="good_scribed_price">
        <div class="w-60">
          <el-input
            v-model="singleForm.good_scribed_price"
            placeholder="请输入划线价"
          >
            <template #append>元</template>
          </el-input>
        </div>
      </el-form-item>
      <el-form-item label="成本价" prop="good_cost_price">
        <div class="w-60">
          <el-input
            v-model="singleForm.good_cost_price"
            placeholder="请输入成本价"
          >
            <template #append>元</template>
          </el-input>
        </div>
      </el-form-item>
      <el-form-item label="库存" prop="good_inventory">
        <div class="w-60">
          <el-input
            v-model="singleForm.good_inventory"
            placeholder="请输入库存数量"
          >
          </el-input>
        </div>
      </el-form-item>
      <el-form-item label="体积" prop="good_volume">
        <div class="w-60">
          <el-input v-model="singleForm.good_volume" placeholder="请输入">
            <template #append>m³</template>
          </el-input>
        </div>
      </el-form-item>
      <el-form-item label="重量" prop="good_weight">
        <div class="w-60">
          <el-input v-model="singleForm.good_weight" placeholder="请输入">
            <template #append>KG</template>
          </el-input>
        </div>
      </el-form-item>
      <el-form-item label="条形码" prop="good_bar_code">
        <div class="w-60">
          <el-input v-model="singleForm.good_bar_code" placeholder="请输入">
          </el-input>
        </div>
      </el-form-item>
    </el-form>
    <div v-show="radio === 'multi'">
      <div class="specifications">
        <el-button
          type="primary"
          style="margin-left: 16px"
          @click="addSpecification"
        >
          添加规格值
        </el-button>
        <div
          v-for="(item, index) in data"
          :key="index"
          class="specification_item"
        >
          <el-icon class="icon_close" @click="removeSpecification(item)">
            <CircleCloseFilled />
          </el-icon>
          <el-form style="width: 100%">
            <el-form-item label="规格名">
              <div style="display: flex">
                <el-input
                  v-model="item.name"
                  show-word-limit
                  type="text"
                  maxlength="20"
                >
                </el-input>
                <el-checkbox style="margin-left: 16px" v-model="item.selectPic">
                  规格图片
                </el-checkbox>
              </div>
            </el-form-item>
            <el-form-item label="规格值">
              <div class="specification_value">
                <div
                  class="specification_value_item"
                  v-for="(item2, index2) in item.values"
                  :key="index2"
                >
                  <el-input
                    v-model="item2.valueName"
                    show-word-limit
                    type="text"
                    maxlength="20"
                  >
                  </el-input>
                  <div
                    style="height: 60px; width: 60px"
                    v-show="item.selectPic"
                  >
                    <el-upload
                      action="#"
                      list-type="picture-card"
                      :auto-upload="false"
                      style="height: 60px; width: 60px"
                    >
                      <el-icon><Plus /></el-icon>
                      <template #file="{ file }">
                        <div>
                          <img :src="file.url" alt="" />
                          <span>
                            <span>
                              <el-icon><zoom-in /></el-icon>
                            </span>
                            <span>
                              <el-icon><Download /></el-icon>
                            </span>
                            <span>
                              <el-icon><Delete /></el-icon>
                            </span>
                          </span>
                        </div>
                      </template>
                    </el-upload>
                  </div>
                </div>
                <div class="specification_value_item">
                  <el-button
                    icon="Plus"
                    class="btn"
                    @click="addNewValue(item.values)"
                  >
                    添加规格值
                  </el-button>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style="margin-top: 32px">
        <el-form label-width="120px" label-position="right">
          <el-form-item label="规格明细">
            <div style="padding-left: 10px; width: 100%">
              <div style="margin-bottom: 16px">
                <el-button :disabled="true">设置价格</el-button>
                <el-button :disabled="true">设置划线价</el-button>
                <el-button :disabled="true">设置成本价</el-button>
                <el-button :disabled="true">设置库存</el-button>
                <el-button :disabled="true">设置体积</el-button>
                <el-button :disabled="true">设置重量</el-button>
                <el-button :disabled="true">设置条码</el-button>
              </div>
              <el-table
                style="width: 100%"
                :data="tableData"
                v-if="tableRefNumber"
              >
                <el-table-column
                  v-for="item in data"
                  :key="item.id"
                  :label="item.name"
                  :prop="item.id"
                />
                <el-table-column label="*价格">
                  <el-input />
                </el-table-column>
                <el-table-column label="划线价"><el-input /></el-table-column>
                <el-table-column label="成本价"><el-input /></el-table-column>
                <el-table-column label="*库存"><el-input /></el-table-column>
                <el-table-column label="体积"><el-input /></el-table-column>
                <el-table-column label="重量"><el-input /></el-table-column>
                <el-table-column label="条码"><el-input /></el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { v4 as uuidv4 } from "uuid";

let radio = ref("multi");
let singleForm = ref({
  good_price: "",
  good_scribed_price: "",
  good_cost_price: "",
  good_inventory: "",
  good_volume: "",
  good_weight: "",
  good_bar_code: "",
});
let singleFormRule = ref({
  good_price: [{ required: true, message: "请输入商品金额", trigger: "blur" }],
  good_inventory: [
    { required: true, message: "请输入商品库存", trigger: "blur" },
  ],
});
let tableRefNumber = ref(1);

let data: any = ref([]);
let tableData = computed(() => {
  let tableDataTemp: any = [];
  data.value.forEach((item: any) => {
    let temp: any[] = [];
    item.values.forEach((item2: any) => {
      temp.push({
        ...item2,
        ...{
          pId: item.id,
          [item.id]: item2.valueName,
        },
      });
    });
    tableDataTemp.push(temp);
  });
  console.log(tableDataTemp);
  /**
   * const resolveC = (t, g) => {
    if (t.length === 0) {
      return g;
    } else {
      let r = [...g];
      for (let i = 0; i < t.length; i++) {
        for (let j = 0; j < g.length; j++) {
          r.push({
            ...g[j],
            ...{
              [t[0][i].id]: t[0][i].valueName,
            },
          });
        }
      }
      return resolveC(t, r);
    }
  };
   */

  const cartesianProduct = (arrays: any[]): any => {
    // 如果列表为空，返回空列表
    if (arrays.length === 0) {
      return [];
    }
    // 如果列表只有一个数组，返回该数组
    if (arrays.length === 1) {
      return arrays[0];
    }
    // 否则，取出第一个数组和剩余数组
    let first = arrays[0];
    let rest = arrays.slice(1);
    // 递归地求解剩余数组的笛卡尔积
    let restProduct = cartesianProduct(rest);
    // 初始化结果列表
    let result = [];
    // 遍历第一个数组和剩余数组的笛卡尔积，将它们拼接成字符串，并添加到结果列表中
    for (let x of first) {
      for (let y of restProduct) {
        result.push({
          ...y,
          ...x,
        });
      }
    }
    // 返回结果列表
    return result;
  };
  return cartesianProduct(tableDataTemp);
});

const addSpecification = () => {
  data.value.push({
    id: uuidv4(),
    name: "",
    selectPic: false,
    values: [
      {
        valueId: uuidv4(),
        valueName: "",
        valueImg: "",
      },
    ],
  });
  tableRefNumber.value = 0;
  nextTick(() => {
    tableRefNumber.value = 1;
  });
};
const addNewValue = (
  values: { valueId: any; valueName: string; valueImg: string }[]
) => {
  if (!values) return;
  values.push({
    valueId: uuidv4(),
    valueName: "",
    valueImg: "",
  });
};
const removeSpecification = (specification: { id: any }) => {
  ElMessageBox.confirm("确认删除吗？", "删除规格值", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    data.value = data.value.filter((item: any) => item.id !== specification.id);
    ElMessage.success("删除成功！");
  });
};
</script>

<style scoped lang="scss">
.w-60 {
  width: 240px;
}
.specifications {
  margin-left: 80px;
  padding-right: 32px;
  .specification_item {
    position: relative;
    background-color: rgb(237, 239, 255);
    display: flex;
    margin-top: 16px;
    margin-left: 16px;
    padding: 16px;
    &:hover {
      .icon_close {
        display: block;
      }
    }
  }
  .icon_close {
    display: none;
    position: absolute;
    top: -8px;
    right: -8px;
    width: 16px;
    height: 16px;
    background-color: #0000004d;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
  }
}
.specification_value {
  display: flex;
  flex-wrap: wrap;
  .specification_value_item {
    width: 160px;
    margin-top: 16px;
    margin-right: 16px;
    .btn {
      color: var(--el-color-primary);
    }
  }
}
:deep(.el-upload) {
  width: 60px;
  height: 60px;
}
</style>
