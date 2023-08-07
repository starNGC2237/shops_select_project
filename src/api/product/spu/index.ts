import request from "@/utils/request";
import type { HasSpuResponseData } from "./types.ts";
enum API {
  HASSPU_URL = "/admin/product/",
}
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string
) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`
  );
