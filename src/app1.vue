<template>
    <div id="app">
        <div class="cover"></div>
        <v-header></v-header>
        <router-link to="/app">App</router-link>
        <router-link to="/login">Login</router-link>
        <router-link :to="{name:'todo'}">根据路由名，进行路由切换</router-link>
        <router-link to="/app/123">App123</router-link>
        <router-link to="/app/456">App456</router-link>
        <transition name="fade">
          <router-view></router-view>
        </transition>
        <v-footer></v-footer>
        <span>{{counter}}{{fullName()}}</span>
        <button @click="setStoreCount">修改count</button>
        <p>{{text1}}</p>
        <p>{{text2}}</p>
        <p>{{textPlus()}}</p>
        <!-- <router-view name="a"></router-view> -->
    </div> 
</template>
<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import Header from './components/Header.vue'
import Footer from './assets/js/footer.jsx'
export default {
  data () {
    return {
      msg: 'hello world'
    }
  },
  computed: {
    // ...mapState(['count']) // 同名的用法
    ...mapState({
      // counter: 'count'
      counter: state => state.count, // 如果有计算的话，可以用这种回调的方式
      text1: state => state.a.text1,
      text2: state => state.b.text1
    })
   
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  mounted () {
    this.updateCountAsync(5)
  },
  methods: {
     // ...mapGetters(['fullName']),
     ...mapGetters({
       fullName: 'fullName',
       textPlus: 'a/textPlus'
     }),
     ...mapMutations(['updateCount', 'a/setUpdate','b/setUpdate']),
     // ...mapActions(['updateCountAsync']),
    ...mapActions({
      updateCountAsync: 'updateCountAsync',
      add: 'a/add'
    }),
    setStoreCount () {
      this.updateCount(2)
      this['a/setUpdate']('修改了a模块')
      this['b/setUpdate']('修改了b模块')
      this.add()
    }
  },
  components: {
    'v-header': Header,
    'v-footer': Footer
  }
}
</script>
<style scoped>
#app{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
} 
.cover{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #999;
    opacity: .9;
    z-index: -1;
}      
</style>



