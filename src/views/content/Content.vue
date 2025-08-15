<script setup>
import { get as getV } from '@/globals/variables';
import List from './body/List.vue';
import Pagination from './footer/Pagination.vue';

const props = defineProps({
  list: {
    type: Array,
    required: true,
    default: [],
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  currPage: {
    type: Number,
    required: true,
    default: 1,
  },
  pageSize: {
    type: Number,
    required: true,
    default: 42,
  },
});
const emits = defineEmits(['jump']);

const d_v_s_c = getV('data_v_search_content');
const d_v_s_p = getV('data_v_search_page');

const handleJump = (to) => {
  emits('jump', to);
};
</script>

<template>
  <div style="" class="search-page-wrapper" v-bind="d_v_s_c">
    <!---->
    <div v-bind="d_v_s_p" class="search-page search-page-video i_wrapper mt_xxl pb_xxl">
      <div v-bind="d_v_s_p" class="video-list row">
        <List :list="list" />
      </div>
      <div v-bind="d_v_s_p" class="flex_center mt_x50 mb_lg">
        <Pagination
          :total="total"
          :currPage="currPage"
          :pageSize="pageSize"
          @change="handleJump"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
