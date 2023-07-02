import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import type { UserState } from "@/store/modules/types/types.ts";
import type {
  loginFormData,
  LoginResponseData,
  UserInfoResponseData,
} from "@/api/user/type";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import { constantRoutes } from "@/router/routes";

const useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      token: GET_TOKEN() || "",
      menuRoutes: constantRoutes,
      username: "",
      avatar: "",
    };
  },
  actions: {
    async userLogin(data: loginFormData) {
      const result: LoginResponseData = await reqLogin(data);
      if (result.code === 200) {
        this.token = result.data as string;
        SET_TOKEN(result.data as string);
        return "ok";
      } else {
        return Promise.reject(new Error(result.data));
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const result: UserInfoResponseData = await reqUserInfo();
      if (result.code === 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    // 退出登录
    async userLogout() {
      const result: any = await reqLogout();
      if (result.code === 200) {
        this.token = "";
        this.username = "";
        this.avatar = "";
        REMOVE_TOKEN();
        return "ok";
      }
    },
  },
  getters: {},
});
export default useUserStore;
