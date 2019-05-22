/* eslint-disable camelcase */
/*
 * 请这样去引用这些函数
 * import { getArranged } from '@/api/requestList';
 * async mounted() {console.log('get', await getArranged());},
 */
import axios from '@/api/axios';
import {
  arranged, orders, login, openidUrl, huiPay, loginCode, kuPayment,
} from './apiList';
import store from '../store';
import qs from 'qs';
import { catchError, handelMassage } from './handelErrorInfomation';

const Big = require('big.js');

export const getArranged = async () => {
  const a = await axios.post(arranged);
  return a;
};

export const getOrders = async (page = 1) => {
  const fakeData = [];
  // const random1 = Math.random().toString().slice(2, 9);
  // const random2 = Math.random().toString().slice(2, 9);
  // const fakeData = [
  //   {
  //     id: random1,
  //     grade: '\u521d\u4e09',
  //     subject: '\u7269\u7406',
  //     standard_class_hour: 80,
  //     giveaway_class_hour: 0,
  //     standard_amount: '16000.00',
  //     actual_amount: '16000.00',
  //     created_at: `2019-04-01 21:04:20 ${random1}`,
  //     order_status: 1,
  //     order_status_format: '\u5df2\u63d0\u4ea4',
  //     class_hour_grade: '\u6807\u51c6\u8bfe\u65f6',
  //   },
  //   {
  //     id: random2,
  //     grade: '\u5c0f\u516d',
  //     subject: '\u7269\u7406',
  //     standard_class_hour: 100,
  //     giveaway_class_hour: 0,
  //     standard_amount: '16000.00',
  //     actual_amount: '16000.00',
  //     created_at: `2019-04-01 16:24:44 ${random2}`,
  //     order_status: 1,
  //     order_status_format: '\u5df2\u63d0\u4ea4',
  //     class_hour_grade: '\u6807\u51c6\u8bfe\u65f6',
  //   }];
  try {
    const { data: { code, data, status } = {} } = await axios.post(
      `${orders}?page=${page}`,
    );
    if (code === 200 && status === 'success' && data.data) {
      // const fData = fakeData.push(data.data)
      return {
        current_page: data.current_page,
        data: data.data.concat(fakeData),
      };
    }
    return {
      current_page: 1,
      data: fakeData,
    };
  } catch (error) {
    console.log('接口错误', error);
    return {
      current_page: 1,
      data: fakeData,
    };
  }
};

export const getLogin = async (username, password, smsCode, grantType, msg, that) => {
  that && that.$Spin.show();
  try {
    const {
      data: {
        status, code, data: { access_token: token } = {}, message,
      } = {},
    } = await axios.post(login, {
      username: username || '',
      password: password || '1',
      sms_code: smsCode || '1',
      grant_type: grantType || '',
    });
    that && that.$Spin.show();
    if (code === 200 && status === 'success') {
      store.commit('changeToken', token);
      return true;
    }
    msg && msg.info(handelMassage(message) || '登录失败');
    return false;
  } catch (error) {
    msg && msg.info('网络错误');
    that && that.$Spin.show();
    return false;
  }
};

export const getorder = async (id, that = undefined) => {
  that && that.$Spin.show();
  try {
    const {
      data: {
        code, data: {
          grade_format,
          subject_format,
          updated_at,
          created_at,
          order_no,
          actual_amount,
          giveaway_class_hour,
          standard_class_hour,
          standard_amount,
          subscription,
          payments,
          order_status,
          payment_no,
        } = {}, status,
      } = {},
    } = await axios.post(`${orders}/${id}`);
    that && that.$Spin.hide();
    if (code === 200 && status === 'success') {
      const wasPaid = (() => {
        let s = 0;
        payments.map((i) => { s += Number(i.amount); return i.amount; });
        return s;
      })();
      return {
        cardMark: [grade_format,
          subject_format],
        updated_at,
        created_at,
        order_no,
        actual_amount,
        giveaway_class_hour,
        standard_class_hour,
        standard_amount,
        subscription,
        // 流水信息
        payments,
        wasPaid: new Big(parseFloat(wasPaid)).toFixed(2),
        waitToPay: new Big(parseFloat(actual_amount - wasPaid)).toFixed(2),
        order_status,
        payment_no,
      };
    }
    return {};
  } catch (error) {
    that && that.$Message.info('网络错误');
    console.log('网络错误', error);
    that && that.$Spin.hide();
    return {};
  }
};

