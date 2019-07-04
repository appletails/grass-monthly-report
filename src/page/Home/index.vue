<template>
  <div class="echart">
    <div class="left" v-if="reply.length">
      <Lines :data="reply.filter((item,i) => i<40)" title="口袋翻牌" sTitle="仅显示前40位的聚聚" c="次" />
    </div>
    <div class="center">
      <div class="msg">
        <div class="cont">
          <p class="title">
            来看看这个月的统计吧~
          </p>
          <ul>
            <li>你这个月在口袋总共发了<span>{{allMsgNum}}</span>条消息</li>
            <li><span>{{data.man[1].dataTime[0] | datetamp}}</span>这天你似乎心事重重，<span>晚上{{data.man[1].dataTime[1] | timestamp}}</span>还在口袋逗留</li>
            <li><span>{{data.man[0].dataTime[0] | datetamp}}</span>这天应该蛮重要吧，<span>早上{{data.man[0].dataTime[1] | timestamp}}</span>你就开始营业了</li>
            <li><span>{{maxDay.name | datetamp}}</span>是你最想念粉丝的一天了，这天你在口袋发了<span>{{maxDay.value}}</span>条消息</li>
            <li>这个月共有<span>{{data.idlist}}</span>个粉丝来你的口袋走动了，总共留下了<span>{{data.allNumber - allMsgNum}}</span>条消息</li>
            <li v-if="reply.length">这个月共有<span>{{reply.length}}</span>个粉丝被翻牌了，翻牌率高达<span>{{reply.length/data.idlist | cent}} ！</span></li>
            <li v-if="gift.length">这个月共有<span>{{gift.length}}</span>个粉丝通过口袋房间支持了你<span>{{allGiftNum}}</span>票，干巴爹！</li>
          </ul>
          <div v-if="gift.length"><span class="lukey">爱之深：{{gift.length?gift[0].name:0}}</span><span>投票最多的聚聚</span></div>
          <div v-if="reply.length"><span class="lukey">小锦鲤：{{reply.length?reply[0].name:0}}</span><span>被翻牌最多的聚聚</span></div>
          <div><span class="lukey">痴情人：{{idlist.length?idlist[0].name:0}}</span><span>口袋留言最多的聚聚</span></div>
        </div>
        <Bar class="bar" :gifts="gift" :replys="reply"/>
      </div>
      <div class="pie">
        <Pie />
      </div>
    </div>
    <div class="right" v-if="gift.length">
      <Lines :data="gift.filter((item,i) => i<40)" title="口袋投票" sTitle="仅显示前40位的聚聚" c="票" />
    </div>
  </div>
</template>

<script>
import Pie from '@/components/echarts/Pie'
import Bar from '@/components/echarts/Bar'
import Lines from '@/components/echarts/Lines'
import { datetamp, timestamp, cent } from '@/filters'
export default {
  components: {
    Pie,
    Bar,
    Lines
  },
  filters: {datetamp, timestamp, cent},
  data () {
    return {
      addF: false,
      // 每天留数量的list
      allInfo: [],
      // 所有翻牌
      reply: [],
      // 所有图片
      images: [],
      // 每天的消息
      day: [],
      // 其他消息
      data: {
        man: [
          {dataTime: ['', '']},
          {dataTime: ['', '']}
        ]
      },
      // 所有的投票
      gift: [],
      idlist: []
    }
  },
  async created () {
    this.gift = await this.$account.getGIFT()
    this.reply = await this.$account.getREPLY()
    this.day = await this.$account.getDay()
    this.data = await this.$account.getWeek()
    this.idlist = await this.$account.getIdlist()
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
.echart {
  height: 100%;
  .flex;
  .left {
    width: 18%;
    height: 100%;
  }
  .center {
    min-width: calc(64% - 20px);
    height: 100%;
    margin: 0 10px;
    flex: 1;
    .msg {
      height: calc(50% - 10px);
      width: 100%;
      .flex;
      .bar {
        width: 47%;
      }
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
    }
    .pie {
      height: calc(50%);
      margin-top: 10px;
    }
  }
  .right {
    width: 18%;
    height: 100%;
  }
}
</style>
