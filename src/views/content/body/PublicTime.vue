<script setup>
import { computed } from 'vue';
import dateUtil from '@/utils/dateUtil';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const isYesterday = (timestamp) => {
  // 获取当前日期和传入的日期
  const today = new Date();
  const input = new Date(timestamp);

  // 将时间都设置为午夜00:00:00，只比较日期部分
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const inputMidnight = new Date(input.getFullYear(), input.getMonth(), input.getDate());

  // 计算两个日期的毫秒差
  const timeDiff = todayMidnight - inputMidnight;

  // 一天的毫秒数
  const oneDayMs = 24 * 60 * 60 * 1000;

  // 如果时间差正好是一天，则是昨天
  return timeDiff === oneDayMs;
};

const convert = (time) => {
  const diff = Math.floor(Date.now() / 1000) - time;
  if (diff <= 60) return diff + '秒前';
  if (diff <= 60 * 60) return Math.floor(diff / 60) + '分钟前';
  if (diff <= 24 * 60 * 60) return Math.floor(diff / (60 * 60)) + '小时前';
  if (isYesterday(time * 1000)) return '昨天';
  return new Date().getFullYear() === new Date(time * 1000).getFullYear()
    ? dateUtil.timestampToDate[3](time * 1000)
    : dateUtil.timestampToDate[2](time * 1000);
};

const obj = computed(() => {
  const _ = {};

  _.time = props.item.pubdate;
  _.timeText = convert(_.time);

  return _;
});
</script>

<template>
  {{ ' · ' + obj.timeText }}
</template>

<style scoped></style>
