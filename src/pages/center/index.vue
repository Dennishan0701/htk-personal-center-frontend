<template>
  <div class="center">
    <topTable :userBaseInfo="userBaseInfo"></topTable>
    <curriculum></curriculum>
    <infoList></infoList>
    <div class="info-list">
      <div
        class="info-item"
        @click="loginOut()"
      >
        <!-- <div class="icon">icon</div> -->
        <div class="title">切换账号</div>
        <div class="icon-after"></div>
      </div>
    </div>
  </div>
</template>

<script>
import topTable from './components/topTable.vue';
import curriculum from './components/curriculum.vue';
import infoList from './components/infoList.vue';
import { index } from '@/api/apiList';
import { getOpenId } from '@/api/requestList';

export default {
  data() {
    return {
      userBaseInfo: {},
    };
  },
  components: {
    topTable,
    curriculum,
    infoList,
  },
  methods: {
    loginOut() {
      // 清除所有
      this.$store.commit('changeToken', false);
      if (window) window.localStorage.clear();
      this.$router.push('/login');
    },
    async getIndexInfo() {
      const response = await this.axios.post(index);
      if (response.data && response.data.code === 200) {
        return response.data.data;
      }
      return {};
    },
  },
  async mounted() {
    const { code } = this.$route.query;
    if (code) await getOpenId(code);
    this.userBaseInfo = await this.getIndexInfo();
  },
};
</script>

<style scoped>
@import "./css/infoList.css";
.center {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 0.1rem;
}
</style>
