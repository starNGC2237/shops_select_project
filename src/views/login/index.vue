<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { Lock, User } from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "vue";
import useUserStore from "@/store/modules/user";
import { ElMessage, ElNotification } from "element-plus";
import { getMoment } from "@/utils/time";
import * as THREE from "three";

import { OrbitControls } from "@/assets/three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "@/assets/three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "@/assets/three/addons/loaders/DRACOLoader.js";

let camera: any, scene: any, renderer: any;
let darkValue = ref(false);

onMounted(() => {
  init();
  render();
  darkValue.value = localStorage.getItem("dark") === "dark";
  changeDark();
});

const changeDark = () => {
  darkValue.value
    ? (document.documentElement.className = "dark")
    : (document.documentElement.className = "");
  localStorage.setItem("dark", darkValue.value ? "dark" : "");
};
function init() {
  let ele = document.querySelector(".login_container_left");
  let w = ele ? ele.getBoundingClientRect().width : 0;
  let h = ele ? ele.getBoundingClientRect().height : 0;
  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
  camera.position.set(1.5, 4, 9);

  scene = new THREE.Scene();
  scene.background = null;

  //

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("jsm/libs/draco/gltf/");
  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  loader.setPath("/models/gltf/AVIFTest/");
  loader.load("forest_house.glb", function (gltf: any) {
    scene.add(gltf.scene);
    render();
  });

  //

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0xffffff, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(w, h);
  document
    .querySelector(".login_container_left")
    ?.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  // 禁止平移
  controls.enablePan = false;
  controls.addEventListener("change", render);
  controls.target.set(0, 2, 0);
  controls.update();

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  let w = document.querySelector(".login_container_left")
    ? document.querySelector(".login_container_left")?.getBoundingClientRect()
        .width
    : 0;
  let h = document.querySelector(".login_container_left")
    ? document.querySelector(".login_container_left")?.getBoundingClientRect()
        .height
    : 0;
  renderer.setSize(w, h);

  render();
}

//

function render() {
  renderer.render(scene, camera);
}

let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
let loginFormRef = ref();
let loginForm = reactive({
  username: "admin",
  password: "atguigu123",
});
let loading = ref(false);
const loginFormRules = {
  username: [
    /**
     * {
      required: true,
      min: 3,
      max: 10,
      message: "长度在 3 到 10 个字符",
      trigger: "change",
    },
     */
    {
      trigger: "change",
      validator: (_: any, value: any, callback: any) => {
        if (/^\w{3,10}$/.test(value)) {
          callback();
        } else {
          callback(new Error("长度在 3 到 10 个字符"));
        }
      },
    },
  ],
  password: [
    {
      trigger: "change",
      validator: (_: any, value: any, callback: any) => {
        if (/^\w{6,15}$/.test(value)) {
          callback();
        } else {
          callback(new Error("长度在 6 到 15 个字符"));
        }
      },
    },
    /**
     * {
      required: true,
      min: 6,
      max: 15,
      message: "长度在 6 到 15 个字符",
      trigger: "change",
    },
     */
  ],
};

const login = async () => {
  await loginFormRef.value.validate();
  loading.value = true;
  try {
    await userStore.userLogin(loginForm);
    let redirect: any = $route.query.redirect;
    await $router.push({ path: redirect || "/" });
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
    <el-row class="login_row">
      <el-col :span="15" :xs="0">
        <div class="login_container_left"></div>
      </el-col>
      <el-col :span="9" :xs="24" class="login_col">
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
              style="height: 2.4rem"
              v-model="loginForm.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              style="height: 2.4rem"
              :show-password="true"
              v-model="loginForm.password"
              :type="'password'"
              placeholder="请输入密码"
              :prefix-icon="Lock"
            >
            </el-input>
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
      <el-switch
        v-model="darkValue"
        active-icon="MoonNight"
        inactive-icon="Sunny"
        inline-prompt
        class="switch_dark"
        @change="changeDark"
      >
      </el-switch>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url(@/assets/images/background.jpg) no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_container_left {
  position: relative;
  top: 6vh;
  left: 50px;
  width: calc(100% - 50px);
  height: 80vh;
  background-color: transparent;
}
.login_col {
  display: flex;
  justify-content: flex-start;
}
.login_form {
  position: relative;
  width: 80%;
  height: fit-content;
  top: 30vh;
  background: var(--el-bg-color);
  background-size: cover;
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 10px;
  margin-left: 2rem;
  box-sizing: border-box;
  max-width: 510px;
  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 20px;
    margin: 20px 0;
  }
  .login_btn {
    width: 100%;
  }
  &:hover {
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
  }
}
@media only screen and (max-width: 768px) {
  .login_col {
    justify-content: center;
  }
  .login_form {
    margin-left: 0;
  }
}
.login_row {
  height: calc(100% - 8vh);
  width: calc(100% - 8vh);
  background-color: #fffc;
  border-radius: 10px;
}
html.dark {
  .login_row {
    background-color: #000c !important;
  }
  .login_form {
    &:hover {
      box-shadow: #ffffff1f 0 2px 10px 2px !important;
    }
  }
}
.switch_dark {
  position: absolute;
  top: 10px;
  right: 17px;
  z-index: 999;
}
</style>
