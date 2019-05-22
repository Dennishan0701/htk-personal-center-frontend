<template>
  <div class="detail-box">
    <bluePopup
        v-show="orderInfo && +orderInfo.order_status === 1"
      style="margin-bottom: .2rem;"
      :text="`该订单已付款${orderInfo.wasPaid}元，此次付款${orderInfo.waitToPay}元`"
    ></bluePopup>
    <infoCard :orderInfo="orderInfo"></infoCard>
    <trunover
    :payments="orderInfo.payments"
    style="margin-top: .2rem;"></trunover>
    <goAndPayBar style="margin-top: .2rem" :id="id" :orderInfo="orderInfo"></goAndPayBar>
  </div>
</template>

<script>
// import bluePopup from './components/bluePopup.vue';
import infoCard from './components/infoCard.vue';
import goAndPayBar from './components/goAndPayBar.vue';
import bluePopup from '@/components/bluePopup.vue';
import trunover from './components/trunover.vue';
import { getorder } from '@/api/requestList';

export default {
  data() {
    return {
      orderInfo: {},
      id: '',
    };
  },
  components: {
    bluePopup,
    goAndPayBar,
    infoCard,
    trunover,
  },
  async mounted() {
    const { id } = this.$route.query;
    this.orderInfo = await getorder(id, this);
    this.id = id;
  },
};
</script>

<style scoped>
* {
  /* border: 1px solid red; */
}
.detail-box {
  padding: 0.2rem 0 0.2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: .2rem;
}
</style>
