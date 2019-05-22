/*
 * 这里写api链接，请勿写在别处
 * mainUrl是主链接，会根据生产环境和开发环境自行判断，
 * 在 .env.development .env.localdev .env.production 配置全局变量
 * 在别处引用的时候请这样写
 * import { exampleApi, exampleApi2 } from '@/api/apiList';
 * console.log(exampleApi, exampleApi2)
 */
const mainUrl = process.env.VUE_APP_MAIN_API_URL;

// 示例
export const exampleApi = `${mainUrl}api/geisomething`;
export const exampleApi2 = `${mainUrl}api/geisomething2`;

// 个人中心首页信息
export const index = `${mainUrl}/wechat/my/index`;
export const arranged = `${mainUrl}/wechat/my/classes/arranged`;
export const orders = `${mainUrl}/wechat/my/orders`;
export const login = `${mainUrl}/web/customer/auth/login`;
export const openidUrl = `${mainUrl}/pay/query_openid?code=`;
export const huiPay = `${mainUrl}/pay/hui_pay`;
// 获取验证码
export const loginCode = `${mainUrl}/common/sms/send-code`;
// 汇分期接口
export const kuPayment = `${mainUrl}/stage/ku_first_payment`;
