export const checkPhone = (phone) => {
  if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) return false;
  return true;
};
export const checkPwd = (value) => {
//   if (!/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/.test(value)) return false;
  if (!value) return false;
  return true;
};
