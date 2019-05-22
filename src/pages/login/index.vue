<template>
  <div>
    跳转中
    <!-- <input placeholder="手机号" v-model="username">
    <br>
    <input placeholder="密码" v-model="password">
    <br>
    <Button @click="login">注册/绑定账号</Button>
    <br>
    <Button @click="fakeLogin">假的登录</Button>
    <br>
    <div>code:{{code}}////openid: {{openid}}</div>
    <div>storeOpenid{{$store.state.openId}}</div>
    <Button @click="login" to="/create_an_account">注册/绑定账号（未注册用户）</Button>
    <a href="/#/order_pay/">跳转到支付页面</a>
    <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx862356baefba6626&redirect_uri=http%3A%2F%2Fh5-teacher.onlyeduhi.cn%2Fjump.html&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect" >点击授权</a>
    <br>
    <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx862356baefba6626&redirect_uri=http%3A%2F%2Fh5-teacher.onlyeduhi.cn%2Fjump.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect" >静默授权</a>
    <br>
    <a :href="'http://172.16.12.25:9527/#/login?code=' + code">点击这里跳回开发项目</a>
    <a :href="`https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx862356baefba6626&secret=c4eb2d4efa30cb0e759b3f9e3827332a&code=${code}&grant_type=authorization_code`">点击这里获取openid</a> -->
  </div>
</template>

<script>
import { getLogin, getOpenId } from '@/api/requestList';

// const axios = require('axios');

export default {
  data() {
    return {
      username: '17288269442',
      password: '123456',
      code: '',
      openid: '',
    };
  },
  async mounted() {
    const { code } = this.$route.query;
    this.code = code;
    if (code) this.openid = await getOpenId(code);
    window.location.replace('/');
  },
  methods: {
    async login() {
      this.$Message.info(await getLogin(this.username, this.password));
      this.$router.push('/center');
    },
    fakeLogin() {
      this.$store.commit('changeToken', 'token');
      this.$router.push('/center');
    },
    async getOpenIdFun() {
      await getOpenId(this.code);
    },
  },
};
</script>
