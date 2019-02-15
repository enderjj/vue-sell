// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import VueResource from 'vue-resource';
import App from './App';

import './common/stylus/index.styl';

Vue.config.productionTip = false;
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  data: {
    eventHub: new Vue() // 使用集中的事件处理器实现组件间的通信，通过一个空的 vue 实例实现事件处理器
  },
  template: '<App/>'
});
