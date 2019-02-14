<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="cartDecrease"></div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="cartAdd"></div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    food: { // 用于接收要选购的每个商品
      type: Object
    }
  },
  methods: {
    // 新增商品个数
    cartAdd() {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1); // 直接用 this.food.count = 1 不能被 dom 检测到，对于新增的对象属性，需要使用 Vue.set() 方法
      } else {
        this.food.count++;
      }
    },

    // 减少商品个数
    cartDecrease() {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="stylus" type="stylesheet/stylus">
  .cartcontrol
    font-size: 0;
    .cart-decrease
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    .cart-count
      display: inline-block;
      height: 36px;
      line-height: 36px;
      vertical-align: top;
      font-size: 10px;
      color: rgb(147, 153, 159);
    .cart-add
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
</style>

