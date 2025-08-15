import request from '@/service/bilibili/request';

export const type = (
  {
    keyword,
    pn = 1,
    ps = 42,
    searchType = 'video',
    order = '',
    pubtimeBeginS = 0,
    pubtimeEndS = 0,
    duration = '',
    tids = '',
  },
  success,
  failure
) => {
  if (!keyword) return;

  let url = 'https://api.bilibili.com/x/web-interface/wbi/search/type';
  let params = {
    keyword,
    page: pn,
    page_size: ps,
    search_type: searchType,
    order,
    pubtime_begin_s: pubtimeBeginS,
    pubtime_end_s: pubtimeEndS,
    duration,
    tids,
  };
  return request.wbiGet(url, params, success, failure);
};
