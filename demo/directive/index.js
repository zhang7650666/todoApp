import Vue from 'vue'
const app = new Vue({
    el: '#root',
    template: `<div>
        <p v-show="active">{{msg}}</p>
        <p v-text="msg"></p>
        <p v-html="html"></p>
        <p v-if="num === 1">1</p>
        <p v-else-if="num === 2">2</p>
        <p v-else>3</p>
        <p></p>
        <input type="text" ><span></span>
        <ul>
            <li v-for="(item, index) in arr" :key="item">{{item}}</li>
        </ul>
        <ul>
            <li v-for="(val, key, index) in obj">{{val}} {{key}} {{index}}</li>
        </ul>
        <div>
            <input type="checkbox" :value="1" v-model="arr">
            <input type="checkbox" :value="2" v-model="arr">
            <input type="checkbox" :value="3" v-model="arr">
        </div>
        <div>
            <input type="radio" value="one" v-model="picked" @click="selected('one')">
            <input type="radio" value="two" v-model="picked" @click="selected('two')">
            <input type="radio" value="three" v-model="picked" @click="selected('three')">
        </div>
        <div>number 修饰符<input type="text"  v-model.number="number" ></div>
    </div>`,
    data () {
        return {
            msg: 'data bind',
            html: '<span>html</span>',
            active: false,
            num: 2,
            arr: [1, 2, 3],
            obj: {
                a: 123,
                b: 345,
                c: 567
            },
            picked: '',
            number: 0
        }
    },
    created () {

    },
    mounted () {

    },
    computed: {
    },
    methods: {
        selected (arg) {
            this.picked = arg
        }
    }
})

// v-bind   :
// v-if v-else v-else-if
// v-show
// v-on  @
// v-text
// v-html
// v-cloak
// v-noce //只执行一次
// v-pre 不对标签内容进行解析
// v-for 循环的时候要加上 :key  这样的话可以优化性能  没有key的话  数据变化的话DOM就会重新渲染，如果加上了key  DOM 渲染的时候就会判断这个key 有没有变化，如果没有变化的话，就会利用缓存， 记住 不要用index作为key值，因为index 是会变得 这样容易造成错误的缓存
// v-model  修饰符   v-model.number     v-model.trim  v-model.lazy   当输入框的值变化时 并不会触发change 事件   只有失焦的时候才会触发
