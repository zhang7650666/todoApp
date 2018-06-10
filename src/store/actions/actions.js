export default {
    // 接受两个参数  1 store对象  如果要传多个参数的话，封装成一个对象
    updateCountAsync (store, num) {
        setTimeout(() => {
            store.commit('updateCount', num)
        }, 3000)
    }
}
