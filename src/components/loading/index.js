// deepseek 救我狗命！！！！！！！！！！
import { createApp } from 'vue';
import Loading from './Loading.vue';

let loadingInstance = null;
let loadingMountPoint = null;
let loadingQueue = 0;

const initLoading = () => {
  if (!loadingInstance) {
    // 创建挂载点
    loadingMountPoint = document.createElement('div');
    loadingMountPoint.id = 'global-loading-container';
    document.body.appendChild(loadingMountPoint);

    // 创建Vue应用实例并挂载
    loadingInstance = createApp(Loading).mount(loadingMountPoint);
  }
};

/**
 * 显示全局Loading
 * @param {string} text - 可选，加载文字提示
 */
export const showLoading = (text) => {
  loadingQueue++;
  initLoading();
  loadingInstance.show(text);
};

/**
 * 隐藏全局Loading
 */
export const hideLoading = () => {
  if (loadingQueue > 0) loadingQueue--;
  if (loadingQueue === 0 && loadingInstance) {
    loadingInstance.hide();
  }
};

/**
 * 完全销毁Loading实例
 */
export const destroyLoading = () => {
  if (loadingMountPoint) {
    hideLoading();
    document.body.removeChild(loadingMountPoint);
    loadingMountPoint = null;
    loadingInstance = null;
    loadingQueue = 0;
  }
};

// 自动销毁处理
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', destroyLoading);
}
