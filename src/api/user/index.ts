import request from "@/utils/request.ts";
import type {
  loginFormData,
  LoginResponseData,
  UserInfoResponseData,
} from "./type";

enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USER_INFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}
export const reqLogin = (data: loginFormData) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data);
export const reqUserInfo = () =>
  request.get<any, UserInfoResponseData>(API.USER_INFO_URL);
export const reqLogout = () => request.post(API.LOGOUT_URL);
