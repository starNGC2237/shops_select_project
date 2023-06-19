import request from "@/utils/request.ts";
import type { loginForm, loginResponseData } from "@/api/user/type.ts";

enum API {
  LOGIN_URL = "/user/login",
  USER_INFO_URL = "/user/info",
}
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);
export const reqUserInfo = () => request.get(API.USER_INFO_URL);
