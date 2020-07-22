const getters = {
  getUser(state) {
    if (!state.userInfo) {
      state.userInfo = JSON.parse(localStorage.getItem('ZY_USER_INFO'))
    }
    return state.userInfo
  },
  getToken(state) {
    if (!state.userToken) {
      state.userToken = localStorage.getItem('ZY_USER_TOKEN')
    }
    return state.userToken
  },
  isLogin(state) {
    if (!state.userToken) {
      state.userToken = localStorage.getItem('ZY_USER_TOKEN')
    }
    if (state.userToken) {
      return true
    }
    return false
  }
}

export default getters
