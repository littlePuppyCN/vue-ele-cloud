const mutations = {
  setToken(state, token) {
    state.userToken = token
    localStorage.setItem('ZY_USER_TOKEN', token)
  },
  delToken(state) {
    state.userToken = ''
    localStorage.removeItem('ZY_USER_TOKEN')
  },
  setUser(state, user) {
    state.userInfo = user
    localStorage.setItem('ZY_USER_INFO', JSON.stringify(user))
  },
  delUser(state) {
    state.userInfo = ''
    localStorage.removeItem('ZY_USER_INFO')
  }
}

export default mutations
