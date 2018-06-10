'use strict'
import Vue from 'vue'
const component = {
    template: `<div>
        <input type="text" @input="handlerInput">
    </div>`,
    data () {
        return {
            msg: '组件你好'
        }
    },
    methods: {
        handlerInput (e) {
            this.$emit('input', e.target.value)
        }
    }
}

new Vue({
    components: {
        Comp: component
    },
    el: '#root',
    template: `<div>
        <Comp @input="handlerInput"></Comp>
        <span>{{val}}</span>
    </div>`,
    data () {
        return {
            val: ''
        }
    },
    methods: {
        handlerInput (arg) {
            this.val = arg
        }
    }
})
