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
import scroll from 'vue-seamless-scroll'

Vue.use(VueAxios,axios);
axios.defaults.baseURL = "http://36.26.4.82:9101";

Vue.prototype.$echarts = echarts

Vue.use(ElementUi)
Vue.use(iView);
Vue.use(scroll)//全局使用列表自动滚动插件
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
