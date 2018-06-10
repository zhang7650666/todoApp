import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './app.vue'
import createRouter from './router/router.js'
import createStore from './store/store.js'
import './assets/css/reset.css'
Vue.use(VueRouter)
Vue.use(Vuex)
const router = createRouter()
const store = createStore()
// 动态注册模块
store.registerModule('c', {
  state: {
    text: '动态注册的模块'
  }
})
// 解绑模块
store.unregisterModule('c')

// vuex api
// 当（第一个返回值有变化的时候）state.count  数据有变化的时候 后面的函数才会触发
// store.watch((state) => state.count + 1, (newCount) => {
//   console.log(newCount)
// })
// // 订阅  会拿到mutations的变话 任何一个mutation调用都会触发
// store.subscribe((mutation, state) => {
//   console.log(mutation.type) // mutation 的方法
//   console.log(mutation.payload) // 传入的数据
// })
// //
// store.subscribeAction((action, state) => {
//   console.log(action.type) // 通过action调用的mutation方法
//   console.log(action.payload) // 传入的数据
// })

// 全局路由导航守卫 (每次路由跳转的时候都会触发)
router.beforeEach((to, from, next) => { // 跳转前触发
  // 这个钩子的作用可以加入一些黑名单 例如
  // if (to.fullPath === '/login') {
  //  判断没有登录的话，可以直接让他调到登录页
  //   next('/login')// 只有执行了next 中间件之后才会进行下一个路由跳转，否则是不会进行下一路由跳转的
  // }
  // console.log(1)
  next()// 只有执行了next 中间件之后才会进行下一个路由跳转，否则是不会进行下一路由跳转的
})
router.beforeResolve((to, from, next) => {
  // console.log(2)
    next()
})
router.afterEach((to, from) => { // 跳转后触发
 // console.log(3)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')
