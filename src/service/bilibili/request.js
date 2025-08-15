import biliUtil from '@/utils/biliUtil';

const request = async (url, option, success, failure) => {
  if (!url || !option) {
    throw new Error('invaild url or option');
  }

  return fetch(url, option)
    .then((response) => response.json())
    .then((result) => {
      if (result.code === 0) {
        success && success(result.data);
        return result.data;
      } else {
        failure && failure(result.message);
        return result.message;
      }
    })
    .catch((e) => {
      failure && failure('请求发生错误：' + e);
      return e;
    });
};

const getWbiKeys = async () => {
  const res = await request('https://api.bilibili.com/x/web-interface/nav', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
  });
  const img_url = res.wbi_img.img_url;
  const sub_url = res.wbi_img.sub_url;

  return {
    img_key: img_url.slice(img_url.lastIndexOf('/') + 1, img_url.lastIndexOf('.')),
    sub_key: sub_url.slice(sub_url.lastIndexOf('/') + 1, sub_url.lastIndexOf('.')),
  };
};

class Request {
  get(url, params = {}, success, failure) {
    params.platform = 'web';
    const keys = Object.keys(params).sort();
    const query = keys.map((k) => `${k}=${params[k]}`).join('&');

    return request(
      query ? `${url}?${query}` : url,
      {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
      },
      success,
      failure
    );
  }

  post(url, params = {}, success, failure) {
    params.platform = 'web';
    params.csrf = biliUtil.getCsrf();
    const keys = Object.keys(params).sort();
    const query = new URLSearchParams();
    keys.forEach((k) => query.append(k, params[k]));

    return request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: query.toString(),
        credentials: 'include',
        mode: 'cors',
      },
      success,
      failure
    );
  }

  async wbiGet(url, params = {}, success, failure) {
    params.platform = 'web';
    const wbiKeys = await getWbiKeys();
    const query = biliUtil.encWbi(params, wbiKeys.img_key, wbiKeys.sub_key);

    return request(
      `${url}?${query}`,
      {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
      },
      success,
      failure
    );
  }
}

export default new Request();
