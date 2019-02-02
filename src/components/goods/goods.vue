<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item border-1px" v-for="item in goods" :key="item">
          <span class="menu-name"><span class="item-icon" v-show="item.type>0" :class="iconMaps[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" :key="item" class="foodlist">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" :key="food" class="food-item">
              <div class="food-icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="food-content">
                <h2 class="food-name">{{food.name}}</h2>
                <p class="food-description">{{food.description}}</p>
                <div class="extra">
                  <span class="food-count">月售{{food.sellCount}}份</span>
                  <span class="food-rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now-price">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
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

        if (response.errno === ERR_OK) {
          this.goods = response.data; // 将响应中的 data 数据部分赋值给 goods 对象
        }
      });

      this.iconMaps = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; // 用于保存不同的 type 对应的类名
    }
  };
</script>

<style lang="stylus" type="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .goods
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper
      flex: 0 0 80px;
      width: 80px;
      background-color: #f3f5f7;
      .menu-item
        display: table; // table 显示方便设置垂直居中
        height: 54px;
        padding: 0 12px;
        border-1px(rgba(7,17,27,0.1));
        .menu-name
          display: table-cell;
          font-size: 12px;
          line-height: 14px;
          vertical-align: middle;
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
      flex: 1;
      .foodlist
        .title
          height: 26px;
          line-height: 26px;
          padding-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
          border-left: 2px solid #d9dde1;
          background-color: #f3f5f7;
        .food-item
          display: flex;
          margin: 16px;
          border-1px(rgba(7,17,27,0.1));
          padding-bottom: 18px;
          &:last-child
            border-none();
          .food-icon
            flex: 0 0 57px;
            height: 57px;
            margin-right: 10px;
          .food-content
            flex: 1;
            .food-name
              margin: 2px 0 8px 0;
              line-height: 14px;
              font-size: 14px;
              color: rgb(7, 17, 27);
            .food-description, .extra
              line-height: 10px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            .food-description
              margin-bottom: 8px;
            .extra
              &.food-count
                margin-right: 12px;
            .price
              font-weight: 700;
              line-height: 24px;
              .now-price
                font-size: 14px;
                margin-right: 8px;
                color: rgb(240, 20, 20);
              .old-price
                font-size: 10px;
                color: rgb(147, 153, 159);
                text-decoration: line-through;
</style>

