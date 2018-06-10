import Vue from 'vue'
const app = new Vue({
    el: '#root',
    template: `<div>
        <p>{{msg}}</p>
        <p>name: {{name}}</p>
        <p>name: {{getName()}}</p>
        <p>{{num}}</p>
        <input type="text" v-model="num">
        <p>fullname:{{fullName}}</p>
        <input type="text" v-model="firstName">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <input type="text" v-model="obj.a"><span>{{obj.a}}</span>
    </div>`,
    data () {
        return {
            msg: 'data bind',
            firstName: 'Hadwin',
            lastName: 'zhang',
            num: 0,
            fullName: '',
            obj: {
                a: 123
            }
        }
    },
    created () {

    },
    mounted () {

    },
    computed: {
        // computed  与methods 方法 的区别  只要有数据变化 methods就会重新执行，  computed  只有相关的数据变化时才会执行
        name () {
            console.log('conputed')
            return `${this.firstName}  ${this.lastName}`
        }
    },
    watch: {
        // computed 初始化页面的时候会执行， watch 初始化页面的时候不会执行，如果想要初始化页面时执行，可以用handler方法
        // firstName (newName, oldName) {
        //     this.fullName = newName + this.lastName
        // },
        // firstName: {
        //     handler (newName, oldName) {
        //         this.fullName = newName + this.lastName
        //     },
        //     immediate: true
        // }

        // obj: {
        //     handler (newVal, oldVal) {
        //         console.log(newVal.a)
        //     },
        //     immediate: true,
        //     deep: true // 深度监听  这样消耗性能比较大  因为他会把obj里的每一个属性遍历一遍 使用 'oja.a" 这种方法会优化性能
        // }

        'obj.a': {
            handler (newVal, oldVal) {
                console.log(newVal)
            },
            immediate: true
            // deep: true
        }
    },
    methods: {
        getName () {
            console.log('methods')
            return `${this.firstName}  ${this.lastName}`
        }
    }
})

// 重点注意  不要在computed  与wathc   修改值  这样会出现无限循环的属性   （原因，每次watch变化之后又修改了值，又发生了变化）
