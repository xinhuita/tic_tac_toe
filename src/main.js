import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'

import axios from 'axios'
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://192.168.56.101:3000/'  // needs to be replaced
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
