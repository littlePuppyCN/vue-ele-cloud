<template>
  <div id="main">
    <aside>
      <ul>
        <li
          class="out"
          :class="{'height_auto':listIsActive.mine}"
          @click.self="listIsActive.mine ? listIsActive.mine = false : listIsActive.mine = true"
        >
          created list
          <i v-show="!listIsActive.mine" class="el-icon-arrow-right" />
          <i v-show="listIsActive.mine" class="el-icon-arrow-down" />
          <ul v-show="listIsActive.mine">
            <li v-for="(i,index) in songList" :key="index" class="in" @click="getSongListID(i.id)">{{ index === 0? '我喜欢的音乐' : i.name }}</li>
          </ul>
        </li>
        <li
          class="out"
          :class="{'height_auto':listIsActive.collect}"
          @click.self="listIsActive.collect ? listIsActive.collect = false : listIsActive.collect = true"
        >
          collect list
          <i v-show="!listIsActive.collect" class="el-icon-arrow-right" />
          <i v-show="listIsActive.collect" class="el-icon-arrow-down" />
          <ul v-show="listIsActive.collect">
            <li v-for="(i,index) in collectList" :key="index" class="in" @click="getSongListID(i.id)">{{ i.name }}</li>
          </ul>
        </li>
        <li class="out" @click="$router.push('/personal')">FM</li>
        <li id="bottom" @click="pushToLyric">Now: {{ $store.getters.getActiveSong?$store.getters.getActiveSong.name : '' }}</li>

      </ul>
    </aside>

    <div id="view">
      <transition name="bounce">
        <router-view :id="listID" :result="searchRes" />
      </transition>
    </div>
  </div>
</template>

<script>
import req from '@/utils/request.js'
import bus from '@/utils/eventBus.js'
export default {
  data() {
    return {
      songList: [],
      collectList: [],
      listIsActive: {
        mine: false,
        collect: false
      },
      listID: '',
      searchRes: []
    }
  },
  // watch: {
  //   songIsActive: {
  //     handler(val, old) {
  //       console.log(val.name, old.name)
  //       this.songIsActive.name = val.name
  //     },
  //     deep: true
  //   }
  // },
  created() {
    this.getUserList()
    bus.$on('res', (val) => {
      this.searchRes = val
    })
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
    },
    getSongListID(id) {
      this.listID = id
      this.$router.push('/collection')
    },
    handleName(v) {
      this.songIsActive = v
    },
    pushToLyric() {
      this.$router.push('/lyric')
    }
  }
}
</script>

<style lang='less' scoped>
#main {
  width: 100%;
  height: calc(100% - 90px);
  background: rgba(0, 0, 0, 0.1);
  display: flex;
}
aside {
  width: 150px;
  height: 100%;
  // border-right: 1px solid #ccc;
  user-select: none;

  ul {
    width: 100%;
    height: 100%;
    list-style: none;
    position: relative;
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

    #bottom{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40px;
      border-top: 1px solid #ccc;
      display: flex;
      align-items: center;
      padding-left: 20px;
      font-size: 12px;
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

#view{
    // flex: 1;
    width: 650px;
    height: 100%;
}
.height_auto {
  height: auto !important;
}
</style>
