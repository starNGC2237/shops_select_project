import request from "@/utils/request";
import { SkuResponseData } from "./types";
enum API {
  SKU_URL = "/admin/product/list/",
}
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(`${API.SKU_URL}${page}/${limit}`);
