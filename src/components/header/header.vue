<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="seller-name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="supports">
          <span class="support-icon" :class="this.iconMaps[seller.supports[0].type]"></span>
          <span class="support">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!-- 公告栏 -->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-icon"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 虚化的背景图片 利用滤镜 filter:blur 实现 -->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!-- 公告及优惠信息 detail 部分，transtion 用于实现 detail 的渐变显示-->
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="detail-seller-name">{{seller.name}}</h1>
            <!-- 星级 -->
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <!-- 优惠信息 -->
            <div class="preferential">
              <div class="line"></div>
              <div class="preferential-content">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="all-supports" v-if="seller.supports">
              <li class="support-item" v-for="support in seller.supports" :key="support">
                <span class="support-icon" :class="iconMaps[support.type]"></span>
                <span class="support-content">{{support.description}}</span>
              </li>
            </ul>
            <!-- 商家公告 -->
            <div class="seller-bulletin">
              <div class="line"></div>
              <div class="bulletin-content">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">{{seller.bulletin}}</div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="closeDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false // 是否显示 detail 部分
    };
  },
  methods: {
    // 显示 detail 浮层
    showDetail() {
      this.detailShow = true;
    },
    // 关闭 detail 浮层
    closeDetail() {
      this.detailShow = false;
    }
  },
  created() {
    this.iconMaps = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; // 用于保存不同的 type 对应的类名
  },
  components: {
    star
  }
};
</script>

<style lang="stylus" type="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';

.header
  position: relative;
  color: #fff;
  background-color: rgba(7, 17, 27, 0.5);
  overflow: hidden;
  // background-color: #999
  .content-wrapper
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0; // 去除 inline-block 元素之间的空白间隙
    .avatar
      display: inline-block;
      vertical-align: top; // 设置元素对齐方式
      img
        width: 64px;
        height: 64px;
        border-radius: 2px
    .content
      display: inline-block;
      font-size: 12px;
      margin-left: 16px;
      .title
        margin: 2px 0 8px 0;
        font-size: 0
        .brand
          display: inline-block;
          width: 30px;
          height: 18px;
          vertical-align: top;
          bg-image('brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        .seller-name
          font-size: 16px;
          font-weight: bold;
          line-height: 18px;
          margin-left: 6px;
      .description
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 10px;
      .supports
        margin-bottom: 2px;
        font-size: 0
        .support-icon
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease // 根据不同的优惠类型显示不同的图标
            bg-image('decrease_1');
          &.discount
            bg-image('discount_1');
          &.special
            bg-image('special_1');
          &.invoice
            bg-image('invoice_1');
          &.guarantee
            bg-image('guarantee_1');
        .support
          font-size: 10px;
          line-height: 12px;
          margin-left: 4px;
    .support-count
      position: absolute;
      padding: 0 8px;
      height: 24px;
      right: 12px;
      bottom: 18px;
      font-size: 10px;
      line-height: 24px;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 14px;
      text-align: center;
      .count
        vertical-align: top;
        margin-right: 2px;
  .bulletin-wrapper
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 16px 0 12px;
    white-space: nowrap; // 不自动换行
    overflow: hidden;
    text-overflow: ellipsis; // 多余内容省略号显示
    background-color: rgba(7, 17, 27, 0.2);
    .bulletin-icon
      display: inline-block;
      vertical-align: top;
      width: 22px;
      height: 12px;
      margin-top: 8px;
      bg-image('bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
    .bulletin-text
      vertical-align: top;
      font-size: 10px;
      margin: 0 4px;
    .icon-keyboard_arrow_right
      position: absolute;
      font-size: 10px;
      right: 12px;
      top: 8px;
  .background
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px); // 背景虚化显示 给背景加上滤镜 filter
  .fade-enter-active, .fade-leave-active // 设置进入和离开动画的持续时间
    transition: all 0.5s
  .fade-enter, .fade-leave-to // 设置进入的初始状态和离开的最终状态
    opacity: 0
    background-color: rgba(7, 17, 27, 0);
  .fade-leave, .fade-enter-to // 设置离开的初始状态和进入的最终状态
    opacity: 1
    background-color: rgba(7, 17, 27, 0.8);
  .detail
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px) // 浮层虚化显示
    z-index: 100;
    background-color: rgba(7, 17, 27, 0.8);
    .detail-wrapper
      width: 100%;
      min-height: 100%; // 设置容器最小高度为屏幕高度
      overflow: auto; // 根据内容高度
      .detail-main
        margin-top: 64px;
        padding-bottom: 64px;
        .detail-seller-name
          line-height: 16px;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
        .star-wrapper
          margin-top: 16px;
          padding: 2px 0;
          text-align: center;
        .preferential
          display: flex;
          width: 80%; // 为了适应不同的设备取 80%
          margin: 28px auto 24px auto;
          .line
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          .preferential-content
            font-size: 14px;
            padding: 0 12px;
            font-weight: 700;
            line-height: 14px;
        .all-supports
          width: 80%;
          margin: 0 auto;
          .support-item
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            &:last-child
              margin-bottom: 0;
            .support-icon
              display: inline-block;
              width: 16px;
              height: 16px;
              margin-right: 6px;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              vertical-align: top;
              &.decrease
                bg-image('decrease_2');
              &.discount
                bg-image('discount_2');
              &.special
                bg-image('special_2');
              &.invoice
                bg-image('invoice_2');
              &.guarantee
                bg-image('guarantee_2');
            .support-content
              font-size: 12px;
              line-height: 16px;
        .seller-bulletin
          display: flex;
          width: 80%; // 为了适应不同的设备取 80%
          margin: 28px auto 24px auto;
          .line
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          .bulletin-content
            font-size: 14px;
            padding: 0 12px;
            font-weight: 700;
            line-height: 14px;
        .bulletin
          width: 80%;
          line-height: 24px;
          margin: 0 auto;
          padding: 0 12px;
          font-size: 12px;
    .detail-close
      margin-top: -64px;
      width: 100%;
      font-size: 32px;
      text-align: center;
      color: rgba(255, 255, 255, 0.5);
      clear: both
</style>

