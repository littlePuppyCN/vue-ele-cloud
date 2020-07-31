<template>
  <div class="lyric">
    <pre v-show="!commentIsActive" @click.stop.prevent="commentIsActive = true">{{ lyric?lyric:'纯音乐' }}</pre>
    <div v-show="commentIsActive" class="comments" @click.stop.prevent="commentIsActive = false">
      <ul class="hot">
        <li v-for="(item,index) in comments.hotComments" :key="index">
          {{ (index+1) + item.content }}
          <span style="font-size:12px;">{{ item.likedCount }}</span>
        </li>
      </ul>
      <ul class="origin">
        <li v-for="(item,index) in comments.comments" :key="index">
          {{ (index+1) + item.content }}
        </li>
      </ul>

    </div>
    <!-- <el-input v-model="addCom" placeholder="put comments here" />
    <i class="el-icon-search" @click="addComments" /> -->

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
      comments: [],
      addCom: ''
    }
  },
  watch: {
    '$store.state.activeSong'(val) {
      this.getSongLyric()
      this.getSongComment()
    }
  },
  created() {
    this.getSongLyric()
    this.getSongComment()
  },
  methods: {
    getSongLyric() {
      req(`/lyric?id=${this.$store.getters.getActiveSong.id}`).then((res) => {
        if (res.data.lrc.lyric.length === 0) {
          return
        } else {
          this.lyric = res.data.lrc.lyric
        }
      })
    },
    getSongComment(val) {
      req(`/comment/music?id=${this.$store.getters.getActiveSong.id}&limit=10`).then(
        (res) => {
          if (res.data.code === 200) {
            this.comments = res.data
          }
        }
      )
    },
    addComments() {
      req(`/comment?t=1&type=0&id=${this.$store.getters.getActiveSong.id}&content=${this.addCom}`)
        .then(res => {
          console.log(res)
        })
    }

  }
}
</script>

<style lang='less' scoped>
.lyric {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  position: relative;
  transform: translate(0,0);
  pre {
    width: 100%;
    margin: 5%;
    overflow-y: auto;
    font-size: 14px;
    text-align: center;
  }
  .comments {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    ul{
      height: 50%;
      overflow-y: auto;
    }
    ul.origin{
      height: 40%;
    }
    li {
      margin: 20px 0;
    }
  }
  .el-icon-search{
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
  .el-input{
    position: fixed;
    bottom: 0px;

    /deep/.el-input__inner{
      border: none;
      outline: none;
    }
  }
}
</style>
