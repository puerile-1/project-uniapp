<template>
  <view class="flex">
    <uni-notice-bar
      class="area_height"
      show-get-more
      show-icon
      text="新店开业，所有商品半价！"
      @getmore="getMore"
    />
    <!-- 顶部卡片 -->
    <view class="header area_height">
      <view class="title"> 小怡烤奶(西溪北苑店) </view>
      <view class="distance">
        <text>距离您2.5公里</text>
        <text @click="goShop">查看门店信息<uni-icons type="right"></uni-icons></text>
      </view>
    </view>
    <!-- tab切换 -->

    <view class="tabs" data-type="2">
      <van-tabs active="0">
        <van-tab title="点餐" name="0" />
        <van-tab title="评价" name="1" />
        <van-tab title="商家" name="2" />
      </van-tabs>
    </view>
    <!-- 评价 -->
    <view class="assessment" v-if="active === 1"> <Assessment /> </view>
    <!-- 商家 -->
    <view class="business" v-if="active === 2"> <Business /> </view>
    <!-- 商品列表 -->
    <view class="goods" v-if="active === 0">
      <view class="left">
        <scroll-view
          scroll-y="true"
          :scroll-top="leftScrollTop"
          class="left"
          :style="{ height: scrollHeight + 'px', top: stickyTop + 'px' }"
        >
          <view class="">
            <view
              class="menu_name"
              :id="'menu_name' + index"
              :class="{ menu_name_active: currentIndex == index }"
              v-for="(item, index) in productList"
              @click="onChangeCate(item, index)"
              :key="index"
            >
              {{ item.name }}
            </view>
          </view>
        </scroll-view>
      </view>

      <view class="right">
        <uni-swiper-dot
          class="my-swipe"
          @clickItem="clickItem"
          :info="info"
          :current="current"
          mode="dot"
          :dots-styles="dotsStyles"
          field="content"
        >
          <swiper autoplay="true" class="van-swipe-item" @change="change" :current="swiperDotIndex">
            <swiper-item v-for="(item, index) in swipes" :key="index">
              <image class="image" :src="item.url" />
            </swiper-item>
          </swiper>
        </uni-swiper-dot>

        <view class="item" v-for="(item, index) in productList" :key="index">
          <view class="title sticky_title" :style="{ top: stickyTop + 'px' }">
            {{ item.name }}
          </view>
          <view class="content">
            <view class="product_item" v-for="(cell, cIndex) in item.list" :key="cIndex">
              <image :src="cell.img" mode="aspectFill" class="product_img"></image>
              <view class="prodcut_info">
                <view class="name">
                  {{ cell.name }}
                </view>
                <text class="price"> ￥{{ cell.price }} </text>
              </view>
              <view class="option">
                <button @click="onShowPopup" type="warn" class="button" size="mini">选规格</button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 选规格底部弹层 -->
    <view class="popup">
      <van-popup
        closeable
        class="popItem"
        :show="isShow"
        background-color="#fff"
        custom-style="height: 80%;"
        position="bottom"
        @close="onClose"
      >
        <uni-section title="奶茶">
          <view class="example">
            <!-- 基础用法，不包含校验规则 -->
            <uni-forms ref="baseForm" :modelValue="baseFormData" label-position="top">
              <uni-forms-item label="甜度">
                <view class="button-group">
                  <view @click="openNoBot(1)" class="notSelect" :class="{ checked: checked === 1 }"
                    >全糖</view
                  >
                  <view @click="openNoBot(2)" class="notSelect" :class="{ checked: checked === 2 }"
                    >七分糖</view
                  >
                  <view @click="openNoBot(3)" class="notSelect" :class="{ checked: checked === 3 }"
                    >五分糖</view
                  >
                  <view @click="openNoBot(4)" class="notSelect" :class="{ checked: checked === 4 }"
                    >三分糖</view
                  >
                  <view @click="openNoBot(5)" class="notSelect" :class="{ checked: checked === 5 }"
                    >无糖</view
                  >
                </view>
              </uni-forms-item>
              <uni-forms-item label="温度">
                <view class="button-group">
                  <view @click="openNoBot(1)" class="notSelect" :class="{ checked: checked === 1 }"
                    >正常冰</view
                  >
                  <view @click="openNoBot(2)" class="notSelect" :class="{ checked: checked === 2 }"
                    >少冰</view
                  >
                  <view @click="openNoBot(3)" class="notSelect" :class="{ checked: checked === 3 }"
                    >去冰</view
                  >
                  <view @click="openNoBot(4)" class="notSelect" :class="{ checked: checked === 4 }"
                    >热</view
                  >
                </view>
              </uni-forms-item>
              <uni-forms-item label="小料">
                <view class="button-group">
                  <view @click="openNoBot(2)" class="notSelect" :class="{ checked: checked === 2 }"
                    >波霸</view
                  >
                  <view @click="openNoBot(3)" class="notSelect" :class="{ checked: checked === 3 }"
                    >布丁</view
                  >
                  <view @click="openNoBot(4)" class="notSelect" :class="{ checked: checked === 4 }"
                    >芋圆</view
                  >
                </view>
              </uni-forms-item>
            </uni-forms>
          </view>
          <van-divider />
          <View class="totalPrice">
            <text class="priceAll">￥12</text>
            <uni-number-box :value="0" :step="1" />
          </View>

          <button type="primary" @click="submit('valiForm')">加入购物车</button>
        </uni-section>
      </van-popup>
    </view>
    <view class="bottom">
      <button class="shopCar">
        <uni-badge
          class="uni-badge-left-margin"
          :text="8"
          absolute="rightTop"
          :offset="[-5, 12]"
          size="small"
        >
          <text class="box-text">购物车</text>
        </uni-badge>
      </button>

      <text class="money">￥12</text>
      <button class="submitButton">结算</button>
    </view>
  </view>
