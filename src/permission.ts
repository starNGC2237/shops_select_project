import router from "@/router";
import nprogress from "nprogress";
import pinia from "./store";
import useUserStore from "./store/modules/user";
import setting from "./setting";

const userStore = useUserStore(pinia);
router.beforeEach(async (to: any, _, next: any) => {
  nprogress.start();
  const token = userStore.token;
  const username = userStore.username;
  if (!token) {
    if (to.path !== "/login") {
      next({ path: "/login", query: { redirect: to.path } });
    } else {
      next();
    }
  } else {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (!username) {
        try {
          await userStore.getUserInfo();
          next();
        } catch (err) {
          console.log(err);
          await userStore.userLogout();
          next({ path: "/login", query: { redirect: to.path } });
        }
      } else {
        next();
      }
    }
  }
});
router.afterEach((to: any) => {
  document.title = to.meta.title || setting.title;
  nprogress.done();
});
