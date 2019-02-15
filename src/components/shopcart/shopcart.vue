<template>
  <div class="shopcart">
    <div class="content-wrapper">
      <div class="content-left">
        <div class="cart-wrapper">
          <div class="cart" :class="{'highlight': totalCount > 0}">
            <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
          </div>
          <div class="total-count" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="total-price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="delivery-price">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="{'enough': totalPrice >= minPrice}">
        <div class="pay">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="(ball, index) in balls" :key="index">
        <!-- 通过 JavaScript 钩子实现动画 -->
        <transition name="ball-move"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter">
          <div v-show="ball.show" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
let index = 0;

export default {
  props: {
    selectFoods: { // 用于接收选择的商品
      type: Array,
      default() {
        return [
          {
            price: 15,
            count: 2
          }
        ];
      }
    },
    deliveryPrice: { // 配送费
      type: Number,
      default: 0
    },
    minPrice: { // 最小起送费用
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [ // 保存所有小球
        {
          id: index++,
          show: false
        },
        {
          id: index++,
          show: false
        },
        {
          id: index++,
          show: false
        },
        {
          id: index++,
          show: false
        },
        {
          id: index++,
          show: false
        }
      ],
      dropBalls: [] // 保存所有要下落的小球
    };
  },
  computed: {
    // 选购的商品总价
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += (food.price * food.count);
      });
      return total;
    },

    // 选购的商品总数
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },

    // 不同的结算信息展示
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diffPrice = this.minPrice - this.totalPrice;
        return `还差￥${diffPrice}起送`;
      } else {
        return '去结算';
      }
    }
  },
  created() {
    this.$root.eventHub.$on('cartadd', (target) => { // 监听事件 cartadd
      this.drop(target);
    });
  },
  methods: {
    drop(target) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];

        if (!ball.show) { // 寻找第一个 show 为 false 的小球
          ball.show = true;
          ball.element = target; // 将事件的目标保存
          this.dropBalls.push(ball);
          return;
        }
      }
    },

    beforeEnter(el) {
      let count = this.balls.length;

      while (count--) {
        let ball = this.balls[count];

        if (ball.show) { // 寻找要做动画的小球
          let rect = ball.element.getBoundingClientRect(); // 获取小球动画触发元素的位置
          let x = rect.left - 32; // 小球运动起始位置和结束位置的水平距离
          let y = -(window.innerHeight - rect.top - 22); // 小球运动起始位置和结束位置的垂直距离
          // 在 target 元素上设置 y 轴上的运动
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
          el.style.transform = `translate3d(0, ${y}px, 0)`;
          // 在 inner 元素上设置 x 轴上的运动
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
          inner.style.transform = `translate3d(${x}px, 0, 0)`;
        }
      }
    },

    enter(el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight; // 手动重绘

      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)';
        el.style.transform = 'translate3d(0, 0, 0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0, 0, 0)';
        inner.style.transform = 'translate3d(0, 0, 0)';
      });
    },

    afterEnter(el) {
      let ball = this.dropBalls.shift();

      if (ball) {
        ball.show = false; // 小球动画结束后重置小球的状态
        el.style.display = 'none';
      }
    }
  }
};
</script>

<style lang="stylus" type="stylesheet/stylus">
  .shopcart
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    z-index: 50;
    .content-wrapper
      display: flex;
      background: #141d27;
      color: rgba(255, 255, 255, 0.4);
      .content-left
        flex: 1;
        font-size: 0;
        .cart-wrapper
          display: inline-block;
          position: relative;
          top: -10px;
          margin: 0 12px;
          width: 56px;
          height: 56px;
          padding: 6px;
          box-sizing: border-box;
          background: #141d27;
          vertical-align: top;
          border-radius: 50%;
          .cart
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #2b343c;
            text-align: center;
            &.highlight
              background: rgb(0, 160, 220);
            .icon-shopping_cart
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
              &.highlight
                color: rgb(255, 255, 255);
          .total-count
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            font-size: 10px;
            font-weight: 700;
            color: #fff;
            background: rgb(240, 20, 20);
            border-radius: 12px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        .total-price
          display: inline-block;
          height: 24px;
          line-height: 24px;
          vertical-align: top;
          margin: 12px 0;
          padding-right: 12px;
          box-sizing: border-box;
          font-size: 16px;
          font-weight: 700;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          &.highlight
            color: rgb(255, 255, 255);
        .delivery-price
          display: inline-block;
          height: 48px;
          line-height: 48px;
          vertical-align: top;
          margin:0 12px;
          font-size: 10px;
      .content-right
        flex: 0 0 105px;
        background: #2b343c;
        &.enough
          background: #00b43c;
          color: rgb(255, 255, 255);
        .pay
          height: 48px;
          line-height: 48px;
          text-align: center;
          margin: 0 8px;
          font-size: 12px;
          font-weight: 700;
    .ball-container
      .ball
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s linear;
</style>

