import Notification from './Notification.vue'

export default {
    extends: Notification,
    data () {
        return {
            verticalOffset: 0,
            timer: null,
            visible: false
        }
    },
    computed: {
        style () { // 这里的style 会覆盖掉 Notification 中的style
            return {
                position: 'fixed',
                right: '20px',
                bottom: `${this.verticalOffset}px`
            }
        }
    },
    mounted () {
        this.createTimer()
    },
    methods: {
        createTimer () {
            if (this.autoClose) {
                this.timer = setTimeout(() => {
                    this.visible = false
                }, this.autoClose)
            }
        },
        clearTimer () {
            if (this.timer) {
                clearTimeout(this.timer)
            }
        },
        afterEnter () {
            console.log(1)
            this.height = this.$el.offsetHeight
        }
    },
    beforeDestroy () {
        this.clearTimer()
    }
}
