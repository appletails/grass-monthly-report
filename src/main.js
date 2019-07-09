// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import api from '@/common/api'
// 引入基本模板
import echarts from 'echarts/lib/echarts'
import store from './store'

// 引入折线图等组件
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'

// 引入提示框和title组件，图例
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/markLine'

Vue.use(api)

Vue.prototype.$echarts = echarts
const colors = () => {
  let color = []
  let global = [240, 100, 70]

  while (global[2] < 150) {
    global[1] += 4
    global[2] += 4
    color.push(`rgb(${global[0]},${global[1]},${global[2]})`)
  }
  return color
}
Vue.prototype.$color = colors()
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
