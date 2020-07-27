<template>
  <div class="lyric">
    <pre>{{ lyric }}</pre>
  </div>
</template>

<script>
import req from '@/utils/request.js'

export default {
  name: 'Lyric',
  data() {
    return {
      lyric: ''
    }
  },
  created() {
    this.getSongLyric()
  },
  methods: {
    getSongLyric() {
      req(`/lyric?id=${this.$store.getters.getActiveSong.id}`)
        .then(res => {
          this.lyric = res.data.lrc.lyric
        })
    }
  }
}
</script>

<style lang='less' scoped>
.lyric{
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    // justify-content: center;
    // align-items: center;
    pre{
        width: 100%;
        margin: 5%;
        overflow-y: auto;
        font-size: 14px;
        text-align: center;
    }
}
</style>
