<template>
  <div id="container">
    <div id="player">
      <HEADER />
      <MAIN />
    </div>
  </div>
</template>

<script>
import HEADER from '@/components/layout/Header'
import MAIN from '@/components/layout/Main'
export default {
  components: {
    HEADER,
    MAIN
  }
}
</script>

<style lang='less' scoped>
#container{
    width: 100%;
    height: 100%;
    display: flex;
    opacity: 0.4;
    #player{
        margin: auto;
        width: 800px;
        height: 500px;
        border: 1px solid #ccc;
    }
}
</style>
