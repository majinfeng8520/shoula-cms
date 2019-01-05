// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/index.css'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import VueX from 'vuex'
// import './http'
import Layout from '@/components/Layout/Layout'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
