<template>
  <div
    class="subscribe"
    @click="clickFunc"
  >
    {{btnText || '确定'}}
  </div>
</template>

<script>
export default {
  props: ['btnText', 'clickFunc'],
};
</script>

<style scoped>
.subscribe {
  width: 2.6rem;
  height: 0.64rem;
  background: linear-gradient(
    20deg,
    rgba(255, 78, 49, 1) 0%,
    rgba(255, 115, 38, 1) 100%
  );
  border-radius: 32rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.26rem;
  line-height: 0.26rem;
  color: rgba(255, 255, 255, 1);
}
</style>
