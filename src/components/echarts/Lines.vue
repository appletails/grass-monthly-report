 <template>
  <div id="Lines" ref="Lines" class="allbg"></div>
</template>
<script>
import { shuffle } from '@/filters'
export default {
  name: 'Lines',
  filters: {
    shuffle
  },
  props: ['data', 'title', 'sTitle', 'c'],
  data () {
    return {
      myChart: {}
    }
  },
  methods: {
    strlen (str) {
      let len = 0
      for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i)
        // 单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
          len++
        } else {
          len += 2
        }
      }
      return len
    },
    async draw () {
      let data = this.data
      let options = {
        title: {
          text: this.title,
          subtext: this.sTitle,
          top: 20,
          left: 20,
          textStyle: {
            color: '#000'
          },
          subtextStyle: {
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: `{b}<br />{c}${this.c}`
        },
        grid: {
          left: '20',
          right: '30',
          bottom: '0',
          top: 80,
          containLabel: true
        },
        xAxis: {
          show: false
        },
        yAxis: {
          type: 'category',
          inverse: true,
          data: data.map(item => item.name),
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: (value, i) => {
              return this.strlen(value) > 10
                ? value.substr(0, 5) + '...'
                : value
            }
          }
        },
        series: [
          {
            type: 'bar',
            data: data.map(item => item.value),
            label: {
              normal: {
                show: true,
                position: 'right'
              }
            },
            itemStyle: {
              normal: {
                color: params => this.$color[params.dataIndex]
              }
            }
          }
        ]
      }

      // 实例化echarts对象
      this.myChart = this.$echarts.init(this.$refs.Lines)
      // 绘制条形图
      this.myChart.setOption(options)
    }
  },
  async mounted () {
    // 调用绘制图表的方法
    await this.draw()
    window.addEventListener('resize', () => {
      this.myChart.resize()
    })
  }
}
</script>
