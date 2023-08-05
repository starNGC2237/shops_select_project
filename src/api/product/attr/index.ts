import request from "@/utils/request";
import { AttrResponseData, CategoryResponseData } from "./types";
enum API {
  C1 = "/admin/product/getCategory1",
  C2 = "/admin/product/getCategory2/",
  C3 = "/admin/product/getCategory3/",
  ATTR_URL = "/admin/product/attrInfoList/",
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1);
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2 + category1Id);
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3 + category2Id);
export const reqAttr = (
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`
  );
