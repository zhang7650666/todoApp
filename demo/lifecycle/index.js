import Vue from 'vue'

const abc = new Vue({
    el: '#root',
    template: `<div>
        <p>{{haha}}</p>
        <div>{{num}}</div>
        <button @click="fn">点我</button>
    </div>`,
    data () {
        return {
            msg: 'hello',
            num: 0
        }
    },
    beforeCreate () {
        console.log(1)
    },
    created () {
        console.log(2)
    },
    beforeMount () {
        console.log(3)
    },
    mounted () {
        console.log(4)
    },
    beforeUpdate () {
        console.log(5)
    },
    updated () {
        console.log(6)
    },
    beforeDestroy () {
        console.log(7)
    },
    destroyed () {
        console.log(8)
    },
    computed: {
        haha () {
            // computed  先与mounted执行
            this.msg = 'world'
            console.log(this.msg)  
        }
    },
    methods: {
        fn () {
            this.num += 1
            setTimeout(() => {
                this.$destroy()
            }, 1000)           
        }
    }
})
