<template>
  <div class="center-header-card">
    <div class="header-top">
      <div class="img">
        <!-- 这里放置头像 -->
      </div>
      <div class="name">{{user_name || ''}}</div>
    </div>
    <div class="header-bottom">
      <div class="item" v-for="(i, index) in hourArr" :key="index">
        <div class="item-top">
          <div class="item-top-num">{{i.time}}</div>
          <div>课时</div>
        </div>
        <div class="item-bottom">{{i.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['userBaseInfo'],
  data() {
    return {
      user_name: null,
      hourArr: [],
    };
  },
  watch: {
    userBaseInfo(value) {
      if (value) {
        this.user_name = `${value.user_name}` || null;
        this.hourArr = [{
          name: '已完课时',
          time: value.total_hour - value.available_hour,
        }, {
          name: '总课时数',
          time: +value.total_hour,
        }, {
          name: '剩余课时',
          time: +value.available_hour,
        },
        ];
      }
    },
  },
};
</script>

<style scoped>
.center-header-card {
  font-size: 0.34rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin-top: 0.2rem;
  width: 7.1rem;
  height: 3rem;
  border-radius: 0.12rem;
  /* 这里应该有个图片背景 */
  background-image: url("../img/card_bg.png");
  background-position-x: center;
  background-position-y: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-attachment: initial;
  background-origin: border-box;
  background-clip: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.2rem;
}
.header-top {
  display: flex;
  align-items: center;
}
.img {
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background-image: url("/img/head.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: rgba(230, 230, 230, 1);
}
.name {
  margin-left: 0.2rem;
  font-size: 0.34rem;
}
.header-bottom {
  flex: 1;
  display: flex;
}
.item {
  margin-top: 0.6rem;
  border-left: solid 1px #fff;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.item:nth-child(1) {
  border: none;
}
.item-top {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 0.22rem;
  line-height: 0.22rem;
  font-weight: 400;
}
.item-top-num {
  margin-right: 0.1rem;
  font-size: 0.34rem;
  line-height: 0.34rem;
  font-weight: 400;
}
.item-bottom {
  height: 0.21rem;
  font-size: 0.22rem;
  line-height: 0.22rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 224, 213, 1);
}
</style>
