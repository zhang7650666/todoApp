'use strict'
import Vue from 'vue'
const component = {
    // template: `<div :style="style">
    //     <slot name="slotName"></slot>
    // </div>`,
    props: {
        arg1: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            msg: '组件你好',
            style: {
                width: '200px',
                height: '200px',
                border: '1px solid #aaa'
            }
        }
    },
    render (createElement) {
        return createElement('div', {
            style: this.style,
            on: {
                click: () => {this.$emit('click')}
            }

        }, [
            this.$slots.default,
            this.arg1,
            this.$slots.header
        ])
    }
}

new Vue({
    components: {
        Comp: component
    },
    el: '#root',
    // template: `<div>
    //     <Comp ref="comp">
    //         <div slot="slotName">
    //             <p>越努力，越幸运</p>
    //             <p>坚持不懈，持之以恒</p>
    //         </div>
    //     </Comp>
    //     <input type="text" v-model="value">
    // </div>`,
    data () {
        return {
            value: '1223'
        }
    }, 
    render (createElement) {
        // this.$createElement()  使用render传递过来的  和自己创建的一样
        // createElement()  接受两个参数  1、组件的名字    2、组件用到的属性
        return createElement('Comp', {
            ref: 'comp',
            props: {
                arg1: this.value
            },
            // on: {
            //     click: this.handlerClick
            // },
            nativeOn: {
                click: this.handlerClick
            }
        }, [
            createElement('span', {
                ref: 'span',
                slot: 'header',
                attrs: {
                    id: 'atrrs-id'
                },
                domProps: {
                    innerHTML: '<span>我是innerHTML</span>'
                }
            }, this.value)
        ])
    },
    methods: {
        handlerClick () {
            console.log('触发了')
        }
    }
})
