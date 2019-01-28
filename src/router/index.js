import Vue from 'vue';
import Router from 'vue-router';
import goods from '../components/goods/goods.vue';
import ratings from '../components/ratings/ratings.vue';
import seller from '../components/seller/seller.vue';

Vue.use(Router);

/**
 * 定义路由
 * 每个路由应该映射一个组件。 其中"component" 可以是
 * 通过 Vue.extend() 创建的组件构造器，
 * 或者，只是一个组件配置对象.
 * 我们晚点再讨论嵌套路由
 */
const routes = [
  {
    path: '/goods',
    component: goods
  },
  {
    path: '/ratings',
    component: ratings
  },
  {
    path: '/seller',
    component: seller
  }
];

// 创建 Router 实例，然后传入 routes 配置
export default new Router({
  routes,
  linkActiveClass: 'active'
});
