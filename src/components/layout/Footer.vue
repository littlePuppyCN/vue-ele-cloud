<template>
  <footer>
    <div class="button">
      <i v-show="!playing" class="el-icon-video-play" @click="playing = true" />
      <i v-show="playing" class="el-icon-video-pause" @click="playing = false" />
      <i class="el-icon-right" style="margin-left:10px;" />
    </div>
    <div class="progress">2</div>
    <div class="vocal">3</div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      playing: false
    }
  }
}
</script>

<style lang='less' scoped>
    footer{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        .button{
          flex: 1;
          padding-left:18px;
        }
        .progress{
          flex: 4;
        }
        .vocal{
          flex: 2;
        }
    }
</style>
