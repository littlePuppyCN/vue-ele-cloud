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
  },
  play(state) {
    state.isPlaying = true
  },
  pause(state) {
    state.isPlaying = false
  },
  activeSong(state, song) {
    state.activeSong = song
    localStorage.setItem('ACTIVE_SONG', JSON.stringify(song))
  },
  curSongList(state, list) {
    state.curSongList = list
    localStorage.setItem('CUR_LIST', JSON.stringify(list))
  }
}

export default mutations
