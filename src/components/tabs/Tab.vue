<script>
export default {
    name: 'tab',
    props: {
        index: {
            type: [String, Number],
            required: true
        },
        label: {
            type: String,
            default: 'tab'
        }
    },
    // 接受provied 传递过来的值
    // inject: ['value'],
    computed: {
        active () {
            return this.$parent.value === this.index // (写法一)   如果结果变了了父级可能纠错了
            // return this.value === this.index (写法二)   动态绑定的值不能实时更新  可以使用Object.defineProperty
        }
    },
    methods: {
        handleClick () {
             this.$parent.onChange(this.index)
        }
    },
    mounted () {
        this.$parent.panes.push(this)
    },
    render () {
        const tab = this.$slots.label || <span>{this.label}</span>
        const classNames = {
            tab: true,
            active: this.active
        }
        return (
            <li class={classNames} on-click={this.handleClick}>{tab}</li>
        )
    }

}
</script>
<style scoped>
.tab{
  list-style: none;
  line-height: 40px;
  margin-right: 30px;
  position: relative;
  bottom: -2px;
  cursor: pointer;
}
.tab.active{
     border-bottom: 2px solid blue;
}
.tab:last-child{
    margin-right: 0;
}
</style>
