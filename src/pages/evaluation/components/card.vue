<template>
  <div class="curriculum-left-main-box">
    <div class="curriculum-top">
      <div class="curriculum-top-teacher">吴老师</div>
      <div class="curriculum-top-class">初一数学</div>
      <div class="curriculum-top-type">普通课</div>
    </div>
    <div class="curriculum-bottom">
      <remind></remind>
      <div class="curriculum-bottom-time">2018-12-05 周三 17：30 ~ 18：20</div>
    </div>
  </div>
</template>
<script>
import remind from '@/components/remind.vue';

export default {
  components: { remind },
};
</script>

<style scoped>
.curriculum-left-main-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  width: 7.5rem;
  height: 1.37rem;
  background-color: #fff;
  padding: 0.2rem;
}
.curriculum-top {
  margin-top: 0.1rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 0.26rem;
  line-height: 0.26rem;
  color: rgba(51, 51, 51, 1);
}
.curriculum-top-teacher {
}
.curriculum-top-class {
  margin-left: 0.38rem;
}
.curriculum-top-type {
  font-size: 0.22rem;
  line-height: 0.22rem;
  color: rgba(181, 176, 176, 1);
  margin-left: 0.28rem;
}
.curriculum-bottom {
  display: flex;
  align-items: center;
  font-size: 0.22rem;
  line-height: 0.22rem;
  color: rgba(181, 176, 176, 1);
}
.curriculum-bottom-time {
  margin-left: 0.1rem;
}
</style>
