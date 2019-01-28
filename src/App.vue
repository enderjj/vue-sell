<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
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
export default {
  components: {
    'v-header': header // 注册 header 组件
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;

    .tab-items {
      flex: 1;
      text-align: center;

      & > a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.active {
          color: rgb(240,20,20);
        }
      }
    }
  }
}
</style>

