export interface ResponseData {
  code: number;
  ok: boolean;
  message: string;
}
export interface RoleData {
  id?: number;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark?: null;
}
export interface RoleResData {
  records: RoleData[];
  total: number;
  size: number;
  current: number;
  orders: any[];
  optimizeCountSql: boolean;
  hitCount: boolean;
  countId: null;
  maxLimit: null;
  searchCount: boolean;
  pages: number;
}
export interface RoleResponseData extends ResponseData {
  data: RoleResData;
}
