<script setup>
import {
  add as addToviewApi,
  del as delToviewApi,
} from '@/service/bilibili/api/history/toview';
import WatchLaterToAddSVG from './svg/WatchLaterToAddSVG.vue';
import WatchLaterAddedSVG from './svg/WatchLaterAddedSVG.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const mouseenterPip = (event) => {
  event.target.querySelector('.bili-watch-later__tip').style.display = '';
};
const mouseleavePip = (event) => {
  event.target.querySelector('.bili-watch-later__tip').style.display = 'none';
};
const handleWatchLater = (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (props.item.toview) {
    delToviewApi({ bvid: props.item.bvid }, () => {
      props.item.toview = false;
    });
  } else {
    addToviewApi({ bvid: props.item.bvid }, () => {
      props.item.toview = true;
    });
  }
};
</script>

<template>
  <div
    class="bili-watch-later bili-watch-later--pip"
    style="display: none"
    @mouseenter="mouseenterPip"
    @mouseleave="mouseleavePip"
    @click="(event) => handleWatchLater(event)"
  >
    <WatchLaterAddedSVG v-if="item.toview" />
    <WatchLaterToAddSVG v-else />
    <span class="bili-watch-later__tip" style="display: none">
      {{ item.toview ? ' 移除 ' : ' 稍后再看 ' }}
    </span>
  </div>
</template>

<style scoped></style>
