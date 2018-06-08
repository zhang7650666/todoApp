<!-- todo组件 -->
<template>
  <section class="real-app">
      <input 
        type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="接下去要做什么"
        v-model="val"
        @keyup.enter="addTodo"
      >
      <v-item v-for="todo in filteredTodos" :key="todo.id" :todo="todo" @del="deleteTodo"></v-item>
      <v-tabs :filter="filter" :todos="todos" @checkStats="amendStats" @clearAllCompleted="clearAllChecked"></v-tabs>
  </section>
</template>

<script>
import Item from './Item.vue'
import Tabs from './Tabs.vue'
let id = 0
export default {
  data () {
    return {
      todos: [],
      filter: 'all',
      val: ''
    }
  },
  components: {
    'v-item': Item,
    'v-tabs': Tabs
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
    amendStats (stats) {
      this.filter = stats
    },
    // 清楚所有选中的数据u
    clearAllChecked () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
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