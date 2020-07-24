<template>
  <div id="header_wrap">
    <div class="left">
      <div class="name">PLR</div>
      <div class="search_wrap">
        <input type="text" class="search">
      </div>
    </div>
    <div class="right">
      <div class="userinfo">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <span class="userImg">
              <img :src="$store.getters.getUser.avatarUrl" alt="">
            </span>
            {{ $store.getters.getUser.nickname }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="$store.getters.isLogin" @click.native="logout">log out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import req from '@/utils/request.js'
import audio from '@/utils/audio.js'
export default {
  methods: {
    logout() {
      req('/logout').then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: 'logout success',
            type: 'success',
            duration: 800,
            onClose: () => {
              this.$store.commit('delToken')
              this.$store.commit('delUser')
              this.$store.commit('pause')
              audio.pause()
              this.$router.push('/')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang='less'>
#header_wrap{
    width: 100%;
    height: 50px;
    background: rgba(0,0,0,0.2);
    line-height: 50px;
    display: flex;
    box-sizing: border-box;
    .left{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        .search{
          width: 200px;
          height: 24px;
          border-radius: 10px;
          outline: none;
          border: none;
          background: rgba(0,0,0,0.1);
          text-indent: 20px;
        }
        .name{
            margin-left: 10px;
        }
    }
    .right{
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .el-dropdown-link{
            display: flex;
            align-items: center;
        }
        .userImg{
            width: 30px;
            height: 30px;
            display: inline-block;
            img{
                width: 100%;
                height: 100%;
                display: block;

            }
        }
    }

}
</style>
