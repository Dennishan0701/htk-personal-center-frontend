<template>
  <div class="main-box">
    <div class="login-code-logo"></div>
    <div class="login-code-input-box">
      <div class="login-code-input-top">
        <input type="text" placeholder="请输入手机号" v-model="username">
      </div>
      <div v-show="isCodeLogin" class="login-code-get-code">
        <input type="text" placeholder="请输入验证码" v-model="code">
        <div @click="getCode">{{getCodeText}}</div>
      </div>
      <div v-show="!isCodeLogin" class="login-code-get-code">
        <input type="password" placeholder="请输入密码" v-model="pwd">
        <!-- <div>获取验证码</div> -->
      </div>
    </div>
    <div
      class="login-code-button"
      :class="(code || pwd)?  'achive':''"
      @click="login"
    >登录</div>
    <div
      class="login-code-error"
      @click="isCodeLogin = !isCodeLogin"
    >{{isCodeLogin? '账号密码登录' : '验证码登录'}}</div>
  </div>
</template>
<script>
import { getLogin, getLoginCode } from '@/api/requestList';
import { checkPhone, checkPwd } from './phoneNumCheck';

export default {
  data() {
    return {
      isCodeLogin: true,
      username: '',
      code: '',
      pwd: '',
      getCodeText: '获取验证码',
    };
  },
  watch: {
    // username(value) {
    // },
  },
  methods: {
    async login() {
      if (!checkPhone(this.username)) {
        this.$Message.info('手机号码格式有误');
        return false;
      }
      if (!checkPwd(this.pwd) && !this.isCodeLogin) {
        this.$Message.info('密码格式有误');
        return false;
      }
      await getLogin(this.username,
        this.pwd,
        this.code,
        !this.isCodeLogin ? 'password' : 'sms_code',
        this.$Message) && this.fakeLogin();
      return true;
    },
    async getCode() {
      if (this.getCodeText === '获取验证码' && await getLoginCode(this.username, this)) {
        this.getCodeText = 60;
        this.countdown();
      } else {
        // this.getCodeText = '获取验证码';
      }

      // 获取验证码
    },
    countdown() {
      setTimeout(() => {
        this.getCodeText = this.getCodeText - 1;
        if (this.getCodeText > 0) {
          this.countdown();
        } else {
          this.getCodeText = '获取验证码';
        }
      }, 1000);
    },
    fakeLogin() {
      // this.$store.commit('changeToken', 'token');
      // 获取微信授权
      try {
        if (WeixinJSBridge) {
          window.location.replace(
            `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx862356baefba6626&redirect_uri=${window.location.protocol.slice(0, -1)}%3A%2F%2F${window.location.host}%2Fjump.html&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`,
          );
        } else {
          this.$router.push('/center');
        }
      } catch {
        this.$router.push('/center');
      }
    },
  },
};
</script>

<style scoped>
* {
  /* border: 1px solid red; */
}
.main-box {
  display: flex;
  flex-direction: column;
  /* justify-items: center; */
  align-items: center;
  background: #fff;
  min-height: 100vh;
}
.login-code-logo {
  width: 2.6rem;
  height: 3.3rem;
  background-image: url("/img/loginLogo.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  /* background-color: #eee; */
  /* border-radius: 50%; */
  margin: 0.55rem 0 1.1rem 0;
}
.login-code-input-box {
  width: 100%;
  padding: 0 0.55rem 0 0.55rem;
}
.login-code-input-box > div > input {
  width: 100%;
  border: none;
  height: 1rem;
  font-size: 0.32rem;
}
.login-code-input-top {
  border-bottom: solid 1px #eee;
}
.login-code-get-code {
  display: flex;
  border-bottom: solid 1px #eee;
}
.login-code-get-code div {
  width: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height:109rem; */
  /* width:157rem; */
  /* height:30rem; */
  font-size: 0.32rem;
  line-height: 0.32rem;
  /* font-family:PingFangSC-Regular; */
  /* font-weight:400; */
  color: rgba(255, 125, 66, 1);
}
.login-code-button {
  width: 4.9rem;
  height: 0.88rem;
  background: linear-gradient(
    64deg,
    rgba(255, 95, 87, 1) 0%,
    rgba(255, 106, 66, 1) 57.99999999999999%,
    rgba(255, 137, 66, 1) 100%
  );
  opacity: 0.5;
  border-radius: 0.12rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.32rem;
  line-height: 0.32rem;
  color: rgba(255, 255, 255, 1);
  margin-top: 1rem;
}
.login-code-error {
  /* width:154rem; */
  height: 0.3rem;
  font-size: 0.26rem;
  /* font-family:PingFangSC-Regular; */
  /* font-weight:400; */
  color: rgba(255, 125, 66, 1);
  line-height: 0.26rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
.achive {
  /* background: linear-gradient(
    64deg,
    rgba(255, 95, 87, 1) 0%,
    rgba(255, 106, 66, 1) 50%,
    rgba(255, 137, 66, 1) 100%
  ); */
  opacity: 1;

  /* border-radius:12rem; */
  color: rgba(255, 255, 255, 1);
}
</style>
