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
export interface MenuData {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  pid: number;
  code: string;
  toCode: string;
  type: number;
  status: number;
  level: number;
  children?: MenuData[];
  select: boolean;
}
export interface MenuResponseData extends ResponseData {
  data: MenuData[];
}
