import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './app.vue'
// import Notification from './components/notification/Notification.vue'
// 全局组件引用
import Notification from './components/notification/index.js'
import Tabs from './components/tabs/index.js'

import createRouter from './router/router.js'
import createStore from './store/store.js'

import './assets/css/reset.css'

Vue.use(VueRouter)
Vue.use(Vuex)

Vue.use(Notification)
Vue.use(Tabs)
const router = createRouter()
const store = createStore()

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#root')
