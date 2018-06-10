'use strict'
import Vue from 'vue'
const component = {
    props: {
        active: {
            type: Boolean,
            required: true
        },
        propOne: String
    },
    template: `<div>
        <p>this is component {{msg}}</p>
        <p>{{active}}</p>
        <input type="text"><span>{{propOne}}</span>
    </div>`,
    data () {
        return {
            msg: '组件你好'
        }
    },
    mounted () {
        console.log('组件的mounted函数')
    }

}
const component2 = {
    extends: component,
    mounted () {
        console.log(this.$parent.$options.name)
    }
}

new Vue({
    name: '#root',
    components: {
        Comp: component2
    },
    el: '#root',
    template: `<Comp :active="active" :prop-one ="propOne"></Comp>`,
    data () {
        return {
            active: true,
            propOne: '组件2'
        }
    }
})
// const CompVue = Vue.extend(component)
// new CompVue({
//     el: '#root',
//     propsData: {
//         active: true,
//         propOne: '越努力，越幸运'
//     },
//     data () {
//         return {
//             msg: '继承后传递的数据，会覆盖掉原来组件上的数据'
//         }
//     },
//     mounted () {
//         console.log('实例mounted函数')
//     }

// })

// 继承的组件如果要传递参数使用props 是无效的  可以通过 propsData 传递参数
// mounted 方法 组件的也会执行，实例的也会执行，组件的先与 实例的执行
