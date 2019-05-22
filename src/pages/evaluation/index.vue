<template>
  <div>
    <topLeftTitle title="评价老师"></topLeftTitle>
    <card></card>
    <div v-show="!subscribeSuccess">
      <div class="evaluation-box">
        <div class="start-box">
          <div class="box-title">您的评价会让老师做得更好!</div>
          <div class="starts">
            <div
              v-for="i in 5"
              :key="i"
              class="start-img"
              :class="i <= starts && 'start-achieve'"
              @click="starts = i"
            >
              <div
                class="flat"
                v-show='i === starts'
              >{{i > 4 ? '非常满意' : i>2? '比较满意': i> 0 ?'不大满意': '比较满意'}}</div>
            </div>
          </div>
        </div>
        <div
          class="button-box"
          v-if="starts"
        >
          <div class="buttons">
            <div
              class="opt button-unclick"
              :class="t.achieve && 'button-achieve'"
              v-for="(t, i) in evaluationArr"
              :key="i + 'lalala'"
              @click="evaluationArr[i].achieve = !(evaluationArr[i].achieve)"
            >{{t.text}}</div>
          </div>
          <textarea
            class="text-input"
            wrap="soft"
            autocomplete="off"
            spellcheck="false"
            placeholder="其他想说的"
            rows="3"
          ></textarea>
        </div>
        <orangeButton
          btnText="匿名提交"
          style="margin: 0.1rem 0 0.15rem 0;"
          :clickFunc="()=>{subscribeSuccess = !subscribeSuccess}"
        ></orangeButton>
        <!-- <div
          class="subscribe"
          @click="subscribeSuccess = !subscribeSuccess"
        >
          匿名提交
        </div> -->
      </div>
      <!-- <div class="complaint">我要投诉？</div> -->
    </div>
    <div
      class="success-show"
      v-show="subscribeSuccess"
    >
      <div class="evaluation-box">
        <div class="success-box">
          <div class="success-img"></div>
          <div class="success-text">评价成功</div>
        </div>
      </div>
      <orangeButton
        btnText="去个人中心"
        style="margin: 0.4rem;"
        :clickFunc="()=>{$router.push('/')}"
      ></orangeButton>
    </div>
  </div>
</template>
<script>
import topLeftTitle from '@/components/topLeftTitle.vue';
import orangeButton from '@/components/orangeButton.vue';
import card from './components/card.vue';

export default {
  components: { topLeftTitle, card, orangeButton },
  data() {
    return {
      starts: 0,
      evaluationArr: [{ text: '过分严苛', achieve: false },
        { text: '迟到早退', achieve: false },
        { text: '不够专业', achieve: false },
        { text: '通俗易懂', achieve: false },
        { text: '条理清楚', achieve: false },
        { text: '幽默风趣', achieve: false }],
      subscribeSuccess: false,
    };
  },
};
</script>

<style scoped>
* {
  /* border: solid 1px red; */
}
.evaluation-box {
  width: 7.1rem;
  margin: 0.2rem 0.2rem 0 0.2rem;
  padding: 0.2rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.12rem 0.12rem 0.12rem 0.12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.start-box {
  /* padding: 0 1.2rem 0 1.2rem; */
  align-self: stretch;
}
.box-title {
  font-size: 0.34rem;
  line-height: 0.34rem;
  color: rgba(255, 204, 36, 1);
}
.starts {
  display: flex;
  justify-content: center;
}
.start-img {
  width: 0.52rem;
  height: 0.52rem;
  margin: 1rem 0.2rem 0.8rem 0.2rem;
  background-image: url("./img/start_unclick.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.start-achieve {
  background-image: url("./img/start_achieve.png");
}
.flat {
  width: 0.97rem;
  height: 0.32rem;
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 0.2rem;
  line-height: 0.3rem;
  color: rgba(255, 255, 255, 1);
  /* border: 1px solid blue; */
  content: "fjsfdjkd";
  background-image: url("./img/flat.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  top: -0.46rem;
  right: -0.47rem;
}
.button-box {
  width: 4.9rem;
}
.buttons {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.opt {
  margin: 0.15rem 0.1rem 0.15rem 0.1rem;
  min-width: 1.4rem;
  height: 0.52rem;
  border-radius: 0.26rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.24rem;
  line-height: 0.24rem;
}
.button-unclick {
  border: 1px solid rgba(181, 176, 176, 1);
  color: rgba(181, 176, 176, 1);
  background-color: #fff;
}
.button-achieve {
  color: rgba(255, 255, 255, 1);
  background: rgba(255, 111, 39, 1);
  border: 1px solid rgba(255, 111, 39, 1);
}

.text-input {
  width: 4.7rem;

  margin: 0.25rem 0.1rem 0.3rem 0.1rem;
  background: rgba(255, 255, 255, 1);
  font-size: 0.24rem;
  line-height: 0.24rem;
  padding: 0.15rem;
  background: rgba(241, 241, 241, 1);
  border-radius: 0.1rem;
  overflow-y: hidden;
  border: none;
}

.complaint {
  margin: 0.2rem;
  font-size: 0.22rem;
  line-height: 0.22rem;
  color: rgba(181, 176, 176, 1);
}

.success-show {
  display: flex;
  /* justify-content: center */
  align-items: center;
  flex-direction: column;
}
.success-box {
  height: 5.29rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.success-img {
  width: 2.2rem;
  height: 2rem;
  background-image: url("./img/success.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.success-text {
  margin-top: 0.5rem;
  font-size: 0.34rem;
  line-height: 0.34rem;
  font-weight: bold;
  color: rgba(234, 87, 93, 1);
}
</style>
