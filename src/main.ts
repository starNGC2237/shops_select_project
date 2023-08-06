import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "virtual:svg-icons-register";
// 自定义插件
import globalComponent from "@/components/index.ts";
import "./styles/index.scss";
import router from "./router";
import store from "./store";
import "./styles/nprogress.css";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(globalComponent);
app.use(ElementPlus, { locale: zhCn });
app.use(router);
app.use(store);
import "./permission";
app.mount("#app");