<template>
  <div class="trunover-box">
    <div class="trunover-item" v-for="(i, index) in payments" :key="index + 'trunover-item'">
      <div class="trunover-left">
        <div
          class="trunover-number"
          v-if="i.transaction_code"
        >流水号：{{i.transaction_code}}</div>
        <div v-else class="trunover-number">流水ID：{{i.id}}</div>
        <div class="trunover-pay-way">({{i.transaction_type_format}})</div>
        <div class="trunover-pay-time">支付时间：{{i.created_at}}</div>
      </div>
      <div class="trunover-right">¥ {{i.amount}}</div>
    </div>
  </div>
</template>
audited_at
<script>
export default {
  props: ['payments'],
};
</script>

<style scoped>
.trunover-box {
  width: 7.1rem;

  background: rgba(255, 255, 255, 1);
  border-radius: 0.12rem;
  padding: 0 0.2rem 0 0.2rem;
}
.trunover-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  border-bottom: dashed 1px #eee;
}
.trunover-item:nth-child(1) {
}
.trunover-item:nth-last-child(1) {
  border-bottom: none;
}
.trunover-left {
  display: flex;
  flex-direction: column;
  font-size: 0.22rem;
  line-height: 0.22rem;
  color: rgba(51, 51, 51, 1);
}
.trunover-number {
}
.trunover-pay-way {
  margin-bottom: 0.18rem;
  margin-top: 0.18rem;
  color: rgba(181, 176, 176, 1);
}
.trunover-pay-time {
  color: rgba(181, 176, 176, 1);
}
.trunover-right {
  font-size: 0.26rem;
  line-height: 0.26rem;
  color: rgba(181, 176, 176, 1);
}
</style>