</template>

<script>
import Business from './business.vue'
import Assessment from './assessment.vue'
export default {
  components: {
    Business,
    Assessment,
  },
  data() {
    return {
      checked: null,
      baseFormData: {
        name: '1',
        age: '2',
        sex: '3',
      },
      dotsStyles: {
        backgroundColor: 'rgba(255, 90, 95,0.3)',
        border: '1px rgba(255, 90, 95,0.3) solid',
        color: '#fff',
        selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
        selectedBorder: '1px rgba(255, 90, 95,0.9) solid',
      },
      active: ref(0),
      windowHeight: uni.getSystemInfoSync().windowHeight, //窗口高度
      scrollHeight: uni.getSystemInfoSync().windowHeight, //滚动高度
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight + 44, //顶部导航高度
      backgroundColor: 'rgba(255,255,255,0)',
      backIconColor: '#fff', //返回图标颜色
      backIcon: 'arrow-left', //home arrow-left //返回图标样式
      allAreaHeight: 0, //顶部的总区域高度
      topList: [], //
      currentIndex: 0,
      leftScrollTop: 0,
      rightItemHeight: 0,
      stickyTop: 0, //吸顶的距离
      isShow: false, // 规格弹窗
      swipes: [
        {
          url: '../../static/swipe1.jpg',
        },
        {
          url: '../../static/swipe2.jpg',
        },
        {
          url: '../../static/swipe3.jpg',
        },
      ],
      productList: [
        {
          name: '心动夏天',
          id: '1',
          icon: '',
          list: [
            {
              name: '波霸奶茶',
              img: '../../static/bbnc.jpg',
              price: 15,
            },
            {
              name: '红茶玛奇朵',
              img: '../../static/hcmqd.jpg',
              price: 18,
            },
          ],
        },
        {
          name: '店铺推荐',
          id: '2',
          icon: '',
          list: [
            {
              name: '奶绿装芒',
              img: '../../static/nlzm.jpg',
              price: 18,
            },
            {
              name: '红茶玛奇朵',
              img: '../../static/hcmqd.jpg',
              price: 18,
            },
          ],
        },
        {
          name: '奶茶',
          id: '3',
          icon: '',
          list: [
            {
              name: '阿华田',
              img: '../../static/aht.jpg',
              price: 18,
            },
            {
              name: '波霸奶茶',
              img: '../../static/bbnc.jpg',
              price: 15,
            },
            {
              name: '红茶玛奇朵',
              img: '../../static/hcmqd.jpg',
              price: 18,
            },
            {
              name: '奶绿装芒',
              img: '../../static/nlzm.jpg',
              price: 18,
            },
          ],
        },
        {
          name: '找果茶',
          id: '4',
          icon: '',
          list: [
            {
              name: '金桔柠檬',
              img: '../../static/jjnm.jpg',
              price: 14,
            },
            {
              name: '糯糯桃山',
              img: '../../static/nnts.jpg',
              price: 20,
            },
            {
              name: '望梅绿',
              img: '../../static/wml.jpg',
              price: 12,
            },
            {
              name: '杨枝甘露',
              img: '../../static/yzgl.jpg',
              price: 22,
            },
          ],
        },
      ],
    }
  },
  onPageScroll(e) {
    let opacity = (e.scrollTop / 100).toFixed(2)
    this.backgroundColor = 'rgba(255,255,255,' + (opacity >= 1 ? 1 : opacity) + ')'
    // this.backIconColor = opacity >= 1 ? '#000' : '#fff'

    // uni.setNavigationBarColor({
    //   frontColor: opacity >= 1 ? '#000000' : '#ffffff',
    //   backgroundColor: opacity >= 1 ? '#ffffff' : '#000000',
    // })
    if (!this.isClick) {
      let scrollTop = parseInt(e.scrollTop)
      for (var i = 0; i < this.topList.length; i++) {
        if (scrollTop >= this.topList[i].top && scrollTop <= this.topList[i].bottom) {
          this.currentIndex = i
          this.leftScrollTop = this.rightItemHeight * i
          break
        }
      }
    }
  },
  onLoad() {
    this.$nextTick(() => {
      const query = uni.createSelectorQuery().in(this)
      console.log('query--->', query.selectAll('area_height'))
      query
        .select('.area_height')
        .boundingClientRect((data) => {
          if (data) {
            this.allAreaHeight = 0 //需要减去的区域高度
            let addHeight = 0 //不需要减去的总高度
            for (var i = 0; i < data.length; i++) {
              if (data[i].dataset.type == '1') {
                // type = 1 是需要减去的区域  type = 2 是不需要减去的区域
                this.allAreaHeight += data[i].height //计算顶部总区域高度
              } else {
                addHeight += data[i].height
              }
            }
            //左侧菜单可滚动的高度 = 屏幕窗口总高度 - 需要减去的区域高度 + 不需要减去的区域高度 + 18;
            this.scrollHeight = this.windowHeight - this.allAreaHeight + addHeight + 18
          }
        })
        .exec()

      //自定义顶部导航的时候 计算吸顶的距离
      query
        .select('.tabs')
        .boundingClientRect((data) => {
          console.log('tabs,', data)
          if (data) {
            //吸顶距离 = 顶部标题栏高度与状态栏高度之和 + 需要吸顶的元素本身的高度
            this.stickyTop = data?.height
            console.log('height', data?.height)
          }
        })
        .exec()

      this.getTop()
    })

    if (getCurrentPages().length == 1) {
      this.backIcon = 'home'
    } else {
      this.backIcon = 'arrow-left'
    }
  },
  methods: {
    openNoBot(num) {
      this.checked = num
    },
    /**
     * 返回上一级
     */
    onBack() {
      if (getCurrentPages().length == 1) {
        uni.switchTab({
          url: '/pages/index/index',
        })
      } else {
        uni.navigateBack()
      }
    },
    /**
     * 获取右边内容距离顶部的距离
     */
    getTop() {
      const query = uni.createSelectorQuery().in(this)
      query
        .select('.menu_name')
        .boundingClientRect()
        .selectAll('.item')
        .boundingClientRect()
        .exec((data) => {
          if (data) {
            this.rightItemHeight = data[0].height //获取左侧的第一个菜单的高度
            data[1].map((item, index) => {
              this.topList.push({
                top: parseInt(item.top - this.stickyTop),
                bottom: parseInt(item.bottom - this.stickyTop),
              })
            })
          }
        })
    },
    /**
     * @param {Object} item
     * @param {Object} index
     * 点击商品分类
     */
    onChangeCate(item, index) {
      if (this.currentIndex == index) {
        return
      }
      this.isClick = true
      this.currentIndex = index
      this.leftScrollTop = this.rightItemHeight * index
      uni.pageScrollTo({
        scrollTop: this.topList[index].top,
      })
      setTimeout(() => {
        this.isClick = false
      }, 600)
    },
    /**
     * 显示购物车弹窗
     */
    onShowCart() {
      this.$refs.slide_cart.open()
    },
    /**
     * @param {Object} data
     * 点击切换tab
     */
    onChangeTab(event) {
      console.log(event)
      wx.showToast({
        title: `切换到标签 ${event.detail.name}`,
        icon: 'none',
      })
    },
    onShowPopup() {
      this.isShow = true
    },
    onClose() {
      this.isShow = false
    },
  },
}
</script>

