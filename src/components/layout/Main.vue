<template>
  <div id="main">
    <aside>
      <ul>
        <li
          class="out"
          :class="{'height_auto':listIsActive.mine}"
          @click="listIsActive.mine ? listIsActive.mine = false : listIsActive.mine = true"
        >
          created list
          <i v-show="!listIsActive.mine" class="el-icon-arrow-right" />
          <i v-show="listIsActive.mine" class="el-icon-arrow-down" />
          <ul v-show="listIsActive.mine">
            <li v-for="(i,index) in songList" :key="index" class="in">{{ i.name }}</li>
          </ul>
        </li>
        <li
          class="out"
          :class="{'height_auto':listIsActive.collect}"
          @click="listIsActive.collect ? listIsActive.collect = false : listIsActive.collect = true"
        >
          collect list
          <i v-show="!listIsActive.collect" class="el-icon-arrow-right" />
          <i v-show="listIsActive.collect" class="el-icon-arrow-down" />
          <ul v-show="listIsActive.collect">
            <li v-for="(i,index) in collectList" :key="index" class="in">{{ i.name }}</li>
          </ul>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import req from '@/utils/request.js'

export default {
  data() {
    return {
      songList: [],
      collectList: [],
      listIsActive: {
        mine: false,
        collect: false
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      req(`/user/playlist?uid=${this.$store.getters.getUser.userId}`).then(
        res => {
          this.songList = res.data.playlist.filter(item => {
            return !item.subscribed
          })
          this.collectList = res.data.playlist.filter(item => {
            return item.subscribed
          })
        }
      )
    }
  }
}
</script>

<style lang='less' scoped>
#main {
  width: 100%;
  height: calc(100% - 90px);
  background: rgba(0, 0, 0, 0.1);
}
aside {
  width: 150px;
  height: 100%;
  border-right: 1px solid #ccc;
  user-select: none;
  ul {
    width: 100%;
    height: 100%;
    list-style: none;
    li.out {
      height: 25px;
      line-height: 25px;
      text-indent: 10px;
      font-size: 12px;
      i {
        float: right;
        margin-top: 8px;
        margin-right: 8px;
      }
    }
    li.in {
      height: 30px;
      line-height: 30px;
      text-indent: 20px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 20px;
    }
    li.in:hover{
        opacity: 0.6;
    }
  }
}
.height_auto {
  height: auto !important;
}
</style>
