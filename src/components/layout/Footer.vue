<template>
  <footer>
    <div class="button">
      <!-- <i class="el-icon-back" style="margin-right:10px;" /> -->
      <i v-show="!$store.getters.isPlay" class="el-icon-video-play" @click="handlePlay" />
      <i v-show="$store.getters.isPlay" class="el-icon-video-pause" @click="handlePlay" />
      <i class="el-icon-right" style="margin-left:10px;" @click="next" />
    </div>
    <div class="progress">
      <div class="out" @click="handleDur($event)">
        <div class="in" :style="{'width':progress.width + 'px'}" />
      </div>
    </div>
    <div class="vocal">
      <i class="el-icon-headset" />
      <div ref="vacalOut" class="vacalProgress" @click="handleVolume($event)">
        <div ref="vacalIn" :style="{'width':progress.left + 'px'}" class="inner" />
      </div>
    </div></footer>
</template>

<script>
import audio from '@/utils/audio.js'
export default {
  data() {
    return {
      playing: false,
      progress: {
        left: '',
        width: ''
      }
    }
  },
  mounted() {
    this.handleProgress()
  },
  methods: {
    handleDur(e) {
      this.progress.width = e.offsetX
      var val = (e.offsetX / 100 / 3).toFixed(2)

      audio.duration(val)
    },
    handleProgress() {
      var _this = this
      audio.song.addEventListener('timeupdate', function() {
        var cur_time
        var per
        var dur = this.duration.toFixed(2)
        cur_time = this.currentTime.toFixed(2)
        per = cur_time / dur * 100 * 3
        _this.progress.width = per
      })
    },
    handlePlay() {
      if (this.$store.getters.isPlay) {
        audio.pause()
        this.$store.commit('pause')
      } else {
        audio.play()
        this.$store.commit('play')
      }
    },
    handleVolume(e) {
      this.progress.left = e.offsetX
      e.offsetX > 50 ? e.offsetX + 100 : e.offsetX - 100
      audio.volume(e.offsetX / 100)
    },
    next() {
      var cSong = this.$store.getters.getCurList
      var urls = JSON.parse(localStorage.getItem('SONG_URLS'))
      var random = Math.floor(Math.random() * urls.length)
      for (var i = 0; i < cSong.length; i++) {
        if (cSong[i].id === urls[random].id) {
          this.$store.commit('activeSong', cSong[i])
        }
      }
      audio.play(urls[random].url)
    }
  }
}
</script>

<style lang='less' scoped>
    footer{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        .button{
          flex: 1;
          padding-left:18px;
        }
        .progress{
          flex: 3;
          .out{
            width: 300px;
            height: 4px;
            border-radius: 4px;
            background: rgba(0,0,0,.3);
            position: relative;
            .in{
              position: absolute;
              left: 0;
              right: 10px;
              top: 0;
              width: 0px;
              border-radius: 4px;
              background: red;
              height: 4px;
              opacity: .8;
            }
          }
        }
        .vocal{
          flex: 2;
          display: flex;
          align-items: center;
          .vacalProgress{
            width: 100px;
            height: 4px;
            border-radius: 4px;
            background: rgba(0,0,0,.3);
            position: relative;
            cursor: pointer;
            .inner{
              position: absolute;
              left: 0;
              right: 10px;
              top: 0;
              width: 50px;
              border-radius: 4px;
              background: red;
              height: 4px;
              opacity: .8;
            }
          }
        }
    }
</style>
