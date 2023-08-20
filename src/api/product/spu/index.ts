import request from "@/utils/request";
import type {
  AllTrademarkResponseData,
  HasSaleAttrResponseData,
  HasSpuResponseData,
  SaleAttrResponseData,
  SkuData,
  SkuResponseData,
  SpuData,
  SpuHasImg,
} from "./types.ts";
enum API {
  HASSPU_URL = "/admin/product/",
  ALLTRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList/",
  IMAGE_URL = "/admin/product/spuImageList/",
  SPUHASSALEATTRE_URL = "/admin/product/spuSaleAttrList/",
  ALLSALEATTR_URL = "/admin/product/baseSaleAttrList",
  ADDSPU_URL = "/admin/product/saveSpuInfo",
  UPDATESPU_URL = "/admin/product/updateSpuInfo",
  ADDSKU_URL = "/admin/product/saveSkuInfo",
  SKUINFO_URL = "/admin/product/findBySpuId/",
  REMOVESPU_URL = "/admin/product/deleteSpu/",
}
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string
) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`
  );

export const reqAllTrademark = () =>
  request.get<any, AllTrademarkResponseData>(API.ALLTRADEMARK_URL);
export const reqSpuImageList = (spuId: number | string) =>
  request.get<any, SpuHasImg>(API.IMAGE_URL + `${spuId}`);
export const reqSpuHasSaleAttr = (spuId: number | string) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTRE_URL + `${spuId}`);
export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL);
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data);
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data);
  }
};
export const reqAddSku = (data: SkuData) =>
  request.post<any, any>(API.ADDSKU_URL, data);
export const reqSkuInfo = (spuId: number | string) =>
  request.get<any, SkuResponseData>(API.SKUINFO_URL + `${spuId}`);
export const reqRemoveSpu = (spuId: number | string) =>
  request.delete<any, any>(API.REMOVESPU_URL + `${spuId}`);
