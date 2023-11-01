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
onMounted(() => {
  init();
  render();
});

function init() {
  let ele = document.querySelector(".login_container_left");
  let w = ele ? ele.getBoundingClientRect().width : 0;
  let h = ele ? ele.getBoundingClientRect().height : 0;
  camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
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
    $router.push({ path: redirect || "/" });
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
      <el-col :span="16" :xs="0">
        <div class="login_container_left"></div>
      </el-col>
      <el-col :span="8" :xs="24" style="display: flex; justify-content: center">
        <el-form
          style="width: 80%"
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
.login_container_left {
  position: relative;
  top: 20vh;
  left: 60px;
  width: calc(100% - 60px);
  height: 70vh;
  background-color: transparent;
}
.login_form {
  position: relative;
  width: 80%;
  height: fit-content;
  top: 30vh;
  background: url(@/assets/images/login_form.png) no-repeat;
  background-size: cover;
  backdrop-filter: blur(5px);
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
