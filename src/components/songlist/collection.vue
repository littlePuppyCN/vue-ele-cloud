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
        prop="mst"
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
      songId: []
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
      req(`/playlist/detail?id=${id}`)
        .then(res => {
          this.collectList = res.data.playlist.tracks
          var arr = res.data.privileges
          var emptyArr = []
          for (var i = 0; i < arr.length; i++) {
            emptyArr.push(arr[i].id)
          }
          this.songId = emptyArr.join(',')
        })
    },
    handleDblClick(row) {
      this.$emit('songName', row)
      req(`/song/url?id=${this.songId}`)
        .then(res => {
          var urls = res.data.data
          var currentSong = []
          var currentIndex = null
          // var currentSong = urls.filter((item) => {
          //   return item.id === row.id
          // })
          for (var i = 0; i < urls.length; i++) {
            if (urls[i].id === row.id) {
              currentSong = urls[i]
              currentIndex = i
            }
          }
          console.log(currentSong)
          console.log(currentIndex)
          audio.play(currentSong.url)
          this.$store.commit('play')
          audio.song.addEventListener('ended', function() {
            console.log(1)
            audio.play(urls[currentIndex + 1].url)
          }, false)
        })
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
