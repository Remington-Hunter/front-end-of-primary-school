import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexAlong({
    name: 'vuex-along',
    local: {
        list: [],
        // 填写需要的内容
        isFilter: true
    },
    session: false
})]
// plugins: [
//   createVuexAlong({
//     name: "hello-vuex-along", // 设置保存的集合名字，避免同站点下的多项目数据冲突
//     local: {
//       list: ["ma"],
//       isFilter: true // 过滤模块 ma 数据， 将其他的存入 localStorage
//     },
//     session: {
//       list: ["count", "ma.a1"] // 保存 count 和模块 ma 中的 a1 到 sessionStorage
//     }
//   })
// ]

})
