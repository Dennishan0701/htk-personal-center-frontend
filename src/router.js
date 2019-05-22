import Vue from 'vue';
import Router from 'vue-router';
// import Home from './pages/login/isLogin.vue';
import loginGetOpenId from './pages/login/index.vue';
import login from './pages/login/isLogin.vue';
import createAnAccount from './pages/createAnAccount/index.vue';
import center from './pages/center/index.vue';
import curriculum from './pages/curriculum/index.vue';
import ordersList from './pages/ordersList/index.vue';
import orderDetail from './pages/orderDetail/index.vue';
import orderPay from './pages/oredrPay/index.vue';
import orderInvoice from './pages/orderInvoice/index.vue';
import reserve from './pages/reserve/index.vue';
import evaluation from './pages/evaluation/index.vue';
import detail from './pages/evaluation/detail.vue';
import myInformation from './pages/myInformation/index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: center,
      meta: {
        title: '个人中心',
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/get-openid',
      name: 'loginGetOpenId',
      component: loginGetOpenId,
    },
    {
      path: '/create_an_account',
      name: 'createAnAccount',
      component: createAnAccount,
    },
    {
      path: '/center',
      component: center,
      meta: {
        title: '个人中心',
      },
    },
    {
      path: '/curriculum',
      name: 'curriculum',
      component: curriculum,
    },
    {
      path: '/orders_list',
      component: ordersList,
      meta: {
        title: '我的订单',
      },
    },
    {
      path: '/order_detail',
      component: orderDetail,
      meta: {
        title: '订单详情',
      },
    },
    {
      path: '/order_pay',
      component: orderPay,
      meta: {
        title: '选择支付',
      },
    },
    {
      path: '/order_invoice',
      component: orderInvoice,
    },
    {
      path: '/reserve',
      component: reserve,
    },
    {
      path: '/evaluation',
      component: evaluation,
    },
    {
      path: '/evaluation_detail',
      component: detail,
    },
    {
      path: '/my_information',
      component: myInformation,
    },
  ],
});
