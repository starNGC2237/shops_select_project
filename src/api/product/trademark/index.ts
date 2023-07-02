import request from "@/utils/request";
import { Trademark } from "./types";
enum API {
  TRADEMARK_URL = "/admin/product/baseTrademark",
  ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
  UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
  DELETETRADEMARK_URL = "/admin/product/baseTrademark/remove",
}
export const reqHasTrademark = (page: number, limit: number) => {
  return request.get<any, any>(API.TRADEMARK_URL + `/${page}/${limit}`);
};
export const reqAddOrUpdateTrademark = (data: Trademark) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATETRADEMARK_URL, data);
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data);
  }
};
export const reqDeleteTrademark = (id: number) => {
  return request.delete<any, any>(API.DELETETRADEMARK_URL + `/${id}`);
};
