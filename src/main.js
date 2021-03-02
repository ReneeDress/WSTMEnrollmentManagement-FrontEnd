import Vue from 'vue';
import ElementUI from 'element-ui';
import echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router.js'

Vue.prototype.echarts = echarts

Vue.use(ElementUI);
Vue.use(echarts);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
