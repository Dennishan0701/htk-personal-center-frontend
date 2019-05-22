<template>
  <div class="curriculum">
    <div
      class="curriculum-item"
      @click="$router.push({path: 'curriculum', query:{type: 'planned'}})"
    >
      <div class="img planned"></div>
      <div class="title">课程安排表</div>
      <!-- <div class="popup"></div> -->
    </div>
    <div
      class="curriculum-item"
      @click="$router.push({path: 'curriculum', query:{type: 'finish'}})"
    >
      <div class="img finish"></div>
      <div class="title">已经完成课表</div>
      <div class="popup"></div>
    </div>
  </div>
</template>

<style scoped>
.curriculum {
  margin-top: 0.1rem;
  width: 7.1rem;
  height: 1.64rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0.02rem 0.16rem 0rem rgba(0, 0, 0, 0.05);
  border-radius: 0.12rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.curriculum-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.img {
  width: 0.57rem;
  height: 0.58rem;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.finish {
  background-image: url("../img/finish.png");
}
.planned {
  background-image: url("../img/planned.png");
}

.title {
  /* width: 1.26rem; */
  margin-top: 0.2rem;
  height: 0.25rem;
  font-size: 0.26rem;
  line-height: 0.26rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.popup {
  position: absolute;
  right: -0.57rem;
  width: 0.75rem;
  height: 0.32rem;
  background-image: url("../img/wait_for_review.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
