import Vuex from 'vuex'
import defaultState from './state/state.js'
import mutations from './mutations/mutations.js'
import getters from './getters/getters.js'
import actions from './actions/actions.js'
const isDev = process.env.NOOD_ENV === 'development'
export default () => {
    const store = new Vuex.Store({
        strict: isDev, // 实际上 state的数据也是可以通过外部来修改的，但是不推荐， 设置了strict 为true 的话，就不能通过外部来修改了
        // 存储数据用的
        state: defaultState,
        // 就相当于state的扩展
        getters,
         // mutations  是唯一可以修改state的
         // mutations  只能接受两个参数  第二参数是一个对象zhi
         // 只能操作同步数据
         // commit
        mutations,
        // 主要用来处理异步的数据处理方法
        // 使用的时候  this.$store.dispatch('要修改的方法的名字',要修改的数据)
        // dispatch
        actions,
        // vuex 插件
        // plugins: [
        //     // 里面可以放很多plugin 他们会按顺序执行
        //     (store) => {
        //         // 在vue 初始化的时候就会调用这些插件
        //         console.log(1)
        //         // 当（第一个返回值有变化的时候）state.count  数据有变化的时候 后面的函数才会触发
        //         store.watch((state) => state.count + 1, (newCount) => {
        //             console.log(newCount)
        //         })
        //         // 订阅  会拿到mutations的变话 任何一个mutation调用都会触发
        //         store.subscribe((mutation, state) => {
        //             console.log(mutation.type) // mutation 的方法
        //             console.log(mutation.payload) // 传入的数据
        //         })
        //         //
        //         store.subscribeAction((action, state) => {
        //             console.log(action.type) // 通过action调用的mutation方法
        //             console.log(action.payload) // 传入的数据
        //         })
        //     }
        // ],
        modules: {
            a: {
                namespaced: true, // 正常情况下vuex 会把所有的mutations 放在全局作用域下，  如果想设定在局部作用域生效  可以使用 namespaced 为 true
                state: {
                    text1: '我是a模块'
                },
                mutations: {
                    // 页面应用方式
                    // ...mapMutations(['fullName', 'a/setUpdate'])  要加上命名空间
                    // 使用此方的时候 this['a/setUpdate]('123');
                    setUpdate (state, arg) {
                        state.text1 = arg
                    }
                },
                getters: {
                    // getters 里面的方法 接受三个参数  1 ,作用域下的state   2,所有的getters方法，3，全局的state数据
                    // 通过这种方式可以在 a 模块中获取到b 模块的数据
                    textPlus (state, getters, rootState) {
                        state.text1 = state.text1 + rootState.b.text1
                    }
                },
                actions: {
                    // 在全局的actions 中  第一个参数相当于 store 对象
                    // 在这里  第一个参数 相当于这个模块的 content(上下文)
                    // 这里我们可以把我们需要的通过解构赋值的方式提取出来 {state, commit, rootState} state 是此模块的数据  commit  是此模块的commit方式   rootState  是全局的state数据u
                    // add ({state, commit, rootState}) {
                    //     // 我们可以直接commit此模块的一些方法
                    //     commit('setUpdate', rootState.lastName)
                    // },
                    // 如果我们想要全局的查找commit方法可以写成下面的方法
                    // commmit('setUpdate', commit ,{root: true} )
                    add ({state, commit, rootState}) {
                        // 我们可以直接commit此模块的一些方法
                        commit('updateCount', 10, {root: true})
                    }

                }

            },
            b: {
                namespaced: true, // 正常情况下vuex 会把所有的mutations 放在全局作用域下，  如果想设定在局部作用域生效  可以使用 namespaced 为 true
                state: {
                    text1: '我是b模块'
                },
                mutations: {
                    setUpdate (state, arg) {
                        state.text1 = arg
                    }
                }
            }
        }
    })
    // vuex  热更新功能， 如果没有热更新功能，修改一个数据，刷新一次
    if (module.hot) {
        module.hot.accept([
            './state/state',
            './mutations/mutations',
            './actions/actions',
            './getters/getters'
        ], () => {
            const newState = require('./state/state').default
            const newMutations = require('./mutations/mutations').default
            const newActions = require('./actions/actions').default
            const newGetters = require('./getters/getters').default

            store.hotUpdate({
              state: newState,
              mutations: newMutations,
              getters: newGetters,
              actions: newActions
            })
          })
    }
    return store
}
