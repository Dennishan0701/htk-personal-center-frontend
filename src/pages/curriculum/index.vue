<template>
  <div class="curriculum-main">
    <popUp
      v-show="showPopUp"
      :showPopUp="()=>{showPopUp = !showPopUp}"
    ></popUp>
    <topLeftTitle :title="$route.query.type !== 'finish' ? '课程安排表' : '已完成课表'"></topLeftTitle>
    <curriculum-tabel
      :btn="!!($route.query.type === 'finish')"
      :showPopUp="()=>{showPopUp = !showPopUp}"
    />
    <!-- <Button size="large">
      <router-link to="">预约体验课</router-link>
    </button> -->
  </div>
</template>

<script>
import curriculumTabel from './components/curriculumTabel.vue';
import topLeftTitle from '@/components/topLeftTitle.vue';
import popUp from './components/popUp.vue';
// import { getArranged } from '@/api/requestList';

export default {
  data() {
    return {
      showPopUp: false,
    };
  },
  components: { curriculumTabel, topLeftTitle, popUp },
  async  mounted() {
    this.$route.query.type;
  },
};
</script>
<style scoped>
.curriculum-main {
  margin-bottom: 0.3rem;
}
</style>
