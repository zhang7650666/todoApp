import Vue from 'vue'
import Component from './func-notification'
const NotificationConstructor = Vue.extend(Component)
const instances = [] // 实例的数组
let seet = 1 // 生成组件的id
    // 删除实例的方法
const removeInstance = (instance) => {
    if (!instance) {
        return
    }
    let len = instances.length
    let index = instances.findIndex(inst => instance.id === inst.id)
    instances.splice(index, 1)
    if (len <= 1) { // 如果只有一个节点的话，没有必要计算
        return
    }
    const removeHeight = instance.vm.height
    for (let i = index; i < len - 1; i++) {
        instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
    }
}
const notify = (options) => {
    // 判断如果是服务端的话，直接就返回
    if (Vue.prototype.$isServer) {
        return
    }
    const {
        autoClose,
        ...reset
    } = options
    const instance = new NotificationConstructor({
        // propsData: options // 继承的组件 传值  用propsData   传过去的值，会覆盖掉原有的值
        propsData: {...reset },
        data: {
            autoClose: autoClose === undefined ? 3000 : autoClose
        }
    })
    const id = `notification_${seet++}`
    instance.id = id // 给instance实例对象添加id属性
    instance.vm = instance.$mount() // 此时DOM  节点已经有了， 但是还没有插入到页面中
    document.body.appendChild(instance.vm.$el) // 将DOM节点添加到页面中去
    instance.vm.visible = true
    let verticalOffset = 0

    instances.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16
    })
    verticalOffset += 16
    instance.verticalOffset = verticalOffset
    instances.push(instance) // 把 instance 添加到instances 数组中
    instance.vm.$on('closed', () => {
        removeInstance(instance)
        document.body.removeChild(instance.vm.$el) // 清除instance 节点
        instance.vm.$destroy() // 彻底销毁instance 实例
    })
    instance.vm.$on('close', () => {
        instance.vm.visible = false
    })
    return instance.vm
}
export default notify