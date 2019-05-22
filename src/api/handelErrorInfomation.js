export const a = 'a';
export const b = 'a';
export const handelMassage = (message) => {
  if (!message) return message;
  if (Object.prototype.toString.call(message) !== '[object String]') return message;
  if (message.length > 100) return '服务器抽风啦';
  if (!/.*[\u4e00-\u9fa5]+.*$/.test(message)) return '服务器离家出走了';
  return message;
};
export const catchError = (error) => {
  const { response: { data: { message } = {} } = {} } = error;
  return {
    message: handelMassage(message),
    code: null,
  };
};
