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

export default {
  name: 'Collection',
  props: ['id'],
  data() {
    return {
      collectList: [],
      idForUrl: ''
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
        })
    },
    handleDblClick(row) {
      req(`/song/url?id=${row.id}`)
        .then(res => {
          const audio = new Audio()
          audio.src = res.data.data[0].url
          audio.play()
          this.$store.commit('play')
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
