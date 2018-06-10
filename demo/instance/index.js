import Vue from 'vue'
const App = new Vue({
    el: '#root',
    template: '<div ref="div">{{text}}</div>',
    data: {
        text: 0
    },
    watch: {
        text: (newText, oldText) => {
            console.log(`${newText}: ${oldText}`)
        }
    }
})
console.log(App)
// console.log(App.$data.text)
// setInterval(() => {
//    // App.$data.text += 1
//    App._self.$data.text += 1
// }, 1000)

// console.log(App.$options)
// console.log(App.$root === App)
// console.log(App._self === App)
// console.log(App.$refs)
// App.$watch('text', (newText, oldText) => {
//     console.log(newText)
//     console.log(oldText)
// })

// App.$on('event', (arg) => {
//     console.log(`emitEvent ${arg}`)
// })
// App.$emit('event', 'hello')

// vue 是一个响应式的框架，如果说一个变量，有没声明直接使用，那么就不是随着数据的变化而变化
// App.$forceUpdate() 强制组件渲染   一般情况下不要使用
// 如果一个变量没有声明还想使用  的话可以用 App.$set(App.obj, "a", 2)
// App.$delete(App.obj,"a")
// $nextTick(() => {})  //DOM 进行下一次更新的是时候调用
