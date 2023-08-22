import request from "@/utils/request";
import { SkuResponseData } from "./types";
import { SkuInfoResponseData } from "../spu/types";
enum API {
  SKU_URL = "/admin/product/list/",
  SALE_URL = "/admin/product/onSale/",
  CANCELSALE_URL = "/admin/product/cancelSale/",
  SKUINFO_URL = "/admin/product/getSkuInfo/",
  DELETESKU_URL = "/admin/product/deleteSku/",
}
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(`${API.SKU_URL}${page}/${limit}`);
export const reqSkuSale = (skuId: number) =>
  request.get<any, any>(`${API.SALE_URL}${skuId}`);
export const reqSkuCancelSale = (skuId: number) =>
  request.get<any, any>(`${API.CANCELSALE_URL}${skuId}`);
export const reqSkuInfo = (skuId: number) =>
  request.get<any, SkuInfoResponseData>(`${API.SKUINFO_URL}${skuId}`);
export const reqSkuDelete = (skuId: number) =>
  request.get<any, any>(`${API.DELETESKU_URL}${skuId}`);
