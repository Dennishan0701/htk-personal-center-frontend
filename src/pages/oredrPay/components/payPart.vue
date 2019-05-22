<template>
  <div>
    <bluePopup
      style="margin-bottom: .2rem;"
      :text="`此次支付￥${price}，剩余¥ ${remainToPay}待支付`"
    ></bluePopup>
    <div class="part-box">
      <div class="part-title">您即将支付</div>
      <div class="part-input">
        <div class="part-dollar">￥</div>
        <div class="input-width">
          <div>{{price}}</div>
          <input
            :style="{
            minWidth
        }"
            v-model="price"
            @blur="checkNum"
            placeholder="请输入金额"
            type="number"
          >
        </div>
      </div>
      <!-- <goAndPayButton
      style="margin-top: .6rem"
      btnText="去支付"
      :grayOrOrange="gray"
      :clickFunc="()=>{$router.push('/order_pay')}"
      ></goAndPayButton>-->
    </div>
  </div>
</template>
<script>
// import goAndPayButton from '@/components/goAndPayButton.vue';
import bluePopup from '@/components/bluePopup.vue';
// import { getorder } from '@/api/requestList';

const Big = require('big.js');

export default {
  // components: { goAndPayButton },
  props: ['payNum', 'changePay', 'waitToPay'],
  components: {
    bluePopup,
  },
  data() {
    return {
      // needToPay: '0.00',
      price: '0.00',
      minWidth: 0,
      gray: true,
      remainToPay: 0,
    };
  },
  watch: {
    price(value) {
      if (value) this.remainToPay = new Big(this.waitToPay).minus(this.price).toFixed(2);
      this.changePay(this.price);
      if (`${value}` === '') {
        this.minWidth = '3.1rem';
        this.gray = 'gray';
      } else {
        this.minWidth = '0';
        this.gray = true;
      }
      // return `${value}.00`;
    },
    waitToPay(value) {
      this.price = value;
    },
  },
  methods: {
    checkNum() {
      try {
        const value = new Big(parseFloat(this.price));
        this.price = value.toFixed(2);
      } catch (error) {
        this.needToPay = '0.00';
        this.price = '0.00';
      }
    },
  },
  async mounted() {
    // this.needToPay = new Big(parseFloat(+this.waitToPay)).toFixed(2) || '0.00';
    // this.price = this.needToPay;
  },
};
</script>

<style scoped>
* {
  /* border: 1px solid red; */
}
.part-box {
  width: 7.1rem;
  height: 2.9rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.12rem 0.12rem 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.part-title {
  font-size: 0.2rem;
  line-height: 0.2rem;
  font-weight: 400;
  color: rgba(181, 176, 176, 1);
  margin-top: 0.72rem;
  z-index: 0;
}
.part-input {
  font-size: 0.6rem;
  line-height: 0.6rem;
  color: rgba(51, 51, 51, 1);
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
}
.part-input::after {
  content: "";
  height: 0.2rem;
  width: 0.4rem;

  font-size: 0.3rem;
  line-height: 0.3rem;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("/img/edit.png");
}
.part-dollar {
  width: 0.4rem;
  font-size: 0.4rem;
  line-height: 0.4rem;
  /* align-self: flex-end; */
}
.part-buttom {
}
.input-width {
  /* width: 01rem; */
  width: min-content;
  margin-top: -0.6rem;
}
.input-width > div {
  width: fit-content;
  height: 0.6rem;
  color: #fff;
  z-index: -5;
}
.input-width > input {
  width: 100%;
  border: none;
  -webkit-appearance: none;
  /* width: 3.1rem; */
  color: rgba(51, 51, 51, 1);
  font-size: 0.6rem;
  line-height: 0.6rem;
  /* height: 0.6rem; */
  padding: 0;
  /* margin-right: 0.4rem; */
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
