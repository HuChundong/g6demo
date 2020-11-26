import 'normalize.css/normalize.css'
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false
Vue.http = Vue.prototype.$http = axios
new Vue({
  render: h => h(App),
}).$mount('#app')
