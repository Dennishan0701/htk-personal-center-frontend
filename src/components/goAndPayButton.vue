<template>
  <div
    class="shape"
    :class="propsClass(grayOrOrange)"
    v-on:click.stop="clickFunc && clickFunc()"
  >{{btnText || '确定'}}</div>
</template>

<script>
export default {
  props: ['btnText', 'clickFunc', 'grayOrOrange'],
  methods: {
    propsClass(value) {
      if (value === 'gray') return 'order-list-get-invoice';
      if (value === 'orange') return 'order-list-go-and-pay';
      if (value === 'black') return 'black';
      return 'order-list-go-and-pay';
    },
  },
};
</script>

<style scoped>
.order-list-get-invoice {
  border: 1px solid rgba(255, 97, 44, 1);
  color: rgba(255, 97, 44, 1);
}
.order-list-go-and-pay {
  color: #fff;
  background: linear-gradient(
    20deg,
    rgba(255, 78, 49, 1) 0%,
    rgba(255, 115, 38, 1) 100%
  );
}
.shape {
  width: 1.4rem;
  height: 0.52rem;
  border-radius: 26rem;
  font-size: 0.24rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.black {
  background: rgba(241, 241, 241, 1);
  border: none;
  color: rgba(181, 176, 176, 1);
  /* color: rgba(255, 97, 44, 1); */
}
</style>
