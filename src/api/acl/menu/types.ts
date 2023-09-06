export interface ResponseData {
  code: number;
  ok: boolean;
  message: string;
}
export interface Permission {
  id?: number;
  name: string;
  pid: number;
  type: number;
  createTime: string;
  updateTime: string;
  code: string;
  toCode: null;
  status: null;
  level: number;
  children?: Permission[];
  select: boolean;
}
export interface PermissionResponseData extends ResponseData {
  data: Permission[];
}
export interface MenuParams {
  id?: number;
  code: string;
  name: string;
  pid: number;
  level: number;
}
