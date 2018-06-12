import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './app.vue'
// import Notification from './components/notification/Notification.vue'
import Notification from './components/notification/index.js'
import createRouter from './router/router.js'
import createStore from './store/store.js'

import './assets/css/reset.css'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Notification)
const router = createRouter()
const store = createStore()

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#root')
