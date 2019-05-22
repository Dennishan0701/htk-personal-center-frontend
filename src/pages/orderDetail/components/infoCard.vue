<template>
  <div :class="orderInfo && +orderInfo.order_status === 21 && 'big-box'">
    <div class="small-card">
      <div class="border">
        <div class="order-number">订单编号：{{orderInfo && orderInfo.order_no}}</div>
        <div class="order-time">订单创建时间：{{orderInfo && orderInfo.created_at}}</div>
      </div>
    </div>
    <div class="info-card">
      <div class="card-top">
        <div class="top-row">
          <div class="card-title">订单详情</div>
          <div
            class="card-mark"
            v-for="(i, index) in orderInfo.cardMark"
            :key="index + 'card-mark'"
          >{{i}}</div>
        </div>
        <div class="top-row">
          <div class="card-title">课时包：{{orderInfo.standard_class_hour}}课时</div>
          <div
            class="card-title"
            v-show="orderInfo.giveaway_class_hour"
          >赠送课时：{{orderInfo.giveaway_class_hour}}课时</div>
        </div>
        <div class="top-row" v-show="false">
          <div class="card-title">
            参加活动：
            <span>双十一活动</span>
          </div>
        </div>
      </div>
      <div class="card-bottom">
        <div class="bottom-row">
          <span>¥ {{orderInfo.standard_amount}}</span>
          <span>商品总价</span>
        </div>
        <div class="bottom-row" v-show="false">
          <span>9折</span>
          <span>折扣方案</span>
        </div>
        <div class="bottom-row wait-to-pay">
          <span
            v-show="orderInfo && +orderInfo.order_status === 1"
          >待付款：¥ {{orderInfo.waitToPay}}</span>
          <span
            v-show="orderInfo && +orderInfo.order_status !== 1"
          >已付款：¥ {{orderInfo.wasPaid}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['orderInfo'],
};
// standard amount
// subscription
</script>

<style scoped>
.big-box {
}
.big-box::before {
  content: "";
  height: 1.5rem;
  width: 1.8rem;
  position: absolute;
  right: 0.2rem;
  font-size: 0.3rem;
  line-height: 0.3rem;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("/img/finish.png");
}
.info-card {
  width: 7.1rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0 0 0.12rem 0.12rem;
  padding: 0.2rem;
}
.card-top {
  border-bottom: 1px solid #eee;
}
.top-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
}
.card-title {
  font-size: 0.24rem;
  line-height: 0.24rem;
  color: rgba(51, 51, 51, 1);
}
.card-title span {
  color: rgba(255, 176, 52, 1);
}
.card-mark {
  margin-right: 0.2rem;
  width: 1.4rem;
  height: 0.52rem;
  background: rgba(241, 241, 241, 1);
  border-radius: 0.12rem;

  line-height: 0.24rem;
  font-size: 0.24rem;
  color: rgba(181, 176, 176, 1);

  display: flex;
  justify-content: center;
  align-items: center;
}
.card-mark:nth-child(2) {
  margin-left: 0.2rem;
}
.card-bottom {
  font-size: 0.2rem;
  line-height: 0.2rem;
  color: rgba(181, 176, 176, 1);
}
.bottom-row {
  display: flex;
  justify-content: space-between;
  margin: 0.2rem 0 0.2rem 0;
  flex-direction: row-reverse;
}
.bottom-row:nth-last-child(1) {
  margin: 0.2rem 0 0 0;
}
.wait-to-pay {
  font-size: 0.22rem;
  line-height: 0.22rem;
  color: rgba(51, 51, 51, 1);
}
.small-card {
  width: 7.1rem;
  padding: 0.2rem 0.2rem 0 0.2rem;
  /* margin-top: 0.2rem; */
  background: rgba(255, 255, 255, 1);
  border-radius: 0.12rem 0.12rem 0 0;

  line-height: 0.2rem;
  font-size: 0.2rem;
  color: rgba(181, 176, 176, 1);
}
.small-card .border {
  border-bottom: 1px solid #eee;
  padding: 0 0 0.2rem 0;
}
.order-number {
  padding-bottom: 0.2rem;
}
.order-time {
}
</style>
