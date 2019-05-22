<template>
  <div class="curriculm-list">
    <div class="curriculum-item" v-for="(t,i) in 20" :key="i">
      <div class="curriculum-left-main-box" @click="showPopUp">
        <div class="curriculum-top">
          <div class="curriculum-top-teacher">吴老师</div>
          <div class="curriculum-top-class">初一数学</div>
          <div class="curriculum-top-type">普通课</div>
        </div>
        <div class="curriculum-middle">待上课</div>
        <div class="curriculum-bottom">
          <remind></remind>
          <div class="curriculum-bottom-time">2018-12-05 周三 17：30 ~ 18：20</div>
        </div>
      </div>
      <!-- <div>评价</div> -->
      <div class="curriculum-right-icon">
        <goAndPayButton
          v-show="(i % 2) && btn"
          btnText="评价老师"
          grayOrOrange="orange"
          :clickFunc="()=>{$router.push('/evaluation')}"
        ></goAndPayButton>
        <goAndPayButton
          v-show="!(i % 2) && btn"
          btnText="查看评价"
          grayOrOrange="gray"
          :clickFunc="()=>{$router.push('/evaluation_detail')}"
        ></goAndPayButton>
        <div v-show="!btn" class="icon-after"></div>
      </div>
    </div>
  </div>
</template>
<script>
import remind from '@/components/remind.vue';
import goAndPayButton from '@/components/goAndPayButton.vue';

export default {
  components: { remind, goAndPayButton },
  props: ['btn', 'showPopUp'],
  mounted() {
    // this.$route.params.id
  },
};
</script>

<style scoped>
.curriculm-list {
  margin: 0 0.2rem;
}
.curriculum-item {
  margin-top: 0.1rem;
  padding: 0.25rem 0.2rem;
  width: 7.1rem;
  height: 1.8rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.12rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.curriculum-item:nth-child(1) {
  margin-top: 0;
}
.curriculum-left-main-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
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
.curriculum-middle {
  font-size: 0.2rem;
  line-height: 0.2rem;
  color: rgba(255, 119, 119, 1);
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
.curriculum-right-icon {
}
.evaluation {
  width: 1.4rem;
  height: 0.52rem;
  border: 1px solid rgba(255, 97, 44, 1);
  border-radius: 0.26rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.24rem;
  line-height: 0.24rem;
  color: rgba(255, 97, 44, 1);
}
.evaluation-teacher {
}
.check-evaluation {
  border: 1px solid rgba(181, 176, 176, 1);
  color: rgba(181, 176, 176, 1);
}
.icon-after {
  height: 0.2rem;
  width: 0.12rem;
  font-size: 0.3rem;
  line-height: 0.3rem;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("/img/right.png");
}
</style>
