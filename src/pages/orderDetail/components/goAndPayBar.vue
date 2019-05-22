<template>
  <div class="pay-bar">
    <goAndPayButton
      v-show="orderInfo.order_status === 1 "
      btnText="去支付"
      :grayOrOrange="''"
      style="margin-left: 0.4rem;"
      :clickFunc="()=>{goAndPay(id)}"
    ></goAndPayButton>
    <goAndPayButton
      v-show="orderInfo.order_status !== 1 "
      btnText="支付完成"
      :grayOrOrange="'black'"
      style="margin-left: 0.4rem;"
      :clickFunc="()=>{}"
    ></goAndPayButton>
    <!-- <goAndPayButton
      btnText="申请开票"
      grayOrOrange="gray"
      :clickFunc="()=>{$router.push('/order_invoice')}"
    ></goAndPayButton>-->
    <div
      v-show="orderInfo && +orderInfo.order_status === 1"
      class="bottom-row wait-to-pay"
    >
      <div>待付款：</div>
      <div>¥ {{orderInfo.waitToPay}}</div>
    </div>
  </div>
</template>
<script>
import goAndPayButton from '@/components/goAndPayButton.vue';

export default {
  components: {
    goAndPayButton,
  },
  props: ['id', 'orderInfo'],
  methods: {
    goAndPay(id) {
      window.location.replace(`/jump-to-pay.html?id=${id}`);
    },
  },
  mounted() {
    const { id } = this.$route.query;
    this.id = id;
  },
};
</script>

<style scoped>
* {
  /* border: solid red 1px; */
}
.pay-bar {
  width: 7.1rem;
  height: 1.1rem;
  border-radius: 0.12rem;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  /* position: fixed; */
  bottom: 0;
  padding: 0.24rem 0 0.24rem 0;
  border-top: solid 1px #eee;
  padding: 0 0.2rem 0 0.2rem;
}
.pay-bar > div {
  /* margin-right: 0.4rem; */
}
.wait-to-pay {
  display: flex;
}
.wait-to-pay > div {
  display: flex;
  align-items: center;
  font-size: 0.26rem;
  line-height: 0.26rem;
  color: rgba(51, 51, 51, 1);
}
.wait-to-pay > div:nth-child(2) {
  color: rgba(255, 97, 44, 1);
}
</style>
