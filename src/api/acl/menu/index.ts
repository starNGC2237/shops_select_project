import request from "@/utils/request";
import type { MenuParams, PermissionResponseData } from "./types";

enum Api {
  ALLPERMISSION_URL = "/admin/acl/permission",
  ADDMENU_URL = "/admin/acl/permission/save",
  UPDATE_URL = "/admin/acl/permission/update",
  DELETEMENU_URL = "/admin/acl/permission/remove/",
}

export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(Api.ALLPERMISSION_URL);
export const reqAddMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(Api.UPDATE_URL, data);
  } else {
    return request.post<any, any>(Api.ADDMENU_URL, data);
  }
};
export const reqDeleteMenu = (id: number) =>
  request.delete<any, any>(Api.DELETEMENU_URL + id);
