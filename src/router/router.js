
import Router from 'vue-router'
import routes from './routers.js'

export default () => {
    return new Router({
        mode: 'history',
        // base: '/base/',
        linkActiveClass: 'active-link',
        linkExactActiveClass: 'exact-active-link',
        scrollBehavior (to, from, savedPosition) {
            // 例如 从 todo  页面 跳转到  login
            // to  表示路由跳转过程中要去到的路由   todo 路由
            // from 从哪个路由跳转到下一个路由 login
            if (savedPosition) { // 如果这个页面之前进来过，滚动条就还在原来的位置
                return savedPosition
            } else { // 如果没有进来过，就让他靠左考顶部
                return {x: 0, y: 0}
            }
        },
        // 默认vue会把query给我转成对象， 我们可以根据自己的需求进行修改
        // parseQuery (query) {

        // },
        // stringifyQuery (obj) {

        // },
        fallback: true, // 路由跳转 一些浏览器如果不支持的话，vue 会自动帮我们转成hash的形式
        routes
    })
}
