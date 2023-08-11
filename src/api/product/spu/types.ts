export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
export interface SpuData {
  id?: number;
  spuName: string;
  description: string;
  category3Id: number | string;
  tmId: number | string;
  spuSaleAttrList: null | SaleAttr[];
  spuImageList: null | SpuImg[];
}
export type Records = SpuData[];
export interface HasSpuResponseData extends ResponseData {
  data: {
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
    records: Records;
  };
}
export interface Trademark {
  id: number;
  tmName: string;
  logoUrl: string;
}

export interface AllTrademarkResponseData extends ResponseData {
  data: Trademark[];
}
export interface SpuImg {
  id?: number;
  createTime: string;
  updateTime: string;
  spuId?: number;
  imgName: string;
  imgUrl: string;
}

export interface SpuHasImg extends ResponseData {
  data: SpuImg[];
}
export interface SaleAttrValue {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName?: string;
  isChecked?: boolean;
}
export type spuSaleAttrValueList = SaleAttrValue[];
export interface SaleAttr {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrName: string;
  spuSaleAttrValueList: spuSaleAttrValueList;
}
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}
export interface HasSaleAttr {
  id: number;
  name: string;
}
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[];
}
