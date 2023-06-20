export interface loginForm {
  username: string;
  password: string;
}
interface dataType {
  token?: string;
  message?: string;
}

export interface loginResponseData {
  code: number;
  data: dataType;
}

interface UserInfo {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  roles: string[];
  desc: string;
  button: string[];
  routes: string[];
  token: string;
}
interface user {
  checkUser: UserInfo;
}
export interface userResponseData {
  code: number;
  data: user;
}
