/// <reference types="vite/client" />
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<any, any, any>;
  export default component;
}
declare module "element-plus/dist/locale/zh-cn.mjs";
declare module "nprogress";
declare module "three";
declare module "@/assets/three/addons/controls/OrbitControls.js";
declare module "@/assets/three/addons/loaders/GLTFLoader.js";
declare module "@/assets/three/addons/loaders/DRACOLoader.js";
