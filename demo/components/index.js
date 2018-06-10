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
        //
       // this.propOne = 'text2'
    }
}
// 全局组件定义
// Vue.component('CompOne', component)
const app = new Vue({
     // 局部组件的定义方式
    components: {
        CompOne: component
    },
    el: '#root',
    template: '<comp-one :active = "active" :prop-one = "propOne"></comp-one>',
    data () {
        return {
            active: false,
            propOne: 'text1'
        }
        
    }
})

// 父子之间传递参数时， 子组件不要修改父组件的参数，这样会报错， 如果子组件想修改父组件的参数，可以通过以下的方式
// 1、$emit  派发事件
