import md5 from 'md5';

const XOR_CODE = 23442827791579n;
const MASK_CODE = 2251799813685247n;
const MAX_AID = 1n << 51n;
const BASE = 58n;
const data = 'FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf';

const getCookieValue = (key) => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim().split('=');
    if (cookie[0] === key) {
      return cookie.length > 1 ? cookie[1] : '';
    }
  }
  return null;
};

const getUid = () => {
  return getCookieValue('DedeUserID');
};

const getCsrf = () => {
  return getCookieValue('bili_jct');
};

const getSESSDATA = () => {
  return getCookieValue('SESSDATA');
};

const encWbi = (params, img_key, sub_key) => {
  const _mixinKeyEncTab = [
    46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42,
    19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60,
    51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52,
  ];

  // 对 imgKey 和 subKey 进行字符顺序打乱编码
  const _getMixinKey = (orig) =>
    _mixinKeyEncTab
      .map((n) => orig[n])
      .join('')
      .slice(0, 32);

  const mixin_key = _getMixinKey(img_key + sub_key);
  const curr_time = Math.round(Date.now() / 1000);
  const chr_filter = /[!'()*]/g;

  Object.assign(params, { wts: curr_time }); // 添加 wts 字段

  // 按照 key 重排参数
  const query = Object.keys(params)
    .sort()
    .map((key) => {
      // 过滤 value 中的 "!'()*" 字符
      const value = params[key].toString().replace(chr_filter, '');
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');

  // 计算 w_rid
  const wbi_sign = md5(query + mixin_key);

  return query + '&w_rid=' + wbi_sign;
};

const getCurrLocation = () => {
  const currLocation = location.origin + location.pathname;
  return currLocation.endsWith('/') ? currLocation : currLocation + '/';
};

const getCurrBvid = () => {
  if (location.origin != 'https://www.bilibili.com') return '';
  const arr = location.pathname.split('/');
  if (arr[1] !== 'video') return '';
  if (!new RegExp(/(BV|av)[a-zA-Z0-9]+/).test(arr[2])) return '';
  return arr[2];
};

const av2bv = (aid) => {
  const bytes = ['B', 'V', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
  let bvIndex = bytes.length - 1;
  let tmp = (MAX_AID | BigInt(aid)) ^ XOR_CODE;
  while (tmp > 0) {
    bytes[bvIndex] = data[Number(tmp % BigInt(BASE))];
    tmp = tmp / BASE;
    bvIndex -= 1;
  }
  [bytes[3], bytes[9]] = [bytes[9], bytes[3]];
  [bytes[4], bytes[7]] = [bytes[7], bytes[4]];
  return bytes.join('');
};

const bv2av = (bvid) => {
  const bvidArr = Array.from(bvid);
  [bvidArr[3], bvidArr[9]] = [bvidArr[9], bvidArr[3]];
  [bvidArr[4], bvidArr[7]] = [bvidArr[7], bvidArr[4]];
  bvidArr.splice(0, 3);
  const tmp = bvidArr.reduce(
    (pre, bvidChar) => pre * BASE + BigInt(data.indexOf(bvidChar)),
    0n
  );
  return Number((tmp & MASK_CODE) ^ XOR_CODE);
};

export default {
  getCookieValue,
  getUid,
  getCsrf,
  getSESSDATA,
  encWbi,
  getCurrLocation,
  getCurrBvid,
  av2bv,
  bv2av,
};
