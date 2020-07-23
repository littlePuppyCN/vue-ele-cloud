
const audio = {
  music: new Audio(),
  curSrc: '',
  play: function(src) {
    // 如果有src就暂停
    if (this.music.src) {
      this.music.pause()
    }
    // 如果当前是暂停 就把src赋值给当前的暂停路径
    if (this.curSrc !== '') {
      this.music.src = this.curSrc
      this.curSrc = ''
    } else {
      this.music.src = src
    }
    this.music.play()
  },
  pause: function() {
    this.curSrc = this.music.src
    this.music.pause()
  }
}

export default audio
