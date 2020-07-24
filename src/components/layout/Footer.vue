<template>
  <footer>
    <div class="button">
      <i class="el-icon-back" style="margin-right:10px;" />
      <i v-show="!$store.getters.isPlay" class="el-icon-video-play" @click="handlePlay" />
      <i v-show="$store.getters.isPlay" class="el-icon-video-pause" @click="handlePlay" />
      <i class="el-icon-right" style="margin-left:10px;" />
    </div>
    <div class="progress">2</div>
    <div class="vocal">
      <i class="el-icon-headset" />
      <div ref="vacalOut" class="vacalProgress" @click="handleVolume">
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
        left: ''
      }
    }
  },
  methods: {
    handlePlay() {
      if (this.$store.getters.isPlay) {
        audio.pause()
        this.$store.commit('pause')
      } else {
        audio.play()
        this.$store.commit('play')
      }
    },
    handleVolume() {
      // audio.volume(-0.5)
      this.$refs.vacalOut.onmousedown = (e) => {
        this.progress.left = e.offsetX
      }
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
