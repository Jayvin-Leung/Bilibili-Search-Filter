<script setup>
import { ref } from 'vue';

const visible = ref(false);
const text = ref('');

const show = (loadingText = '加载中……') => {
  text.value = loadingText || '';
  visible.value = true;
};

const hide = () => {
  visible.value = false;
};

// 暴露方法供外部调用
defineExpose({ show, hide });
</script>

<template>
  <div v-if="visible" class="global-loading-overlay">
    <div class="global-loading-spinner"></div>
    <p v-if="text" class="global-loading-text">{{ text }}</p>
  </div>
</template>

<style scoped>
.global-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
  transition: opacity 0.3s ease;
}

.global-loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s ease-in-out infinite;
}

.global-loading-text {
  margin-top: 15px;
  color: #333;
  font-size: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
