import Vue from 'vue';
import Router from 'vue-router';
import goods from '../components/goods/goods.vue';
import ratings from '../components/ratings/ratings.vue';
import seller from '../components/seller/seller.vue';

Vue.use(Router);

/**
 * 定义路由
 * 每个路由都映射一个组件。 其中"component" 可以是通过 Vue.extend() 创建的组件构造* 器，或者，只是一个组件配置对象.
 */
const routes = [
  {
    path: '/',
    redirect: { // 当访问'/'时重定向到'/goods'
      name: 'goods'
    }
  },
  {
    path: '/goods', // 路由 hash 地址
    name: 'goods', // 路由名称
    component: goods // 路由对应的组件
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: ratings
  },
  {
    path: '/seller',
    name: 'seller',
    component: seller
  }
];

// 创建 Router 实例，然后传入 routes 配置
export default new Router({
  routes,
  linkActiveClass: 'active' // 选中路由后添加的 class 名
});
