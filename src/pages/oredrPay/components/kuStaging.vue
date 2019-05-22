<template>
  <div class="ku-staging-box">
    <div class="ku-staging-form">
      <div class="ku-staging-up">即将跳转至第三方分期支付网站</div>
      <div class="ku-staging-down">
        <goAndPayButton
          class="ku-staging-cancel"
          btnText="取消"
          grayOrOrange="gray"
          :clickFunc="()=>{showCompFun && showCompFun()}"
        ></goAndPayButton>
        <div class="ku-staging-pay-buttom">
          <!-- 支付信息 -->
          <form
            :class="true ? 'testInput':''"
            :action="KuPayObj.api_url"
            method="post"
          >
            <input
              v-show="false"
              :value="KuPayObj.sign"
              type="text"
              name="sign"
            >
            <input
              v-show="false"
              :value="KuPayObj.data"
              type="text"
              name="data"
            >
            <input
              v-show="false"
              :value="KuPayObj.midPlatform"
              type="text"
              name="midPlatform"
            >
            <input
              v-show="false"
              :value="KuPayObj.version"
              type="text"
              name="version"
            >
            <input
              class="shape order-list-go-and-pay"
              :value="'跳转支付'"
              type="submit"
              name="Submit"
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import goAndPayButton from '@/components/goAndPayButton.vue';

export default {
  components: {
    goAndPayButton,
  },
  props: ['KuPayObj', 'showCompFun'],
};
</script>

<style scoped>
* {
  /* border: solid 1px red; */
}
.ku-staging-box {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 3999;
}
.ku-staging-form {
  width: 6rem;
  height: 3rem;
  /* background-image: url("/img/remind.png"); */
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #fff;
  /* border-radius: 50%; */
  border-radius: 0.3rem;

  display: flex;
  flex-direction: column;
}
/* form {
}
input {
  width: 100%;
  height: 0.5rem;
  font-size: 0.2rem;
  background: #eee;
  color: #eee;
  border: #eee;
}
.testInput input {
  background: #fff;
  color: rgb(0, 0, 0);
  border: #2e2e2e 1px solid;
} */
.ku-staging-up {
  flex: 1;
  padding: 0.2rem;
  font-size: 0.28rem;
  line-height: 0.28rem;
  color: rgba(51, 51, 51, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.ku-staging-down {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1rem;
}
.ku-staging-cancel {
  margin: 0 0  0 .8rem;
}
.ku-staging-pay-buttom {
  margin: 0 .8rem 0 0;

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
.order-list-go-and-pay {
  color: #fff;
  background: linear-gradient(
    20deg,
    rgba(255, 78, 49, 1) 0%,
    rgba(255, 115, 38, 1) 100%
  );
}
</style>
