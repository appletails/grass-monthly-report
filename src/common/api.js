import axios from 'axios'
// 返回后拦截
axios.interceptors.response.use(
  data => {
    return data
  },
  err => {
    alert(`请求出错：${err}`)
  }
)
export default {
  install: function (Vue) {
    Vue.prototype.$account = {
      month: this.$router,
      idol: 'wxj',
      day: null,
      getDay: async function () {
        if (!this.day) {
          let data = await axios.get(`http://www.crean.top/pocket/data/2019/6/${this.idol}/day.json`)
          this.day = data.data
        }
        return this.day
      },
      reply: null,
      getREPLY: async function () {
        if (!this.reply) {
          let data = await axios.get(`http://www.crean.top/pocket/data/2019/6/${this.idol}/reply.json`)
          this.reply = data.data
        }
        return this.reply
      },
      gift: null,
      getGIFT: async function () {
        if (!this.gift) {
          let data = await axios.get(`http://www.crean.top/pocket/data/2019/6/${this.idol}/gift.json`)
          this.gift = data.data
        }
        return this.gift
      },
      week: null,
      getWeek: async function () {
        if (!this.week) {
          let data = await axios.get(`http://www.crean.top/pocket/data/2019/6/${this.idol}/weekData.json`)
          this.week = data.data
        }
        return this.week
      },
      idlist: null,
      getIdlist: async function () {
        if (!this.idlist) {
          let data = await axios.get(`http://www.crean.top/pocket/data/2019/6/${this.idol}/idlist.json`)
          this.idlist = data.data
        }
        return this.idlist
      },
      getDarkNum: async function (password) {
        let data = await axios.post('http://172.81.250.91:82/getDarkNum', {password: password})
        return data.data
      },
      getBg: async function () {
        let url = `http://www.crean.top/pocket/data/2019/6/${this.idol}/bg.jpg`
        let data = await axios.get(url)
        if (!data) {
          return url
        }
        return data.config.url
      }
    }
  }
}
