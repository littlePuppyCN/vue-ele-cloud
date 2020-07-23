<template>
  <footer>
    <div class="button">
      <i v-show="!$store.getters.isPlay" class="el-icon-video-play" @click="handlePlay" />
      <i v-show="$store.getters.isPlay" class="el-icon-video-pause" @click="handlePlay" />
      <i class="el-icon-right" style="margin-left:10px;" />
    </div>
    <div class="progress">2</div>
    <div class="vocal">3</div>
  </footer>
</template>

<script>
import audio from '@/utils/audio.js'
export default {
  data() {
    return {
      playing: false
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
          flex: 4;
        }
        .vocal{
          flex: 2;
        }
    }
</style>