<style lang="scss">
.flex {
  .header {
    padding-bottom: 20rpx;

    .title {
      margin: 30rpx 0 20rpx 30rpx;
      font-size: large;
      font-weight: 400;
      padding-bottom: 20rpx;
    }
    .distance {
      color: #aaa;
      font-size: small;
      display: flex;
      justify-content: space-between;
      margin-left: 30rpx;
    }
  }
  .tabs {
    position: sticky;
    top: 0;
    height: 100rpx;
    background: #fff;
    box-shadow: 0 3px 10px -4px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  .goods {
    /* 	position: sticky;
		top: 100rpx; */
    display: flex;
    flex-direction: row;
    border-top: 20rpx solid #f5f5f5;

    .left {
      position: sticky;
      top: 100rpx;
      width: 150rpx;
      background: #fff;

      .menu_name {
        /* 	position: sticky;
				top: 0; */
        height: 100rpx;
        line-height: 100rpx;
        text-align: center;
        color: #8d8d8d;
      }

      .menu_name_active {
        background: #f5f5f5;
        color: #333;
      }
    }

    .right {
      flex: 1;
      min-height: 100rpx;
      background: #f5f5f5;
      padding: 0 0 0 20rpx;
      .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        height: 150px;
        text-align: center;
        .image {
          border-radius: 10px;
          width: 100%;
          height: 100%;
        }
      }
      .item {
        border-bottom: 1px solid #eee;
        background: #fff;

        .title {
          position: sticky;
          top: 100rpx;
          height: 60rpx;
          line-height: 60rpx;
          background: #fff;
          padding-left: 20rpx;
        }

        .product_item {
          height: 120rpx;
          display: flex;
          margin-bottom: 20rpx;
          padding: 0 20rpx;
          width: 100%;
          .product_img {
            width: 120rpx;
            height: 120rpx;
            border-radius: 6rpx;
          }

          .prodcut_info {
            flex: 1;
            padding-left: 20rpx;
            .name {
              margin-left: 5rpx;
            }
            .price {
              margin-top: 5rpx;
              font-size: small;
              color: red;
            }
          }

          .option {
            width: 120px;
            text-align: center;
            line-height: 120rpx;
            height: 120px;
            .button {
              width: 50px;
              height: 25px;
              border-radius: 5px;
              font-size: 12px;
              padding: 0;
            }
          }
        }
      }
    }
  }
  .popup {
    height: 800px;
    .popItem {
      height: 800px;
      .example {
        .button-group {
          display: flex;
          flex-direction: row;
          .notSelect {
            width: 60rpx;
            height: 25rpx;
            text-align: center;
            padding: 20rpx 16rpx;
            margin: 4rpx 5rpx 6rpx 10rpx;
            font-size: 20rpx;
            color: #000;
            border-radius: 10rpx;
            background: #eee;
          }

          .checked {
            background: rgb(233, 73, 73);
          }
        }
      }
      .totalPrice {
        display: flex;
        justify-content: space-between;
        margin: 15px;
        .priceAll {
          color: red;
        }
      }
    }
  }
  .bottom {
    background-color: #f5f5f5;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    // padding: 10px;
    text-align: center;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* 添加一个阴影效果 */
    display: flex;

    .shopCar {
      margin: 5px;
      width: 90px;
      height: 50px;
      font-size: 15px;
      line-height: 50px;
      background-color: #fff;
      border-radius: 20px;
    }

    .money {
      color: red;
      flex: 1;
      width: 100px;
      height: 60px;
      line-height: 60px;
      text-align: right;
      margin-right: 15px;
    }
    .submitButton {
      width: 100px;
      height: 60px;
      line-height: 60px;
      background: rgb(233, 73, 73);
      color: #fff;
    }
  }
}
</style>
