<template>
  <div
    id="app"
    class="main-temp"
  >
    <div id="nav">
      <!-- <div>header</div> -->
      <router-view />
      <!-- <div>footer</div> -->
    </div>
  </div>
</template>
<style scoped>
.main-temp {
  display: flex;
  justify-content: center;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  background-image: url("/img/empty.png");
  background-position-x: initial;
  background-position-y: initial;
  background-size: initial;
  background-repeat-x: initial;
  background-repeat-y: initial;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  background-color: initial;
}
#nav {
  background: #eee;
  min-height: 100vh;
  /* border: 1px solid red; */
  width: 100%;
  max-width: 750px;
}
@media (min-width: 750px) {
}
</style>
