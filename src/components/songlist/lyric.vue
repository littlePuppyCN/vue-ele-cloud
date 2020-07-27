<template>
  <div class="lyric">
    <pre v-show="!commentIsActive" @click="commentIsActive = true">{{ lyric }}</pre>
    <div v-show="commentIsActive" class="comments" @click="commentIsActive = false">
      <ul>
        <li v-for="(item,index) in comments" :key="index">{{ (index+1) + item.content }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import req from '@/utils/request.js'

export default {
  name: 'Lyric',
  data() {
    return {
      lyric: '',
      commentIsActive: false,
      comments: []
    }
  },
  created() {
    this.getSongLyric()
    this.getSongComment()
  },
  methods: {
    getSongLyric() {
      req(`/lyric?id=${this.$store.getters.getActiveSong.id}`)
        .then(res => {
          this.lyric = res.data.lrc.lyric
        })
    },
    getSongComment() {
      req(`/comment/music?id=${this.$store.getters.getActiveSong.id}`)
        .then(res => {
          if (res.data.code === 200) {
            this.comments = res.data.hotComments
          }
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
    position: relative;

    pre{
        width: 100%;
        margin: 5%;
        overflow-y: auto;
        font-size: 14px;
        text-align: center;
    }
    .comments{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      bottom: 0;
      overflow-y: auto;
      li{
        margin: 20px 0;
      }
    }
}
</style>
