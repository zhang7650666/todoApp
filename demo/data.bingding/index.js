import Vue from 'vue'
const app = new Vue({
    el: '#root',
    template: `<div :class="{active: isActive}">
        <p :class="[isActive ? 'active' : 'not-active']">{{msg}}</p>
        <p>{{html}}</p>
        <p v-html="html"></p>
        <div>{{arrJoin}}</div>
        <div>{{fnArrJoin()}}</div>
        <div :style="style1">{{msg}}</div>
        <div :style="[style1, style2]">{{msg}}</div>
    </div>`,
    data () {
        return {
            msg: 'data bind',
            isActive: true,
            html: `<span>越努力，越幸运，持之以恒</span>`,
            arr: [1, 2, 3],
            style1: {
                color: 'red'
            },
            style2: {
                color: 'blue',
                display: 'block',
                appearance: 'none'
            }
        }
    },
    created () {

    },
    mounted () {

    },
    computed: {
        arrJoin () {
            let This = this
            This.arr.push(4)
            return This.arr.join(' ')
        }
    },
    methods: {
        fnArrJoin () {
            return this.arr.join('')
        }
    }
})
