import axios from 'axios'
export default {
  install: function (Vue) {
    Vue.prototype.$account = {
      day: null,
      getDay: async function () {
        if (!this.day) {
          let data = await axios.get('http://www.crean.top/pocket/data/2019/6/wxj/day.json')
          this.day = data.data
        }
        return this.day
      },
      reply: null,
      getREPLY: async function () {
        if (!this.reply) {
          let data = await axios.get('http://www.crean.top/pocket/data/2019/6/wxj/reply.json')
          this.reply = data.data
        }
        return this.reply
      },
      gift: null,
      getGIFT: async function () {
        if (!this.gift) {
          let data = await axios.get('http://www.crean.top/pocket/data/2019/6/wxj/gift.json')
          this.gift = data.data
        }
        return this.gift
      },
      week: null,
      getWeek: async function () {
        if (!this.week) {
          let data = await axios.get('http://www.crean.top/pocket/data/2019/6/wxj/weekData.json')
          this.week = data.data
        }
        return this.week
      },
      idlist: null,
      getIdlist: async function () {
        if (!this.idlist) {
          let data = await axios.get('http://www.crean.top/pocket/data/2019/6/wxj/idlist.json')
          this.idlist = data.data
        }
        return this.idlist
      }
    }
  }
}
