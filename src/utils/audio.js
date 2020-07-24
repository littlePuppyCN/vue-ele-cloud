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
}

Play.prototype.pause = function() {
  this.song.pause()
}

Play.prototype.isEnded = function() {
  return this.song.ended
}

Play.prototype.volume = function(v) {
  this.song.volume = v
}

const music = new Play()
music.song.addEventListener('ended', function() {
  console.log('music is ended')
}, false)

export default music
