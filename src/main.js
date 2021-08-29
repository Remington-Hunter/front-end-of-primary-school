import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/icon/iconfont.css'
import './assets/css/icon1/iconfont.css'
import './assets/css/iconfont3.css'
import './assets/iconfont1'
import '@/assets/fonts/style.css'
import htmlToPdf from '@/assets/js/htmlToPdf'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
    // import Blob from './excel/Blob'
    // import Export2Excel from './excel/Export2Excel.js'
const echarts = require('echarts');
Vue.prototype.$echarts = echarts

Vue.use(htmlToPdf);
Vue.use(Element)
Vue.config.productionTip = false
    // 自动给同一个vue项目的所有请求添加请求头
    // axios.interceptors.request.use(function(config) {
    //     let token = localStorage.getItem('authorization');
    //     if (token) {
    //         config.headers['Authorization'] = token;
    //     }
    //     return config;
    // })


new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')