export const getOpenId = async (id) => {
  try {
    const {
      data: {
        code, data, status,
      } = {},
    } = await axios.get(openidUrl + id);
    if (code === 200 && status === 'success') {
      const { openid } = JSON.parse(data);
      openid && store.commit('saveOpenId', openid);
      return openid;
    }
    return false;
  } catch (error) {
    return false;
  }
};

// const axiosTest = require('axios');

// eslint-disable-next-line no-unused-vars
export const goHuiPay = async (price, id, payment_no, that) => {
  let res = null;
  const { openId } = store.state;
  that && that.$Spin.show();
  try {
    res = await axios.post(huiPay, qs.stringify({
      ordAmt: price || 0,
      payChannelType: 'W1',
      appId: 'wx862356baefba6626',
      isRaw: '1',
      openId,
      termOrdId: payment_no, // 支付流水号
      outOrdId: id, // 订单号
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const {
      data: {
        code, status, data,
      } = {},
    } = res;
    that && that.$Spin.hide();

    if (code === 200 && status === 'success' && data.respCode === '000000') {
      return res.data.data;
    } if (code === 200 && status === 'success') {
      that && that.$Message.info(`支付失败: ${data.respDesc}`);
    } else {
      that && that.$Message.info(`格式错误${JSON.stringify(res.data.data)}`);
    }
    return { jsonData: '{"payInfo":false}' };
  } catch (error) {
    console.log('网络错误', error);
    that && that.$Spin.hide();
    that && that.$Message.info('连接失败请重试');
  }
  return { jsonData: '{"payInfo":false}' };
};

export const getLoginCode = async (mobile, that) => {
  try {
    const {
      data: {
        code, status, message,
      } = {},
    } = await axios.post(loginCode, { mobile });
    if (code === 200 && status === 'success') {
      that && that.$Message.info(message || '获取成功');
    } else {
      that && that.$Message.info(message || '连接失败请重试');
    }
    return true;
  } catch (error) {
    const { message } = catchError(error);
    that && that.$Message.info(message || '连接失败请重试');
    return false;
  }
};

// 1.密码输入提示：请输入6-20位密码，包含字母和数字；
// 2.错误提示：密码错误，请重新输入；
// 3.错误提示：验证码错误，请重新输入；
// 4.错误提示：验证码过期，请重新输入；
// 5.支付失败提示：支付超时，请重新支付；
// 6.支付金额提示：支付金额超过待支付金额，请重新输入；
// 7.发票申请：申请发票成功；
// 提示信息整理了部分，你看看还缺什么

// 获取微信权限
export const getWecheatPermission = () => {
  if (WeixinJSBridge) {
    window.location.replace(
      `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx862356baefba6626&redirect_uri=${window.location.protocol.slice(0, -1)}%3A%2F%2F${window.location.host}%2Fjump.html&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`,
    );
  }
};

export const getKuPay = async (price, id, payment_no, that, stageNum) => {
  that && that.$Spin.show();
  try {
    const {
      data: {
        code, status, message, data,
      } = {},
    } = await axios.post(kuPayment, {
      main_id: id,
      termOrdId: payment_no,
      outOrdId: id,
      ordAmt: price,
      stageNum: String(stageNum),
    });
    that && that.$Spin.hide();
    if (code === 200 && status === 'success') {
      // that && that.$Message.info(message || '获取成功');
      return data;
    }
    that && that.$Message.info(message || '连接失败请重试');
    return false;
  } catch (error) {
    const { message } = catchError(error);
    that && that.$Message.info(message || '连接失败请重试');
    that && that.$Spin.hide();
    return false;
  }
};
