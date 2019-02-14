<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuwrapper">
      <ul>
        <li class="menu-item border-1px" v-for="(item, index) in goods" :key="item" @click="clickScroll(index)" :class="{'current': currentIndex===index}">
          <span class="menu-name"><span class="item-icon" v-show="item.type>0" :class="iconMaps[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodwrapper">
      <ul>
        <li v-for="item in goods" :key="item" class="foodlist food-list-hook">
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
                <div class="cartcontrol-container">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import cartcontrol from '../cartcontrol/cartcontrol';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },

    data() {
      return {
        goods: {}, // 用于存放商品信息
        listHeight: [], // 用于存放每类商品列表的初始高度
        scrollHeight: 0 // 初始滚动高度
      };
    },

    components: {
      shopcart,
      cartcontrol
    },

    computed: {
      // 当前应该显示的 menu 的索引值
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let prevHeight = this.listHeight[i];
          let nextHeight = this.listHeight[i + 1];

          // 如果当前的 scrollY 在 prevHeight 和 nextHeight 之间，就显示对应的索引值对应的 menu
          if (!nextHeight || (this.scrollHeight >= prevHeight && this.scrollHeight < nextHeight)) {
            return i;
          }
        }

        return 0;
      },

      // 获取所有选购的商品，返回一个商品数组
      selectFoods() {
        let foods = []; // 保存选购的商品
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) { // 如果商品被选中就加入数组
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },

    created() {
      this.$http.get('/api/goods').then(response => {
        response = response.body; // 将响应数据转换成 Object 对象

        if (response.errno === ERR_OK) {
          this.goods = response.data; // 将响应中的 data 数据部分赋值给 goods 对象
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });

      this.iconMaps = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; // 用于保存不同的 type 对应的类名
    },

    methods: {
      // 初始化滚动条
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuwrapper, {click: true});
        this.foodScroll = new BScroll(this.$refs.foodwrapper, {
          probeType: 3, // 3 表示除了实时派发scroll事件，在 swipe 的情况下仍然能实时派发 scroll 事件
          click: true
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrollHeight = Math.abs(Math.round(pos.y)); // 求得当前的 y 轴位置
        });
      },

      // 左侧菜单栏点击事件
      clickScroll(index) {
        let foodList = this.$refs.foodwrapper.getElementsByClassName('food-list-hook');
        let toElement = foodList[index];
        this.foodScroll.scrollToElement(toElement, 200); // scrollToElement() 是 better-scroll 提供的接口，直接滚动到某个位置
      },

      // 计算 listHeight
      _calculateHeight() {
        let height = 0; // 初始当前高度
        const foodList = this.$refs.foodwrapper.getElementsByClassName('food-list-hook'); // foodList 是数组，保存所有类型的商品列表

        this.listHeight.push(height);

        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight; // 下一个商品列表的高度是上一个列表的高度+上一个列表的 clientHeight
          this.listHeight.push(height);
        }
      }
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
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
        border-1px(rgba(7,17,27,0.1));
        &.current
          position: relative;
          margin-top: -1px;
          z-index: 10
          font-weight: 700;
          background-color: #fff;
          .text
            border-none();
        .menu-name
          display: table-cell;
          font-size: 12px;
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
            padding-bottom: 0
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
              font-weight: 700
              color: rgb(7, 17, 27);
            .food-description, .extra
              line-height: 10px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            .food-description
              margin-bottom: 8px;
            .extra
              .food-count
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
            .cartcontrol-container
              position: absolute;
              right: 0
              bottom: 12px;
</style>

