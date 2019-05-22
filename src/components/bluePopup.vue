<template>
  <div class="box">
    <remind></remind>
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
import remind from '@/components/remind.vue';

export default {
  props: ['text'],
  components: {
    remind,
  },
};
</script>


<style scoped>
.box {
  padding: 0.2rem;
  display: flex;
  align-items: center;
  width: 7.1rem;
  height: 0.66rem;
  background: rgba(118, 192, 255, 1);
  border-radius: 0.12rem;

  font-size: 0.24rem;
  line-height: 0.24rem;
  color: rgba(255, 255, 255, 1);
}
.text {
  margin-left: 0.2rem;
}
</style>
