<template>
  <div id="header_wrap">
    <div class="left">
      <div class="name">ZY-PLAYER</div>
    </div>
    <div class="right">
      <div class="userinfo">
        <el-dropdown>
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less'>
#header_wrap{
    width: 100%;
    height: 60px;
    background: rgba(0,0,0,0.2);
    line-height: 60px;
    display: flex;
    box-sizing: border-box;
    .left{
        flex: 1;
        .name{
            margin-left: 10px;
        }
    }
    .right{
        flex: 1;
    }

}
</style>
