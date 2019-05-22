<template>
  <div class="order-pay-box">
    <payPart :payNum="payNum" :changePay="changePay" :waitToPay="waitToPay"></payPart>
    <div class="order-pay-bottom">
      <div
        class="order-pay-pay-type"
        @click="goWeChatPay"
        v-for="(i, index) in [{name: '微信支付',class:''},]"
        :key="index + 'nya'"
      >
        <div class="order-pay-icon" :class="i.class"></div>
        <div class="order-pay-pay-name">{{i.name}}</div>
      </div>
      <!-- <div class="order-pay-pay-type" @click="generateQrcode">
        <div class="order-pay-icon pay3"></div>
        <div class="order-pay-pay-name">触发</div>
      </div>-->
      <div class="order-pay-pay-type" @click="goAlipay">
        <div
          class="order-pay-icon pay2"
        ></div>
        <div class="order-pay-pay-name">支付宝支付</div>
      </div>
      <!-- 汇分期支付 -->
      <div class="order-pay-pay-type" @click="goKuiPay">
        <div
          class="order-pay-icon pay3"
          v-on:click.stop="testInput = !testInput"
        ></div>
        <div class="order-pay-pay-name">库分期支付</div>
      </div>
    </div>

    <qrcodePopup
      v-show="showQrcode"
      :click="()=>{showQrcode = !showQrcode}"
      :text="'请在微信扫码付款哦'"
    ></qrcodePopup>
    <kuStaging
    :KuPayObj="KuPayObj"
    :showCompFun="()=>{showKuStaging = !showKuStaging}"
    v-show="showKuStaging"
    ></kuStaging>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import payPart from './components/payPart.vue';
import qrcodePopup from '@/components/qrcodePopup.vue';
import kuStaging from './components/kuStaging.vue';

import { goHuiPay, getorder, getKuPay } from '@/api/requestList';

export default {
  components: {
    payPart,
    qrcodePopup,
    kuStaging,
  },
  data() {
    return {
      payNum: 0,
      waitToPay: null,
      paymentNo: null,
      showQrcode: false,
      id: null,
      KuPayObj: {},
      stageNum: 3,
      testInput: false,
      showKuStaging: false,
    };
  },
  computed: {
    ...mapState(['openId']),
  },
  async mounted() {
    const { id } = this.$route.query;
    this.id = id;
    const { waitToPay, payment_no: paymentNo } = await getorder(id, this);
    this.waitToPay = waitToPay;
    this.paymentNo = paymentNo;
  },
  methods: {
    ...mapMutations({
      changeToken: 'changeToken',
      saveOpenId: 'saveOpenId',
    }),
    changePay(value) {
      this.payNum = value;
    },
    async goWeChatPay() {
      try {
        if (!WeixinJSBridge) {
          // 如果不在微信环境
          this.$Message.info('请在微信里打开这个网页进行支付哦');
          this.showQrcode = !this.showQrcode;
          return false;
        }
      } catch (error) {
        this.$Message.info('请在微信里打开这个网页进行支付哦');
        this.showQrcode = !this.showQrcode;
        return false;
      }
      if (!this.openId) {
        // 如果没有openId
        window.location.replace(
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx862356baefba6626&redirect_uri=${window.location.protocol.slice(
            0,
            -1,
          )}%3A%2F%2F${
            window.location.host
          }%2Fjump.html&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`,
        );
        return false;
      }
      const { id } = this.$route.query;
      const res = await goHuiPay(this.payNum, id, this.paymentNo, this);
      const payData = JSON.parse(JSON.parse(res.jsonData).payInfo);
      if (payData) {
        WeixinJSBridge.invoke('getBrandWCPayRequest', payData, () => {
          this.$router.push('/orders_list');
        });
      }
      // } else {

      // }
      return true;
    },
    async goKuiPay() {
      this.KuPayObj = await getKuPay(
        this.payNum,
        this.id,
        this.paymentNo,
        this,
        this.stageNum,
      );
      if (this.KuPayObj) this.showKuStaging = true;
    },
    // handleRender() {
    //   this.$Modal.confirm({
    //     render: h => h('Input', {
    //       props: {
    //         value: this.stageNum,
    //         autofocus: true,
    //         placeholder: '请输入分期数',
    //       },
    //       on: {
    //         input: (val) => {
    //           this.stageNum = val;
    //         },
    //       },
    //     }),
    //     onOk: () => {
    //       this.goKuiPay();
    //     },
    //   });
    // },
    goAlipay() {
      this.$Message.info('敬请期待');
    },
  },
};
</script>

<style scoped>
.order-pay-box {
  border-radius: 0.12rem;
  /* background: rgba(255, 255, 255, 1); */
  width: 7.1rem;
  margin: 0.2rem;
}
.order-pay-top {
  height: 2.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eee;
}
.order-pay-note {
  font-size: 0.2rem;
  line-height: 0.2rem;
  font-weight: 400;
}
.order-pay-price {
  font-size: 0.4rem;
  color: rgba(51, 51, 51, 1);
}
.order-pay-bottom {
  background-color: #fff;
}
.order-pay-bottom:nth-last-child(1) {
  border-radius: 0 0 0.12rem 0.12rem;
}
.order-pay-pay-type {
  display: flex;
  width: 7.1rem;
  height: 1rem;
  align-items: center;
  padding: 0.2rem;
  border-top: 1px solid #eee;
}
.order-pay-pay-type:nth-child(1) {
  border: none;
}
.order-pay-pay-type::after {
  content: "";
  height: 0.2rem;
  width: 0.12rem;
  font-size: 0.3rem;
  line-height: 0.3rem;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("/img/right.png");
}
.order-pay-icon {
  width: 0.32rem;
  height: 0.26rem;
  margin-right: 0.2rem;
  border: 1px solid rex;
  font-size: 0.3rem;
  line-height: 0.3rem;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("/img/pay_icon_wechact.png");
}
.pay2 {
  background-image: url("/img/pay_icon_2.png");
}
.pay3 {
  background-image: url("/img/pay_icon_3.png");
}
.order-pay-pay-name {
  flex: 1;
  font-size: 0.28rem;
  line-height: 0.28rem;
  color: rgba(51, 51, 51, 1);
}

</style>
