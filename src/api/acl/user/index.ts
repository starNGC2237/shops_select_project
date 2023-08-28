import request from "@/utils/request";
import { User, UserResponseData, RoleResponseData, SetRoleData } from "./type";

enum API {
  ALLUSER_URL = "/admin/acl/user/",
  ADDUSER_URL = "/admin/acl/user/save",
  UPDATEUSER_URL = "/admin/acl/user/update",
  REMOVEUSER_URL = "/admin/acl/user/remove",
  ALLROLEURL = "/admin/acl/user/toAssign/",
  SETROLE_URL = "/admin/acl/user/doAssignRole",
}
export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`);
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data);
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data);
  }
};
// TODO:删除用户
export const reqRemoveUser = (id: number) =>
  request.delete<any, any>(API.REMOVEUSER_URL + `/${id}`);
export const reqAllRole = (id: number) =>
  request.get<any, RoleResponseData>(API.ALLROLEURL + `${id}`);
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data);
