<template>
  <text class="flex text-red-500">
    百科: {{ countStore.count }}
    <button @click="countStore.increment">新增</button>
  </text>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCountStore } from '@/store/useCountStore'

const countStore = useCountStore()
const title = ref('Hello')
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
