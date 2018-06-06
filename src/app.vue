<template>
    <div id="app">
        <div class="cover"></div>
    </div> 
</template>
<script>
export default {
    data(){
        return {
            msg:"hello world"
        }
    }
}
</script>
<style lang ="stylus" scoped>
#app{
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
}
    
.cover{
    position: absolute
    left: 0
    top 0
    right: 0
    bottom: 0
    background-color: #999
    opacity: .9
    z-index: -1
}
           
        
</style>



