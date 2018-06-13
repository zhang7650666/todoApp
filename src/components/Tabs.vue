<!-- tabs -->
<template>
  <div class="helper">
      <span class="left">{{unCheckedLength}} items left</span>
      <!-- <span class="tabs" v-for="(item, index) in states"  @click="toggleFilter(item)">
          <span :class="[item, filter === item ? 'actived':'']">{{item}}</span>
      </span> -->
      <span class="clear" @click="clearAllCompleted">Clear Completed</span>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      states: [ 'all', 'active', 'completed' ]
    }
  },
  computed: {
    unCheckedLength () {
      return this.todos.filter(item => !item.completed).length
    }
  },
  methods: {
    // toggleFilter (state) {
    //   this.$emit('checkStats', state)
    // },
    clearAllCompleted () {
      this.$emit('clearAllCompleted')
    }
  }
}
</script>
<style scoped>
.helper{
  font-weight: 100;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  line-height: 30px;
  background-color: #fff;
  font-size: 14px;
  font-smoothing: antialiased;
}
.left, .clear, .tabs{
  padding: 0 10px;
  box-sizing:border-box;
}
.left, .clear{
  width: 150px;
}
.left{
  text-align: left;
}
.clear{
  text-align: right;
  cursor: pointer;
}
.tabs{
  /* width: 200px;
  display: flex;
  justify-content: space-around; */
}
.tabs span {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    border: 1px solid rgba(175,47,47,0);
}
.tabs span.actived{
    border-color: rgba(175,47,47,0.4);
    border-radius: 5px;
}
</style>
