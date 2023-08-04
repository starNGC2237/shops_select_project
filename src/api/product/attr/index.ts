import request from "@/utils/request";
import { CategoryResponseData } from "./types";
enum API {
  C1 = "/admin/product/getCategory1",
  C2 = "/admin/product/getCategory2/",
  C3 = "/admin/product/getCategory3/",
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1);
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2 + category1Id);
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3 + category2Id);
