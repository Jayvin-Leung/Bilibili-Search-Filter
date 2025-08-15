import { ref } from 'vue';

const _ = ref({
  data_v_search_content: { 'data-v-22ff42d3': '' },
  data_v_search_page: { 'data-v-0450c084': '' },
  data_v_bili_video_card: { 'data-v-37adbc26': '' },
});

export const get = (key) => {
  return _.value[key];
};

export const set = (key, value) => {
  _.value[key] = value;
};
