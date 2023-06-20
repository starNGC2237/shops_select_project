<script setup lang="ts">
import { useRouter } from "vue-router";
import { Lock, User } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import useUserStore from "@/store/modules/user";
import { ElMessage, ElNotification } from "element-plus";
import { getMoment } from "@/utils/time";

let userStore = useUserStore();
let $router = useRouter();
let loginFormRef = ref();
let loginForm = reactive({
  username: "admin",
  password: "111111",
});
let loading = ref(false);
const loginFormRules = {
  username: [
    {
      required: true,
      min: 3,
      max: 10,
      message: "长度在 3 到 10 个字符",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 15,
      message: "长度在 6 到 15 个字符",
      trigger: "change",
    },
  ],
};

const login = async () => {
  await loginFormRef.value.validate();
  loading.value = true;
  try {
    await userStore.userLogin(loginForm);
    $router.push("/");
    ElNotification({
      message: "登录成功",
      type: "success",
      title: getMoment() + "，" + loginForm.username,
    });
    loading.value = false;
  } catch (error) {
    loading.value = false;
    ElMessage.error((error as Error).message);
  }
};
</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0" />
      <el-col :span="12" :xs="24">
        <el-form
          ref="loginFormRef"
          class="login_form"
          :model="loginForm"
          :rules="loginFormRules"
        >
          <h1>您好</h1>
          <h2>欢迎来到运营平台</h2>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :show-password="true"
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url(@/assets/images/background.jpg) no-repeat;
  background-size: cover;
}
.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url(@/assets/images/login_form.png) no-repeat;
  background-size: cover;
  padding: 40px;
  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    font-size: 20px;
    color: white;
    margin: 20px 0;
  }
  .login_btn {
    width: 100%;
  }
}
</style>
