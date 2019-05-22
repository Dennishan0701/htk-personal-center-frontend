<template>
  <div class="info-list">
    <div
      v-for="(i,t) in [
      {link:'/my_information' ,name:'我的信息', icon: '/img/my_information.png'},
      {link:'/orders_list',name:'我的订单', icon: '/img/orders_list.png'},
      {link:'',name:'推荐有奖', icon: '/img/price.png'},
      {link:'',name:'我的奖励', icon: '/img/gift.png'},
      ]"
      :key="t + 'miao'"
      class="info-item"
      @click="$router.push(i.link)"
    >
      <div
        class="icon"
        :style="{backgroundImage: `url(${i.icon})`}"
      >
        <!-- icon -->
      </div>
      <div class="
        title">{{i.name}}</div>
      <div class="icon-after"></div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
/* 控制奔页面的样式文件在../css/infoList.css */
</style>
