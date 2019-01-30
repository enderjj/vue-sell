<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item border-1px" v-for="item in goods" :key="item">
          <span class="menu-name"><span class="item-icon" v-show="item.type>0" :class="iconMaps[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript6">
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: {} // 用于存放商品信息
      };
    },
    created() {
      this.$http.get('/api/goods').then(response => {
        response = response.body; // 将响应数据转换成 Object 对象

        if(response.errno === ERR_OK) {
          this.goods = response.data; // 将响应中的 data 数据部分赋值给 goods 对象
        }
      });

      this.iconMaps = ["decrease", "discount", "special", "invoice", "guarantee"]; // 用于保存不同的 type 对应的类名
    }
  };
</script>

<style lang="stylus" type="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      .menu-item
        display: table // table 显示方便设置垂直居中
        height: 54px
        padding: 0 12px
        border-1px(rgba(7,17,27,0.1))
        .menu-name
          display: table-cell
          font-size: 12px
          line-height: 14px
          vertical-align: middle
          .item-icon
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 2px
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease // 根据不同的优惠类型显示不同的图标
              bg-image('decrease_3');
            &.discount
              bg-image('discount_3');
            &.special
              bg-image('special_3');
            &.invoice
              bg-image('invoice_3');
            &.guarantee
              bg-image('guarantee_3');
    .foods-wrapper
      flex: 1
</style>

