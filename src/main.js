import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/icon/iconfont.css'

Vue.use(Element)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')