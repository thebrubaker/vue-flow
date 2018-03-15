import Vue from 'vue';
import router from './router';
import store from './store';
import config from 'src/config/vue';

Object.assign(Vue.config, config);

Vue.directive('lock-height', {
  inserted: (el, binding, vnode) => {
    el.style.height = el.clientHeight + 'px';
    el.style.minHeight = el.clientHeight + 'px';
    el.style.maxHeight = el.clientHeight + 'px';
  }
})

export default {
  init(el, Component) {
    return new Vue({
      el,
      router,
      store,
      render: h => h(Component)
    });
  }
};
