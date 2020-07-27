import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './assets/http/http.js'
import '@/assets/css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$http = http
Vue.prototype.$time = function(mss) {
  // var days = parseInt(mss / (1000 * 60 * 60 * 24))
  // var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = parseInt((mss % (1000 * 60)) / 1000)
  minutes < 10 ? '0' + minutes : minutes
  seconds < 10 ? '0' + seconds : seconds
  return minutes + ' : ' + seconds
}
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
