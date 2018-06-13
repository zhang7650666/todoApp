<script>
import TabContainer from './Tab-container.vue'
export default {
  name: 'tabs',
  // provide () {
  //   return {
  //     value:this.value
  //   }
  // },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      panes: []
    }
  },
  render () {
    return (
      <div class="tabs">
        <ul class="tabs-header">
          {this.$slots.default}
        </ul>
        <v-tabcontainer panes={this.panes}></v-tabcontainer>
      </div>
    )
  },
  methods: {
    onChange (index) {
      this.$emit('change', index)
    }
  },
  components:{
      'v-tabcontainer':TabContainer
  }

}
</script>
<style>
.tabs-header{
   display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: 2px solid #ededed;
}

</style>

