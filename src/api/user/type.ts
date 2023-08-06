export interface loginFormData {
  username: string;
  password: string;
}
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
export interface LoginResponseData extends ResponseData {
  data: string;
}

export interface UserInfoResponseData extends ResponseData {
  data: {
    result: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}