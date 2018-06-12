import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'
import createStore from './store/store.js'
import createRouter from './router/router.js'
import Meta from 'vue-meta'
import './assets/css/reset.css'
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
export default () => {
    const router = createRouter()
    const store = createStore()
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    return { app, router, store }
}
