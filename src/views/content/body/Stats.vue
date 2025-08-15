<script setup>
import { computed } from 'vue';
import { get as getV } from '@/globals/variables';
import PlayNumSVG from './svg/PlayNumSVG.vue';
import DmNumSVG from './svg/DmNumSVG.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const d_v_b_v_c = getV('data_v_bili_video_card');

const convert = (duration) => {
  const [minutes, seconds] = duration.split(':').map(Number);
  if (minutes < 60) return duration;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return [
    hours.toString().padStart(2, '0'),
    remainingMinutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':');
};

const obj = computed(() => {
  const _ = {};

  _.play = props.item.play;
  _.playText = _.play < 10000 ? _.play : (_.play / 10000).toFixed(1) + '万';
  _.danmu = props.item.danmaku;
  _.danmuText = _.danmu < 10000 ? _.danmu : (_.danmu / 10000).toFixed(1) + '万';
  _.durationText = convert(props.item.duration);

  return _;
});
</script>

<template>
  <div v-bind="d_v_b_v_c" class="bili-video-card__stats">
    <div v-bind="d_v_b_v_c" class="bili-video-card__stats--left">
      <span v-bind="d_v_b_v_c" class="bili-video-card__stats--item">
        <PlayNumSVG />
        <span v-bind="d_v_b_v_c">{{ obj.playText }}</span>
      </span>

      <span v-bind="d_v_b_v_c" class="bili-video-card__stats--item">
        <DmNumSVG />
        <span v-bind="d_v_b_v_c">{{ obj.danmuText }}</span>
      </span>
    </div>

    <span v-bind="d_v_b_v_c" class="bili-video-card__stats__duration">
      {{ obj.durationText }}
    </span>
  </div>
</template>

<style scoped></style>
