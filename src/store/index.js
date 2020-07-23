import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
Vue.use(Vuex)

const state = {
  userToken: '',
  userInfo: '',
  isPlaying: false
}
export default new Vuex.Store({
  state,
  getters,
  mutations
})
