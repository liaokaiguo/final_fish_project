// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'

import ElementUi from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import echarts from 'echarts';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios);
axios.defaults.baseURL = "http://172.16.55.118:8080";// 外网映射后端地址
// axios.defaults.baseURL = "http://192.168.43.40:8080";

Vue.prototype.$echarts = echarts

Vue.use(ElementUi)
Vue.use(iView);

Vue.config.productionTip = false

//Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
