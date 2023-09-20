import pinia from "@/store";
import useUserStore from "@/store/modules/user";

const userStore = useUserStore(pinia);

export const buttonPermission = (app: any) => {
  app.directive("has", {
    mounted(el: any, option: any) {
      if (!userStore.buttons.includes(option.value)) {
        el.parentNode.removeChild(el);
      }
    },
  });
};
