<template>
  <div class="cont">
    <p class="title">
      来看看这个月的统计吧~
    </p>
    <ul>
      <li>你这个月在口袋总共发了<span>{{allMsgNum}}</span>条消息</li>
      <li><span>{{$store.state.week.man[1].dataTime[0] | datetamp}}</span>这天你似乎心事重重，<span>晚上{{$store.state.week.man[1].dataTime[1] | timestamp}}</span>还在口袋逗留</li>
      <li><span>{{$store.state.week.man[0].dataTime[0] | datetamp}}</span>这天应该蛮重要吧，<span>早上{{$store.state.week.man[0].dataTime[1] | timestamp}}</span>你就开始营业了</li>
      <li><span>{{maxDay.name | datetamp}}</span>是你最想念粉丝的一天了，这天你在口袋发了<span>{{maxDay.value}}</span>条消息</li>
      <li>这个月共有<span>{{$store.state.week.idlist}}</span>个粉丝来你的口袋走动了，总共留下了<span>{{$store.state.week.allNumber - allMsgNum}}</span>条消息</li>
      <li v-if="$store.state.reply.length">这个月共有<span>{{$store.state.reply.length}}</span>个粉丝被翻牌了，翻牌率高达<span>{{$store.state.reply.length/data.idlist | cent}} ！</span></li>
      <li v-if="$store.state.gift.length">这个月共有<span>{{$store.state.gift.length}}</span>个粉丝通过口袋房间支持了你<span>{{allGiftNum}}</span>票，干巴爹！</li>
    </ul>
    <div v-if="$store.state.gift.length"><span class="lukey">爱之深：{{$store.state.gift.length?$store.state.gift[0].name:0}}</span><span>投票最多的聚聚</span></div>
    <div v-if="$store.state.reply.length"><span class="lukey">小锦鲤：{{$store.state.reply.length?$store.state.reply[0].name:0}}</span><span>被翻牌最多的聚聚</span></div>
    <div v-if="$store.state.idlist.length"><span class="lukey">痴情人：{{$store.state.idlist.length?$store.state.idlist[0].name:0}}</span><span>口袋留言最多的聚聚</span></div>
  </div>
</template>
<script>
import { datetamp, timestamp, cent } from '@/filters'
export default {
  name: 'Complete',
  filters: {datetamp, timestamp, cent},
  data () {
    return {
      day: [],
      gift: []
    }
  },
  async created () {
    await this.$store.dispatch('getWeek')
    this.data = this.$store.state.week
  },
  watch: {
    '$store.state.day' () {
      this.day = this.$store.state.day
    },
    '$store.state.gift' () {
      this.gift = this.$store.state.gift
    }
  },
  computed: {
    allMsgNum () {
      if (!this.day.length) return ''
      let sum = 0
      this.day.map(item => item.value).forEach(item => {
        sum += item
        return sum
      })
      return sum
    },
    allGiftNum () {
      if (!this.gift.length) return ''
      let sum = 0
      this.gift.map(item => item.value).forEach(item => {
        sum += item
        return sum
      })
      return sum
    },
    maxDay () {
      if (!this.day.length) return ''
      let max = this.day
      return max.sort((a, b) => b.value - a.value)[0]
    }
  }
}
</script>
<style lang="less" scoped>
.cont {
  width: calc(53% - 10px);
  height: 100%;
  padding: 12px;
  font-size: 14px;
  color: #333;
  .bgcolor;
  .title{
    background-color:@primary;
    font-size: 14px;
    margin-bottom: 0;
    margin-top: 0;
    height: 10%;
    line-height: 100%;
    border-radius: 20px;
    padding-left: 20px;
    color: #fff;
    font-weight: bold;
    .flex;
    justify-content: flex-start;
  }
  ul{
    margin-left: 20px;
    height: 60%;
    li{
      .flex;
      justify-content: flex-start;
      font-size: 12px;
      height: calc(100% / 7);
      &::before{
        content: '';
        display: block;
        width: 8px;
        height: 2px;
        background-color: @primary;
        margin-right: 8px;
        border-radius: 1px;
      }
      span{
        color:@primary;
        font-weight: bold;
        font-size: 16px
      }
    }
  }
  div{
    margin-left: 0;
    font-size: 12px;
    color: #555;
    height: 10%;
    .flex;
    justify-content: flex-start;
    .lukey{
      font-size: 14px;
      color:@primary;
      font-weight: bold;
      display: block;
      height: 90%;
      background-color:#fff;
      width: 240px;
      border-radius: 12px;
      padding: 0 20px;
      margin-right: 20px;
      .flex;
      justify-content: flex-start;
      &:nth-of-type(2){
        color:#ffad6a
      }
      &:nth-of-type(3){
        color:#ffe16a
      }
    }
  }
}
</style>
