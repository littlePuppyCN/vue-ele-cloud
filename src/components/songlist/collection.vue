<template>
  <div id="collection">
    <el-table
      :data="collectList"
      border
      height="100%"
      style="width: 100%"
      @row-dblclick="handleDblClick"
    >
      <el-table-column
        type="index"
        width="60"
      />
      <el-table-column
        label="ctl"
        width="60"
      />
      <el-table-column
        prop="name"
        label="Name"
        width="120"
      />
      <el-table-column
        prop="ar[0].name"
        label="Singer"
      />
      <el-table-column
        prop="al.name"
        label="Album"
        width="120"
      />
      <el-table-column
        prop="dt"
        label="Time"
      />
    </el-table>
  </div>
</template>

<script>
import req from '@/utils/request.js'
import audio from '@/utils/audio.js'
export default {
  name: 'Collection',
  props: ['id'],
  data() {
    return {
      collectList: [],
      songId: [],
      songUrls: []
    }
  },
  watch: {
    id: function(val, old) {
      this.getSongList(val)
    }
  },
  created() {
    this.getSongList(this.id)
  },
  methods: {
    getSongList(id) {
      if (this.id) {
        req(`/playlist/detail?id=${id}`)
          .then(res => {
            this.collectList = res.data.playlist.tracks
            this.$store.commit('curSongList', res.data.playlist.tracks)
            this.collectList.forEach((i, idx) => {
              i.dt = this.$time(i.dt)
            })
            var arr
            if (res.data.playlist.subscribed) {
              arr = res.data.playlist.tracks
            } else {
              arr = res.data.playlist.trackIds
            }
            var emptyArr = []
            for (var i = 0; i < arr.length; i++) {
              emptyArr.push(arr[i].id)
            }
            this.songId = emptyArr.join(',')
          })
      } else {
        console.log('first')
        return
      }
    },
    handleDblClick(row) {
      this.$store.commit('activeSong', row)
      req(`/song/url?id=${this.songId}`)
        .then(res => {
          this.songUrls = res.data.data
          window.localStorage.setItem('SONG_URLS', JSON.stringify(this.songUrls))
          audio.play(this.getCurrentSong(row))
          this.ifEnded()
          this.$store.commit('play')
        })
    },
    getCurrentSong(target) {
      for (var i = 0; i < this.songUrls.length; i++) {
        if (this.songUrls[i].id === target.id) {
          return this.songUrls[i].url
        }
      }
    },
    ifEnded() {
      var random
      audio.song.addEventListener('ended', () => {
        random = Math.floor(Math.random() * this.songUrls.length)
        var newArr = this.collectList.filter((i) => {
          return i.id === this.songUrls[random].id
        })
        this.$store.commit('activeSong', newArr[0])
        audio.play(this.songUrls[random].url)
      }, false)
    }
  }
}
</script>

<style lang='less' scoped>
#collection{
  max-width: 100%;
  height: 100%;
  overflow: hidden;
  .el-table{
    font-size: 12px;
    background: rgba(0,0,0,0.1)!important;
  }
  /deep/.el-table th{
    background: rgba(0,0,0,0.1)!important;
  }
}
</style>
