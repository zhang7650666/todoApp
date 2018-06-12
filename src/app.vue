<template>
    <div id="app">
        <div class="cover"></div>
        <v-header></v-header>
        <router-link to="/app">App</router-link>
        <router-link to="/login">Login</router-link>
        <transition name="fade">
          <router-view></router-view>
        </transition>
        <button @click="nitify">nitify show</button>
        <v-footer></v-footer>
        <!-- <notification content="test notify"></notification> -->
    </div>
</template>
<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import Header from './components/Header.vue'
import Footer from './assets/js/footer.jsx'
export default {
  metaInfo: {
      title: '首页'
  },
  data () {
    return {
      msg: 'hello world'
    }
  },
  mounted () {

  },
  methods: {
    nitify () {
        this.$notify({
            content: 'test notify',
            btn: 'Close'
        })
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



