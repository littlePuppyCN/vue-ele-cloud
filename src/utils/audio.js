import store from '@/store'
var Play = function() {
  this.song = new Audio()
}

Play.prototype.play = function(src) {
  if (src) {
    this.song.src = src
    this.song.play()
  } else {
    this.song.play()
  }
  this.isEnded()
}

Play.prototype.pause = function() {
  this.song.pause()
}

Play.prototype.isEnded = function() {
  var random
  var urls = JSON.parse(localStorage.getItem('SONG_URLS'))
  var curList = store.getters.getCurList

  this.song.addEventListener('ended', () => {
    random = Math.floor(Math.random() * urls.length)
    var newArr = curList.filter((i) => {
      return i.id === urls[random].id
    })
    store.commit('activeSong', newArr[0])

    this.play(urls[random].url)
  })
}

Play.prototype.volume = function(v) {
  this.song.volume = v
}

const music = new Play()

export default music
