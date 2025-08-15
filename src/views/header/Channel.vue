<script setup>
const tid = defineModel('tid');

const channels = [
  {
    text: '全部分区',
    tid: 0,
  },
  {
    text: '动画',
    tid: 1,
  },
  {
    text: '游戏',
    tid: 4,
  },
  {
    text: '鬼畜',
    tid: 119,
  },
  {
    text: '音乐',
    tid: 3,
  },
  {
    text: '舞蹈',
    tid: 129,
  },
  {
    text: '影视',
    tid: 181,
  },
  {
    text: '生活',
    tid: 160,
  },

  {
    text: '娱乐',
    tid: 5,
  },
  {
    text: '知识',
    tid: 36,
  },
  {
    text: '科技数码',
    tid: 188,
  },
  {
    text: '资讯',
    tid: 202,
  },
  {
    text: '美食',
    tid: 211,
  },
  {
    text: '汽车',
    tid: 223,
  },
  {
    text: '时尚美妆',
    tid: 155,
  },
  {
    text: '体育运动',
    tid: 234,
  },
  {
    text: '动物',
    tid: 217,
  },
];

const handleClick = (newValue) => {
  if (newValue === tid.value) return;
  tid.value = newValue;
};
</script>

<template>
  <button
    v-for="item in channels"
    :class="{
      'vui_button vui_button--tab mt_sm mr_sm': true,
      'vui_button--active': item.tid === tid,
    }"
    @click="handleClick(item.tid)"
  >
    {{ item.text }}
  </button>
</template>

<style scoped></style>
