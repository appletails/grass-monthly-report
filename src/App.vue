<template>
  <div id="app" :style="{backgroundImage:bg}">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      bg: '132'
    }
  },
  async created () {
    this.bg = await this.$account.getBg()
  }
}
</script>

<style lang="less">
html{
  min-width: 1550px;
  min-height: 700px;
  width: 100%;
  height: 100%;
  background-image: url(http://www.crean.top/pocket/data/2019/6/wxj/bg.jpg);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  // background-color: @primary;
}
body{
  width: calc(100% - 16px);
  height: calc(100% - 16px);
}
ul,li{
  list-style:none;
  padding:0;
  margin: 0;
}
#app{
  width: 100%;
  height: 100%;
}
.allbg{
  width: 100%;
  height: 100%;
  padding: 10px;
  .bgcolor;
}
</style>
