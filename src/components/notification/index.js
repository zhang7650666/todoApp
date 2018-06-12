import Notification from './Notification.vue'
import notify from './function.js'
export default (Vue) => {
    // 全局组件的注册
    Vue.component(Notification.name, Notification)
    Vue.prototype.$notify = notify
}
