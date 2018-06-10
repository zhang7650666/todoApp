'use strict'
import Vue from 'vue'
const childComponent = {
    template: `<div>
        <p>我是子组件{{data.value}}</p>
    </div>`,
    inject: ['yeye', 'data'],
    mounted () {
        console.log(this.yeye)
    }
}
const component = {
    components: {
        childComp: childComponent
    },
    template: `<div :style="style">
        <slot name="slotName"></slot>
        <slot>你好</slot>
        <slot :value="msg" aaa="hello"></slot>
        <child-comp></child-comp>
    </div>`,
    data () {
        return {
            msg: '组件你好',
            style: {
                width: '200px',
                height: '200px',
                border: '1px solid #aaa'
            }
        }
    }
}

new Vue({
    components: {
        Comp: component,
        childComp: childComponent
    },
    provide () {
        const data = {}
        Object.defineProperty(data, 'value', {
            get: () => this.value,
            enumerable: true
        })
        return {
            yeye: this,
            data
        } 
    },
    el: '#root',
    template: `<div>
        <child-comp></child-comp>
        <Comp>
            <div slot="slotName">
                <p>越努力，越幸运</p>
                <p>坚持不懈，持之以恒</p>
            </div>
            <p>没有被slotName包括</p>
            <div slot-scope="props">{{props.value}}{{props.aaa}}</div>
            
        </Comp>
        <input type="text" v-model="value">
    </div>`,
    data () {
        return {
            value: '1223'
        }
    }
})
