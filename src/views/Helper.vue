<!-- todo组件 -->
<template>
  <section class="real-app">
    <div class="tab-container">
       <tabs :value="filter" @change="handleChangeTab">
            <tab   v-for="(item, index) in states" :key="item" :index="item" :label="item">
                <!-- <span>tab content 1</span> -->
            </tab>
            <!-- <tab index="2" >
              <span slot="label" style="color:red">tab2</span>
              <span>tab content 2</span>
            </tab>
            <tab index="3" label="tab3">
              <span>tab content 3</span>
            </tab> -->
      </tabs>
    </div>

      <input
        type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="接下去要做什么"
        v-model="val"
        @keyup.enter="addTodo"
      >
      <v-item v-for="todo in filteredTodos" :key="todo.id" :todo="todo" @del="deleteTodo"></v-item>
      <v-helper :filter="filter" :todos="todos" @clearAllCompleted="clearAllChecked"></v-helper>
      <!-- <router-view></router-view> -->
  </section>
</template>

<script>
import Item from '../components/Item.vue'
import Helper from '../components/Tabs.vue'
let id = 0
export default {
    metaInfo: {
        title: 'todo页面'
    },
  props: {
    id: {
      type: String
    }
  },
  data () {
    return {
      todos: [],
      filter: 'all',
      val: '',
      states: [ 'all', 'active', 'completed' ]
    }
  },
  components: {
    'v-item': Item,
    'v-helper': Helper
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      };
      let completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  // mounted () {
    // 相同路径显示同一个组件的情况下， 第二次 mounted 是不会触发的   这是我们可以使用beforeRouteUpdate钩子
   //  console.log(this.$route)
   //  console.log(this.id)
  // },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: this.val.trim(),
        completed: false
      })
      this.val = ''
    },
    // 删除一条数据
    deleteTodo (id) {
      let index = this.todos.findIndex(item => item.id === id)
      this.todos.splice(index, 1)
    },
    // 更新选中状态
    // amendStats (stats) {
    //   this.filter = stats
    // },
    // 清楚所有选中的数据u
    clearAllChecked () {
      this.todos = this.todos.filter(todo => !todo.completed)
    },
    // tabs 切换
    handleChangeTab (value) {
      this.filter = value
    }
  },
  beforeRouteEnter (to, from, next) {
    // console.log(5)
    // next 里面可以接收一个回调，
    next(vm => {
      // console.log(vm.id)
    })
  },
  beforeRouteUpdate (to, from, next) {
    // 有数据更新时才会触发
   //  console.log(6)
    next()
  },
  beforeRouteLeave (to, from, next) {
    // console.log(7)
    // 作用   当你要离开这个界面时，可以给你做一个提醒
    // if(window.confirm('你确定要离开这个界面吗')){
      next()
    // }
  }

}
</script>
<style scoped>
.real-app{
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
.tab-container{
  background-color: #fff;
  padding: 0 15px;
}

</style>
