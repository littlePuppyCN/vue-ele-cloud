import Vue from 'vue'
function req(url) {
  return Vue.prototype.$http({
    url: url,
    withCredentials: true
  })
}

export default req
