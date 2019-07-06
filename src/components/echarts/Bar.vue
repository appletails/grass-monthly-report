 <template>
  <div id="Bar" ref="Bar" class="allbg" ></div>
</template>
<script>
import { shuffle } from '@/filters'
export default {
  name: 'Bar',
  filters: {
    shuffle
  },
  props: ['replys', 'gifts', 'addF'],
  data () {
    return {
      myChart: {}
    }
  },
  watch: {
    addF () {
      this.myChart.resize()
    }
  },
  async mounted () {
    // 实例化echarts对象
    this.myChart = this.$echarts.init(this.$refs.Bar)
    await this.draw()
    // 调用绘制图表的方法
    window.addEventListener('resize', () => {
      this.myChart.resize()
    })
  },
  methods: {
    async draw () {
      let data = await this.$account.getWeek()
      data = data.msg
      let options = {
        title: {
          text: '口袋消息',
          subtext: '当月各类消息总计',
          top: '2%',
          x: 'center',
          textStyle: {
            color: '#000'
          },
          subtextStyle: {
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>次数：{c}<br/>比重：{d}%'
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '68%'],
            data: data.map(item => Object.assign(item, { selected: true })).filter(item => item.value),
            itemStyle: {
              normal: {
                color: params => this.$color.filter((item, i) => !(i % 4))[params.dataIndex]
              }
            },
            label: {
              normal: {
                formatter: '{b}\n{c}次',
                textStyle: {
                  color: '#333'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: '#ff4747'
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
