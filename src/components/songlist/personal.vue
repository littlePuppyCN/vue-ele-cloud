<template>
  <div>personal</div>
</template>

<script>
import req from '@/utils/request.js'
export default {
  name: 'Personal',
  created() {
    this.getPersonal()
  },
  methods: {
    getPersonal() {
      req(`/personal_fm`)
        .then(res => {
          return res
        })
    }
  }
}
</script>

<style lang='less' scoped>

</style>
