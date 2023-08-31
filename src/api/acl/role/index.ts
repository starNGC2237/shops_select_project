import request from "@/utils/request";
import { RoleData, RoleResponseData } from "./type";
enum API {
  ALLROLE_URL = "/admin/acl/role/",
  ADDROLE_URL = "/admin/acl/role/save",
  UPDATE_ROLE_URL = "/admin/acl/role/update",
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
