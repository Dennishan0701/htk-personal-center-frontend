<template>
  <div class="pop-up-bg">
    <div class="pop-up-box">
      <div class="curriculum-left-main-box">
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
      <div class="note">请使用嗨课堂客户端进行上课哦！</div>
    </div>
    <orangeButton
      btnText="我知道了"
      style="margin: 0.2rem;"
      :clickFunc="()=>{showPopUp()}"
    ></orangeButton>
  </div>
</template>
<script>
import orangeButton from '@/components/orangeButton.vue';
import remind from '@/components/remind.vue';

export default {
  props: ['showPopUp'],
  components: { orangeButton, remind },
};
</script>

<style scoped>
.pop-up-bg {
  height: 100vh;
  width: 7.5rem;
  background: rgba(22, 22, 22, 0.4);
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pop-up-box {
  width: 5.1rem;
  height: 4rem;
  padding: 0.22rem;
  background-image: url("/img/pop_up_bg.png");
  /* background: #000; */
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 0.1rem;
  display: flex;
  flex-direction: column;
}
.curriculum-left-main-box {
  padding: 0 0 0.6rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  /* height: 100%; */
  border-bottom: 1px dashed #eee;
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
.note {
  margin-top: 0.24rem;
  width: 4.7rem;
  height: 1.3rem;
  background: rgba(245, 245, 245, 1);
  border-radius: 0.1rem;
  font-size: 0.22rem;
  line-height: 0.22rem;
  color: rgba(255, 178, 78, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
