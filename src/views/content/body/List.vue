<script setup>
import { get as getV } from '@/globals/variables';
import WatchLater from './WatchLater.vue';
import Stats from './Stats.vue';
import UpSVG from './svg/UpSVG.vue';
import PublicTime from './PublicTime.vue';

const props = defineProps({
  list: {
    type: Array,
    required: true,
    default: [],
  },
});

const d_v_s_p = getV('data_v_search_page');
const d_v_b_v_c = getV('data_v_bili_video_card');

const mouseenterCover = (event) => {
  event.target.querySelector('.bili-watch-later').style.display = '';
};
const mouseleaveCover = (event) => {
  event.target.querySelector('.bili-watch-later').style.display = 'none';
};
</script>

<template>
  <template v-for="item in list">
    <div
      v-if="item.type === 'video'"
      v-bind="d_v_s_p"
      class="video-list-item col_3 col_xs_1_5 col_md_2 col_xl_1_7 mb_x40"
    >
      <div v-bind="{ ...d_v_b_v_c, ...d_v_s_p }" class="bili-video-card">
        <div v-bind="d_v_b_v_c" class="bili-video-card__skeleton hide">
          <div class="bili-video-card__skeleton--cover" v-bind="d_v_b_v_c"></div>
          <div class="bili-video-card__skeleton--info" v-bind="d_v_b_v_c">
            <div class="bili-video-card__skeleton--right" v-bind="d_v_b_v_c">
              <p class="bili-video-card__skeleton--text" v-bind="d_v_b_v_c"></p>
              <p class="bili-video-card__skeleton--text short" v-bind="d_v_b_v_c"></p>
              <p class="bili-video-card__skeleton--light" v-bind="d_v_b_v_c"></p>
            </div>
          </div>
        </div>

        <div v-bind="d_v_b_v_c" class="bili-video-card__wrap">
          <!---->

          <a
            v-bind="d_v_b_v_c"
            :href="`//www.bilibili.com/video/${item.bvid}/`"
            class=""
            target="_blank"
            data-mod="search-card"
            data-idx="all"
            data-ext="click"
            @mouseenter="mouseenterCover"
            @mouseleave="mouseleaveCover"
          >
            <div v-bind="d_v_b_v_c" class="bili-video-card__image">
              <div v-bind="d_v_b_v_c" class="bili-video-card__image--wrap">
                <div class="bili-watch-later--wrap">
                  <WatchLater :item="item" />
                </div>

                <picture v-bind="d_v_b_v_c" class="v-img bili-video-card__cover">
                  <source
                    :srcset="item.pic + '@672w_378h_1c_!web-search-common-cover.avif'"
                    type="image/avif"
                  />
                  <source
                    :srcset="item.pic + '@672w_378h_1c_!web-search-common-cover.webp'"
                    type="image/webp"
                  />
                  <img
                    :src="item.pic + '@672w_378h_1c_!web-search-common-cover'"
                    :alt="item.title"
                    loading="lazy"
                    onload=""
                    onerror="typeof window.imgOnError === 'function' &amp;&amp; window.imgOnError(this)"
                  />
                </picture>

                <!---->
              </div>

              <div v-bind="d_v_b_v_c" class="bili-video-card__mask">
                <Stats :item="item" />
              </div>
            </div>
          </a>

          <div v-bind="d_v_b_v_c" class="bili-video-card__info">
            <!---->

            <div v-bind="d_v_b_v_c" class="bili-video-card__info--right">
              <a
                v-bind="d_v_b_v_c"
                :href="`//www.bilibili.com/video/${item.bvid}/`"
                target="_blank"
                data-mod="search-card"
                data-idx="all"
                data-ext="click"
              >
                <h3
                  v-bind="d_v_b_v_c"
                  class="bili-video-card__info--tit"
                  :title="item.title.replace(/<\/?em[^>]*>/g, '')"
                  v-html="item.title"
                ></h3>
              </a>

              <!---->

              <div v-bind="d_v_b_v_c" class="bili-video-card__info--bottom">
                <a
                  v-bind="d_v_b_v_c"
                  class="bili-video-card__info--owner"
                  :href="`//space.bilibili.com/${item.mid}`"
                  target="_blank"
                  data-mod="search-card"
                  data-idx="all"
                  data-ext="click"
                >
                  <UpSVG />

                  <span v-bind="d_v_b_v_c" class="bili-video-card__info--author">
                    {{ item.author }}
                  </span>

                  <span v-bind="d_v_b_v_c" class="bili-video-card__info--date">
                    <PublicTime :item="item" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped></style>
