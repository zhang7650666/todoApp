<template>
    <div id="app">
        <div class="cover"></div>
        <v-header></v-header>
        <v-todo></v-todo>
        <v-footer></v-footer>
    </div> 
</template>
<script>
import Header from "./components/Header.vue"
import Footer from "./assets/js/footer.jsx"
import Todo from "./components/Todo.vue"
export default {
    data(){
        return {
            msg:"hello world"
        }
    },
    components:{
        'v-header':Header,
        'v-footer':Footer,
        'v-todo':Todo
    }
}
</script>
<style  scoped>
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



