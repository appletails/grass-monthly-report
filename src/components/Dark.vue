<template>
  <div v-if="show" class="password">
    <div class="pic" :style="{backgroundImage:`url(${bg})`}"></div>
    <input type="text" placeholder="请输入暗号查看全部内容" @keydown="postDark" v-model="password">
    <p @click="showAll">查看全部</p>
    <p class="nopass" @click="show = false">只看部分</p>
  </div>
</template>
<script>
import { datetamp, timestamp, cent } from '@/filters'
export default {
  name: 'Dark',
  filters: {datetamp, timestamp, cent},
  data () {
    return {
      password: '',
      show: true
    }
  },
  props: ['bg'],
  methods: {
    async postDark (e) {
      if (e.keyCode === 13) await this.showAll()
    },
    async showAll () {
      if (!this.password) {
        alert('请输入暗号')
        return
      }
      let response = await this.$account.getDarkNum(this.password)
      if (!response.data) {
        alert(response.msg)
        return
      }
      await this.$store.dispatch('getGift')
      await this.$store.dispatch('getReply')
      await this.$store.dispatch('getIdlist')
      this.show = false
    }
  }
}
</script>
<style lang="less" scoped>
.password{
  position: fixed;
  width: 300px;
  // height: 450px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(56, 56, 56, 0.233);
  border-radius: 8px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding:10px;
  .pic{
    height: 160px;
    width: 100%;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 8px;
    margin-bottom: 10px;
    background-color: @primary;
  }
  input{
    width: 100%;
    padding: 4px 15px;
    border-radius: 8px;
    line-height: 40px;
    border:1px solid #b9b9b9;
  }
  input:focus{
    outline: none;
  }
  p{
    width: 100%;
    text-align: center;
    border-radius: 8px;
    background-color: @primary;
    padding: 10px 0;
    color: #fff;
    cursor: pointer;
    margin: 10px 0;
  }
  .nopass{
    background-color: transparent;
    padding: 0;
    color:#9e9e9e;
    font-size: 12px;
    margin: auto;
    border-bottom:1px solid #9e9e9e;
    width: 60px;
    padding-bottom: 4px;
    border-radius: 0;
  }
}
</style>
