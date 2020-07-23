<template>
  <div id="collection">
    <el-table
      :data="collectList"
      border
      style="width: 100%"
    >
      <el-table-column
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
        prop="ar.name"
        label="Singer"
      />
      <el-table-column
        prop="ar.name"
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
      collectList: []
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
    }
  }
}
</script>

<style lang='less' scoped>
#collection{
  width: 100%;
  height: 100%;
  .el-table{
    font-size: 12px;
    background: rgba(0,0,0,0.1)!important;
  }
  /deep/.el-table th{
    background: rgba(0,0,0,0.1)!important;
  }
}
</style>
