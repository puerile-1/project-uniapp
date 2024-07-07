<template>
  <view class="flex text-red-500">
    <view class="uni-form-item uni-column">
      <input class="uni-input" focus placeholder="自动获得焦点" />
    </view>
    <scroll-view class="nav-bar" scroll-x>
      <!-- 要想使用flex布局实现横向滚动，就要在scroll-view里加一层容器block包裹，并且使用子组件才会出现滚动效果 -->
      <view class="nav-bar-wrap">
        <block v-for="(item, index) in recoverArr" :key="index">
          <view class="nav-bar-item">
            <image class="images" src="../../static/icons/教育.png" />
            <!-- <view>便签</view> -->
          </view>
        </block>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCountStore } from '@/store/useCountStore'
const recoverArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const countStore = useCountStore()
const title = ref('Hello')
</script>
<style lang="scss">
scroll-view {
  white-space: nowrap;
}
/* 去除滚动条 */
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
.nav-bar-wrap {
  //  关键的样式
  display: flex;
  flex-flow: column wrap;
  height: 400rpx;
  margin: 30rpx;
}
.nav-bar-item {
  width: 180rpx;
  height: 170rpx;
  margin-top: 18rpx;
  position: relative;
  .images {
    width: 150rpx;
    height: 150rpx;
  }
}
</style>
