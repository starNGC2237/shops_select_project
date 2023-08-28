export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
export interface User {
  id?: number;
  createTime?: string;
  updateTime?: string;
  username?: string;
  password?: string;
  name?: string;
  phone?: string;
  roleName?: string;
}
export type Records = User[];
export type UserResponse = {
  records: Records;
  total: number;
  size: number;
  current: number;
  pages: number;
};
export interface UserResponseData extends ResponseData {
  data: UserResponse;
}
export interface RoleData {
  id?: number;
  roleName: string;
  createTime?: string;
  updateTime?: string;
  remark: null;
}
export type RoleResData = {
  assignRoles: RoleData[];
  allRolesList: RoleData[];
};
export interface RoleResponseData extends ResponseData {
  data: RoleResData;
}
export interface SetRoleData {
  userId: number;
  roleIdList: number[];
}
