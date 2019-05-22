<template>
  <div>
    <topLeftTitle title="评价详情"></topLeftTitle>
    <card></card>
    <div class="card-item">
      <div class="card-left">评价星级</div>
      <div class="card-right">
        <div
          v-for="i in 5"
          :key="i"
          class="start-img"
          :class="i <= starts && 'start-achieve'"
        ></div>
      </div>
    </div>
    <div class="card-item">
      <div class="card-left">评价标签</div>
      <div class="card-right">
        <div class="buttons">
          <div
            class="opt button-unclick"
            v-for="(t, i) in evaluationArr"
            :key="i"
          >{{t.text}}</div>
        </div>
      </div>
    </div>

    <div class="card-item">
      <div class="card-left">其他想说的</div>
      <div class="card-right">
        <div class="else-to-say">老师在上课的时候巴拉巴拉巴拉巴~啊啊1啊
          让我们南安娜娜楠楠 打算的撒打算啊
          打算打算打算~ 打算反而为特气人 。</div>
      </div>
    </div>
  </div>
</template>
<script>
import topLeftTitle from '@/components/topLeftTitle.vue';
import card from './components/card.vue';

export default {
  components: { topLeftTitle, card },
  data() {
    return {
      starts: 3,
      evaluationArr: [{ text: '迟到早退', achieve: false },
        { text: '不够专业', achieve: false },
        { text: '通俗易懂', achieve: false },
        { text: '条理清楚', achieve: false },
        { text: '幽默风趣', achieve: false },
      ],
    };
  },
};
</script>

<style scoped>
* {
  /* border: 1px solid red; */
}
.card-item {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #eee;
}
.card-left {
  /* min-width: 2.6rem; */
  font-size: 0.24rem;
  line-height: 0.24rem;
  color: rgba(51, 51, 51, 1);
  margin: 0 0.2rem 0 0.2rem;
}
.card-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 0.3rem;
}
.start-img {
  width: 0.52rem;
  height: 0.52rem;
  margin: 0.69rem 0.2rem 0.62rem 0.2rem;
  background-image: url("./img/start_unclick.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.start-img:nth-last-child(1) {
  margin: 0.69rem 0rem 0.62rem 0.2rem;
}
.start-achieve {
  background-image: url("./img/start_achieve.png");
}

.buttons {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-right: -0.1rem;
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
  color: rgba(181, 176, 176, 1);
  background: rgba(241, 241, 241, 1);
  color: rgba(181, 176, 176, 1);
}
.else-to-say {
  padding: 0.44rem 0 0.44rem 0;
  margin-left: 0.6rem;
  font-size: 0.24rem;
  color: rgba(181, 176, 176, 1);
}
</style>
