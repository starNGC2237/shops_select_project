import { createApp } from "vue";
import App from "./App.vue";

import "element-plus/dist/index.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "virtual:svg-icons-register";
// 自定义插件
import globalComponent from "@/components/index.ts";
import "./styles/index.scss";
import router from "./router";
import store from "./store";
import "./styles/nprogress.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./permission";
import { buttonPermission } from "@/directive/buttonPermission";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(globalComponent);
app.use(router);
app.use(store);
buttonPermission(app);
app.mount("#app");
