<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
/*每个页面公共css */
/* #ifdef MP-WEIXIN */
@import './wxcomponents/vant/common/index.wxss';
/* #endif */
</style>
