import axios from "axios";
import { ElMessage } from "element-plus";
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});
request.interceptors.request.use((config) => {
  return config;
});
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let message = "";
    const status = error.response.status;
    switch (status) {
      case 401:
        message = "登录过期，请重新登录";
        break;
      case 403:
        message = "没有权限，请联系管理员";
        break;
      case 404:
        message = "请求资源不存在";
        break;
      case 500:
        message = "服务端错误，请联系管理员";
        break;
      default:
        message = error.response.data.message;
        break;
    }
    ElMessage({
      type: "error",
      message,
    });
    return Promise.reject(error);
  }
);

export default request;
