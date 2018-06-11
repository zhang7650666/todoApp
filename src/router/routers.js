// import Todo from '../views/Todo.vue'
// import Login from '../views/Login.vue'
export default [{
        path: '*',
        redirext: '/app'
    },
    {
        path: '/app',
        // path: '/app/:id', // /app/xxx
        props: true, // 动态传参的另一种方式 这样的方式可以更好降低耦合
        // props: { // 指定传递id
        //     id: '456'
        // },
        // props: (route) => ({id: route.query.b}),
        name: 'todo', // 路由的命名， 他的作用就是 我们可以根据 名字来进行路由的跳转
        // component: Todo,
        component: () =>
            import('../views/Todo.vue'),
        // 命名视图的应用
        // components: {
        //     default: Todo, // 如果没有定义名字
        //     a: Login // 如果定义了名字就让他调到登录页
        // },
        // meta 的作用是用来存储路由的一些信息的
        meta: {
            title: '我是todo页面',
            description: '我是todo的页面aaa'
        },
        // children: [
        //     {
        //         path: 'test',
        //         name: 'login',
        //         component: Login
        //     }
        // ],
        beforeEnter (to, from, next) {
            // 他的调用顺序在beforeEach  与 beforeResolve  中间
            // console.log(4)
            next()
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import('../views/Login.vue')
    }
]
