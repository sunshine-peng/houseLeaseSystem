// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import axios from './axiosServer/http'
import axios from 'axios'
import date from '../src/timeFomat/dateFomat'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
axios.defaults.baseURL ='/' 
Vue.config.productionTip = false

Vue.prototype.date = date

Vue.use(ElementUI);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
