<template>
  <div class="echart">
    <div class="left" v-if="$store.state.reply.length">
      <Lines :data="$store.state.reply.filter((item,i) => i<40)" title="口袋翻牌" sTitle="仅显示前40位的聚聚" c="次" />
    </div>
    <div class="center">
      <div class="msg">
        <Complete />
        <Bar class="bar" />
      </div>
      <div class="pie">
        <Pie />
      </div>
    </div>
    <div class="right" v-if="$store.state.gift.length">
      <Lines :data="$store.state.gift.filter((item,i) => i<40)" title="口袋投票" sTitle="仅显示前40位的聚聚" c="票" />
    </div>
    <Dark :bg="bg"/>
  </div>
</template>

<script>
import Pie from '@/components/echarts/Pie'
import Bar from '@/components/echarts/Bar'
import Lines from '@/components/echarts/Lines'
import Complete from '@/components/Complete'
import Dark from '@/components/Dark'
import { datetamp, timestamp, cent } from '@/filters'
export default {
  components: {
    Pie,
    Bar,
    Lines,
    Complete,
    Dark
  },
  filters: {datetamp, timestamp, cent},
  data () {
    return {
      bg: ''
    }
  },
  async created () {
    this.bg = await this.$account.getBg()
  },
  watch: {
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
