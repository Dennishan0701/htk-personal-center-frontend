<template>
  <div class="box">
    <div class="img"></div>
    <div class="text">暂无订单哦～</div>
  </div>
</template>
<style scoped>
.box {
  width: 100%;
  margin: 1.38rem 0 1.38rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img {
  width: 3.75rem;
  height: 3.75rem;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("/img/empty.png");
  /* background: rgba(162, 146, 247, 0.3); */
  border-radius: 50%;
}
.text {
  margin: 0.16rem;
  font-size: 0.22rem;
  line-height: 0.22rem;
  color: rgba(51, 51, 51, 1);
}
</style>
