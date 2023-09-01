import request from "@/utils/request";
import { MenuResponseData, RoleData, RoleResponseData } from "./type";
enum API {
  ALLROLE_URL = "/admin/acl/role/",
  ADDROLE_URL = "/admin/acl/role/save",
  UPDATE_ROLE_URL = "/admin/acl/role/update",
  ALLPERMISSION_URL = "/admin/acl/permission/toAssign/",
  SETPERMISSION_URL = "/admin/acl/permission/doAssign",
}
export const reqAllRoleList = (page: number, limit: number, keywoed: string) =>
  request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${page}/${limit}/?roleName=${keywoed}`
  );
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_ROLE_URL, data);
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data);
  }
};
export const reqAllPermissionList = (roleId: number) =>
  request.get<any, MenuResponseData>(API.ALLPERMISSION_URL + roleId);
export const reqSetPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`
  );
