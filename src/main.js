import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
Vue.config.productionTip = false

window.$rootVue = new Vue({
  render: h => h(App),
  router,
  data:{
    currentRoutePath:'',
  }
}).$mount('#app');
window.gVueInterceptor = false;
