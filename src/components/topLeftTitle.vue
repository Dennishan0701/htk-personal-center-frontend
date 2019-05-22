<template>
  <div class="curriculum-title">{{title}}</div>
</template>

<script>
export default {
  props: ['title'],
};
</script>
<style scoped>
.curriculum-title {
  width: 1.79rem;
  height: 0.32rem;
  font-size: 0.34rem;
  line-height: 0.34rem;
  font-family: PingFangSC-Regular;
  font-weight: bold;
  color: rgba(4, 4, 4, 1);
  margin: 0.34rem 0 0.34rem 0.2rem;
}
</style>
