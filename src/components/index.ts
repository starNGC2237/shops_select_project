import SvgIcon from "./SvgIcon/index.vue";

const allGlobalComponents: any = { SvgIcon };

// 对外暴露插件对象
export default {
  // 务必叫 install
  install(app: any) {
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key]);
    });
  },
};
