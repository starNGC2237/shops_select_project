import dayjs from "dayjs";
export const getMoment = () => {
  const h = dayjs().hour();
  if (h >= 0 && h <= 6) {
    return "凌晨好";
  }
  if (h > 6 && h <= 12) {
    return "上午好";
  }
  if (h >= 12 && h <= 18) {
    return "下午好";
  }
  if (h > 18 && h <= 24) {
    return "晚上好";
  }
  return "您好";
};
