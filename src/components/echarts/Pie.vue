 <template>
  <div id="Pie" ref="Pie" class="allbg"></div>
</template>

<script>
import { shuffle } from '@/filters'
export default {
  name: 'Pie',
  filters: {
    shuffle
  },
  data () {
    return {
      myChart: {},
      day: []
    }
  },
  watch: {
    '$store.state.idlist' () {
      this.myChart.resize()
    }
  },
  async mounted () {
    await this.$store.dispatch('getDay')
    this.day = this.$store.state.day
    // 实例化echarts对象
    this.myChart = this.$echarts.init(this.$refs.Pie)
    // 调用绘制图表的方法
    await this.draw()
    window.addEventListener('resize', () => {
      this.myChart.resize()
    })
  },
  methods: {
    async draw () {
      let data = this.day
      data = data.sort((a, b) => a.msgTime - b.msgTime)
      let options = {
        title: {
          text: '口袋房间留言',
          subtext: '当月每日留言次数',
          left: '20',
          top: '20',
          textStyle: {
            color: '#000'
          },
          subtextStyle: {
            color: '#333'
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '10%',
          top: 90
          // containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.map(item => item.name)
        },
        yAxis: {
          show: false
        },
        tooltip: {
          trigger: 'axis',
          formatter: `{b}<br />{c}条`
        },
        dataZoom: [
          {
            show: true,
            type: 'inside',
            start: 0,
            end: 100,
            xAxisIndex: [0]
          },
          {
            type: 'slider'
          }
        ],
        series: [
          {
            data: data.map(item => item.value),
            type: 'line',
            smooth: true,
            markPoint: {
              data: data.map((item, i) => {
                return {
                  value: item.value,
                  xAxis: i,
                  yAxis: item.value + 1,
                  itemStyle: {
                    color: '#f04646'
                  }
                }
              })
            },
            markLine: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'average', name: '平均值' },
                { type: 'min', name: '最小值' }
              ]
            },
            itemStyle: {
              normal: {
                color: '#f04646',
                lineStyle: {
                  width: 1,
                  color: '#f04646' // 改变折线颜色
                }
              }
            }
          }
        ]
      }

      // 绘制条形图
      this.myChart.setOption(options)
    }
  }
}
</script>
