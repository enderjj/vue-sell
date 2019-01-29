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
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin"></div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.iconMaps = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; // 用于保存不同的 type 对应的类名
  }
};
</script>

<style lang="stylus" type="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';

  .header
    color: #fff
    background-color: #999
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          width: 64px
          height: 64px
          // border-radius: 2px
      .content
        display: inline-block
        font-size: 12px
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            width: 30px
            height: 18px
            vertical-align: top
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .seller-name
            font-size: 16px
            font-weight: bold
            line-height: 18px
            margin-left: 6px
        .description
          font-size: 12px
          line-height: 12px
          margin-bottom: 10px
        .supports
          margin-bottom: 2px
          .support-icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.special
              bg-image('special_1')
            &.invoice
              bg-image('invoice_1')
            &.guarantee
              bg-image('guarantee_1')
          .support
            font-size: 10px
            line-height: 12px
            margin-left: 4px
      .support-count
        position: absolute
        padding: 0 8px
        height: 24px
        right: 12px
        bottom: 18px
        font-size: 10px
        line-height: 24px
        background-color: rgba(0,0,0,0.2)
        border-radius: 14px
        text-align: center
        .count
          vertical-align: top
          margin-right: 2px
</style>

