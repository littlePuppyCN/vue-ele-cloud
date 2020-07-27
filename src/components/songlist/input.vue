<template>
  <div class="input">
    <el-table
      :data="result"
      border
      height="100%"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="60"
      />
      <el-table-column
        label="ctl"
        width="60"
        class="selected"
      >
        <template slot-scope="scope">
          <i class="el-icon-collection-tag" :class="{'color':ifExist(scope.row.id)}" @click="handleLike(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="120"
      />
      <el-table-column
        prop="artists[0].name"
        label="Singer"
      />
      <el-table-column
        prop="album.name"
        label="Album"
        width="120"
      />
      <el-table-column
        prop="duration"
        label="Time"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: ['result'],
  data() {
    return {
      colorSelected: []
    }
  },
  computed: {
    handleDur() {
      this.result.forEach(i => {
        var t = this.$time(i.duration)
        i.duration = t
      })
      return this.result
    },
    ifExist: function() {
      return function(val) {
        return this.colorSelected.includes(val)
      }
    }
  },
  watch: {
    handleDur: {
      deep: true,
      handler: function(newVa, old) {
        this.result.duration = old
      }
    }
  },
  methods: {
    handleLike(val) {
      if (this.ifExist(val.id)) {
        var index = this.colorSelected.indexOf(val.id)
        this.colorSelected.splice(index, 1)
      } else {
        this.colorSelected.push(val.id)
      }
    }
  }

}
</script>

<style lang='less' scoped>
.input{
  max-width: 100%;
  height: 100%;
  overflow: hidden;
  .el-icon-collection-tag{
      cursor: pointer;
  }
  .el-table{
    font-size: 12px;
    background: rgba(0,0,0,0.1)!important;
  }
  /deep/.el-table th{
    background: rgba(0,0,0,0.1)!important;
  }
}
.color{
    color: red;
}
</style>
