<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab border-1px">
      <div class="tab-items">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-items">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-items">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue'; // 引入 header 组件

const ERR_OK = 0; // 响应成功码

export default {
  data() {
    return {
      seller: {} // 用于存放商家信息
    };
  },
  created: function() { // 请求 header 要显示的数据
    this.$http.get('/api/seller').then((response) => {
      response = response.body; // 将响应数据转换成 Object 对象
      if (response.errno === ERR_OK) {
        this.seller = response.data; // 将响应中的 data 数据部分赋值给 seller 对象
        console.log(this.seller);
      }
    });
  },
  components: {
    'v-header': header // 注册 header 组件
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin.styl'

#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-1px(rgba(7, 17, 27, 0.1));

    .tab-items {
      flex: 1;
      text-align: center;

      & > a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);

        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>

