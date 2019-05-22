<template>
  <div>
    <topLeftTitle title="我的信息"></topLeftTitle>
    <div class="box">
      <div
        class="item"
        v-for="(i) in [{title: '我的姓名', text: '谢广坤'},
        {title: '学校名称', text: '上海市巴拉巴拉小魔仙中学'},
        {title: '年级', text: '高一'},]"
        :key="i.title"
      >
        <div class="left">{{i.title}}</div>
        <div class="right">
          {{i.text}}
        </div>
      </div>
    </div>
    <div class="box">

      <div
        class="item"
        v-for="(i) in [{title: '学习科目', text: '语文'},
        {title: '教材版本', text: '人教版'},
        {title: '初始成绩', text: '76'},]"
        :key="i.title"
      >
        <div class="left">{{i.title}}</div>
        <div class="right">
          {{i.text}}
        </div>
      </div>
    </div>
    <div class="box">

      <div
        class="item"
        v-for="(i) in [{title: '上课设备', text: '平板'},]"
        :key="i.title"
      >
        <div class="left">{{i.title}}</div>
        <div class="right">
          {{i.text}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import topLeftTitle from '@/components/topLeftTitle.vue';

export default {
  data() {
    return {};
  },
  components: { topLeftTitle },
};
</script>

<style scoped>
.box {
  margin: 0 0 0.2rem 0;
}
.item {
  width: 100%;
  height: 0.82rem;
  padding: 0 0.2rem 0 0.2rem;
  background: rgba(255, 255, 255, 1);
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  font-size: 0.26rem;
  line-height: 0.26rem;
}
.left {
  color: rgba(51, 51, 51, 1);
}
.right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  color: rgba(181, 176, 176, 1);
}
</style>
