import { createApp, h, ref } from 'vue';
import { showLoading, hideLoading } from '@/components/loading';
import { set as setV } from '@/globals/variables';
import { type as typeApi } from '@/service/bilibili/api/search';
import Channel from './views/header/Channel.vue';
import Content from './views/content/Content.vue';

const original = history.replaceState;
let href = null;
let originChannelEL = null;
let customChannelEL = null;
let originContentEL = null;
let customContentEL = null;
const params = ref({
  searchType: 'video',
  tids: 0,
  pn: 1,
  ps: 42,
});
const total = ref(0);
const list = ref([]);

const search = () => {
  href = window.location.href;

  const _ = new URLSearchParams(window.location.search);
  params.value.keyword = _.get('keyword') || '要开心噢！';
  params.value.order = _.get('order') || '';
  params.value.pubtimeBeginS = _.get('pubtime_begin_s') || 0;
  params.value.pubtimeEndS = _.get('pubtime_end_s') || 0;
  params.value.duration = _.get('duration') || 0;

  showLoading();
  typeApi({ ...params.value }, (result) => {
    total.value =
      result.numResults != 1000
        ? result.numResults
        : params.value.tids > 0
        ? result.numResults
        : 1176;
    list.value = result.result;
    hideLoading();
  });
};

const handleJump = (to) => {
  params.value.pn = to;
  search();
  document.documentElement.scrollTop = 0;
};

const renderChannel = () => {
  createApp({
    render: () => {
      return h(Channel, {
        tid: params.value.tids,
        'onUpdate:tid': (newValue) => {
          if (newValue === params.value.tids) return;
          params.value.tids = newValue;
          params.value.pn = 1;
          search();
        },
      });
    },
  }).mount(
    (() => {
      originChannelEL = document.querySelector(
        '#i_cecream .search-header .search-conditions .more-conditions .search-condition-row:nth-child(3)'
      );

      if (customChannelEL) customChannelEL.parentNode.removeChild(customChannelEL);
      customChannelEL = originChannelEL.cloneNode();
      customChannelEL.id = 'custom-channel';
      originChannelEL.parentNode.append(customChannelEL);

      return customChannelEL;
    })()
  );
};

const renderContent = () => {
  createApp({
    render: () => {
      return h(Content, {
        list: list.value,
        total: total.value,
        currPage: params.value.pn,
        pageSize: params.value.ps,
        onJump: handleJump,
      });
    },
  }).mount(
    (() => {
      originContentEL = document.querySelector('#i_cecream .search-content');

      if (customContentEL) customContentEL.parentNode.removeChild(customContentEL);
      customContentEL = originContentEL.cloneNode();
      customContentEL.id = 'custom-content';
      originContentEL.parentNode.append(customContentEL);

      // 暂时不开启实时获取B站元素版本号，先使用固定值观察情况
      // setTimeout(() => {
      //   let attr1 = Object.values(originContentEL.attributes).find((item) => {
      //     return item.name.startsWith('data-v-');
      //   });
      //   attr1 && setV('data_v_search_content', { [attr1.name]: attr1.value });

      //   let attr2 = Object.values(
      //     originContentEL.querySelector('.search-page')?.attributes
      //   ).find((item) => {
      //     return item.name.startsWith('data-v-');
      //   });
      //   attr2 && setV('data_v_search_page', { [attr2.name]: attr2.value });

      //   let attr3 = Object.values(
      //     originContentEL.querySelector('.bili-video-card')?.attributes
      //   ).find((item) => {
      //     return item.name.startsWith('data-v-');
      //   });
      //   attr3 && setV('data_v_bili_video_card', { [attr3.name]: attr3.value });
      // }, 1000);

      return customContentEL;
    })()
  );
};

const replace = () => {
  if (originChannelEL) {
    if (!document.body.contains(originChannelEL)) {
      originChannelEL = document.querySelector(
        '#i_cecream .search-header .search-conditions .more-conditions .search-condition-row:nth-child(3)'
      );
    }
    originChannelEL.style.display = 'none';
  }
  if (customChannelEL) {
    if (!document.body.contains(customChannelEL)) {
      originChannelEL.parentNode.append(customChannelEL);
    }
    customChannelEL.style.display = '';
  }
  if (originContentEL) originContentEL.style.display = 'none';
  if (customContentEL) customContentEL.style.display = '';
};

const restore = () => {
  if (originChannelEL) originChannelEL.style.display = '';
  if (customChannelEL) customChannelEL.style.display = 'none';
  if (originContentEL) originContentEL.style.display = '';
  if (customContentEL) customContentEL.style.display = 'none';
};

(() => {
  const load_observer = new MutationObserver(() => {
    const videoTab = document.querySelector(
      '#i_cecream .search-header .search-tabs .vui_tabs--nav-item:nth-child(2)'
    );
    if (!videoTab || !videoTab.classList.contains('vui_tabs--nav-item-active')) return;

    load_observer.disconnect();
    renderChannel();
    renderContent();

    const _ = () => {
      if (!videoTab.classList.contains('vui_tabs--nav-item-active')) {
        restore();
        history.replaceState = original;
      } else {
        replace();
        history.replaceState = function (...args) {
          original.apply(this, args);
          if (href === window.location.href) return;
          params.value.pn = 1;
          search();
        };
        params.value.tids = 0;
        params.value.pn = 1;
        search();
      }
    };
    new MutationObserver(_).observe(videoTab, {
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: true,
    });

    _();
  });
  load_observer.observe(document.body, { childList: true, subtree: true });
})();
