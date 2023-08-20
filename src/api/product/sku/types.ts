export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
export interface Attr {
  attrId: number | string;
  valueId: number | string;
}
export interface saleAttr {
  saleAttrId: number | string;
  saleAttrValueId: number | string;
}
export interface SkuData {
  category3Id: number | string;
  spuId: number | string;
  tmId: number | string;
  skuName: string;
  price: number | string;
  weight: number | string;
  skuDesc: string;
  skuAttrValueList: Attr[];
  skuSaleAttrValueList: saleAttr[];
  skyDefaultImg: string;
}
export interface SkuResData {
  records: SkuData[];
  total: number;
  size: number;
  current: number;
  orders: any[];
  optimizeCountSql: boolean;
  hitCount: boolean;
  countId: any;
  maxLimit: any;
  searchCount: boolean;
  pages: number;
}
export interface SkuResponseData extends ResponseData {
  data: SkuResData;
}
