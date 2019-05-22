<template>
  <div ref="mescroll" class="mescroll">
    <div class="mescroll-div">
      <div
        @click="$router.push({path:'/order_detail', query:{id: t.id}})"
        class="order-list-item"
        v-for="(t, i) in dataList"
        :key="i + 'order-list-item'"
      >
        <div class="order-list-time-and-status">
          <remind></remind>
          <div class="order-list-time-point">订单创建时间：{{t.created_at}}</div>
          <div class="order-list-status">{{mapsOrderStatus(t.order_status)}}</div>
        </div>
        <div class="order-list-title-and-type">
          <div class="order-list-main-title">{{t.grade +''+ t.subject}}</div>
          <div class="order-list-description">普通课</div>
          <div
            class="order-list-class-number"
          >x {{t.standard_class_hour + t.giveaway_class_hour}}课时</div>
        </div>
        <div
          class="order-list-order-number"
        >共{{t.standard_class_hour + t.giveaway_class_hour}}课时 合计：¥ {{t.actual_amount}}</div>
        <div class="order-list-buttons">
          <!-- <goAndPayButton
            btnText="已开票"
            grayOrOrange="gray"
            style="margin-left: 0.4rem;"
          ></goAndPayButton>
          <goAndPayButton
            btnText="申请开票"
            grayOrOrange="gray"
            style="margin-left: 0.4rem;"
            :clickFunc="()=>{$router.push('/order_invoice')}"
          ></goAndPayButton>-->
          <goAndPayButton
            v-show="t.order_status === 1 "
            btnText="去支付"
            :grayOrOrange="''"
            style="margin-left: 0.4rem;"
            :clickFunc="()=>{goAndPay(t.id)}"
          ></goAndPayButton>
          <goAndPayButton
            v-show="t.order_status !== 1 "
            btnText="支付完成"
            :grayOrOrange="'black'"
            style="margin-left: 0.4rem;"
            :clickFunc="()=>{}"
          ></goAndPayButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入mescroll.min.js和mescroll.min.css
import MeScroll from 'mescroll.js';
import 'mescroll.js/mescroll.min.css';
import remind from '@/components/remind.vue';
import goAndPayButton from '@/components/goAndPayButton.vue';
import { getOrders } from '@/api/requestList';


export default {
  components: { remind, goAndPayButton },
  // props: ['listItemArr'],
  data() {
    return {
      mescroll: null, // mescroll实例对象
      dataList: [],
    };
  },
  mounted() {
    // 创建MeScroll对象
    this.mescroll = new MeScroll(this.$refs.mescroll, { // 在vue的mounted生命周期初始化mescroll,确保此处配置的ref有值
      // down:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则down可不用写了)
      up: {
        callback: this.upCallback,
        // 以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10, // 每页数据条数,默认10
        },
        htmlNodata: '<div class="no-more">暂无更多订单哦~</div>',
        noMoreSize: 5, // 如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        // toTop: {
        //   // 回到顶部按钮
        //   src: './static/mescroll/mescroll-totop.png', // 图片路径,默认null,支持网络图
        //   offset: 1000, // 列表滚动1000px才显示回到顶部按钮
        // },
        empty: {
          // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: 'xxid', // 父布局的id (1.3.5版本支持传入dom元素)
          icon: '/img/empty.png', // 图标,默认null,支持网络图
          tip: '暂无订单哦～', // 提示
        },
      },
    });
  },
  methods: {
    goAndPay(id) {
      window.location.replace(`/jump-to-pay.html?id=${id}`);
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    async upCallback(page) {
      try {
        // eslint-disable-next-line camelcase
        const { current_page, data } = await getOrders(page.num);
        // 如果是第一页需手动制空列表
        // eslint-disable-next-line camelcase
        if (current_page === 1) this.dataList = [];
        // 把请求到的数据添加到列表
        this.dataList = this.dataList.concat(data);
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          this.mescroll.endSuccess(data.length);
        });
      } catch (error) {
        // 联网失败的回调, 隐藏下拉刷新和上拉加载的状态;
        this.mescroll.endErr();
      }
    },
    mapsOrderStatus(value) {
      if (+value === 1) { return '已提交（待支付）'; }
      if (+value === 2) { return '支付中'; }
      if (+value === 11) { return '已支付（待审核）'; }
      if (+value === 21) { return '审核成功（已完成）'; }
      if (+value === 31) { return '审核失败'; }
      return '未知状态';
    },
  },
  // 进入路由时,恢复列表状态

  beforeRouteEnter(to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next((vm) => {
      if (vm.mescroll) {
        // 恢复到之前设置的isBounce状态
        if (vm.mescroll.lastBounce != null) vm.mescroll.setBounce(vm.mescroll.lastBounce);
        // 滚动到之前列表的位置 (注意:路由使用keep-alive才生效)
        if (vm.mescroll.lastScrollTop) {
          vm.mescroll.setScrollTop(vm.mescroll.lastScrollTop);
          setTimeout(() => { // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
            vm.mescroll.setTopBtnFadeDuration(0);// 设置回到顶部按钮显示时无渐显动画
          }, 16);
        }
      }
    });
  },
  // 离开路由时,记录列表状态
  beforeRouteLeave(to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    if (this.mescroll) {
      this.mescroll.lastBounce = this.mescroll.optUp.isBounce;// 记录当前是否禁止ios回弹
      this.mescroll.setBounce(true); // 允许bounce
      this.mescroll.lastScrollTop = this.mescroll.getScrollTop();// 记录当前滚动条的位置
      this.mescroll.hideTopBtn(0);// 隐藏回到顶部按钮,无渐隐动画
    }
    next();
  },
};
</script>


<style scoped>
/* * {
  border: 1px solid red;
} */
/*通过fixed固定mescroll的高度*/
.mescroll {
  position: fixed;
  top: 0;
  bottom: 0;
  height: auto;
  width: 7.5rem;
}
.mescroll-div {
  width: 7.1rem;
}
.order-list-item {
  width: 7.1rem;
  height: 2.9rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.12rem;
  margin: 0.2rem 0.2rem 0 0.2rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.order-list-item:nth-last-child(1) {
  margin: 0.2rem 0.2rem 0.2rem 0.2rem;
}
.order-list-time-and-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.2rem;
  line-height: 0.2rem;
  color: rgba(181, 176, 176, 1);
}
.order-list-time-point {
  flex: 1;
  margin-left: 0.1rem;
}
.order-list-status {
  color: rgba(255, 119, 119, 1);
}
.order-list-title-and-type {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
}
.order-list-main-title {
  font-size: 0.24rem;
  line-height: 0.24rem;
  color: rgba(51, 51, 51, 1);
}
.order-list-description {
  margin-left: 0.2rem;
  flex: 1;
  font-size: 0.22rem;
  line-height: 0.22rem;
  color: rgba(181, 176, 176, 1);
}
.order-list-class-number {
  font-size: 0.22rem;
  line-height: 0.22rem;
  color: rgba(181, 176, 176, 1);
}
.order-list-order-number {
  align-self: flex-end;
  font-size: 0.22rem;
}
.order-list-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: flex-end;
}
.order-list-has-invoice {
  background: rgba(241, 241, 241, 1);
  color: rgba(181, 176, 176, 1);
}

.no-more {
  font-size: 0.2rem;
  color: rgba(181, 176, 176, 1);
  opacity: 0.5;
  margin: 0.2rem 0 0.2rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
