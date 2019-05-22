import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// eslint-disable-next-line
import './plugins/iview.js';
import axios from '@/api/axios';

Vue.prototype.axios = axios;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = '个人中心';
  }
  // console.log(from, to);
  if (to.fullPath === '/login') {
    next();
  } else if (store.state.accessToken) {
    next();
  } else {
    router.push('/login');
  }
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
