import Vue from 'vue'
import App from "./app.vue"
import "./assets/css/reset.css"
const root = document.createElement('div')
document.body.appendChild(root);

new Vue({
    render: h => h(App)
}).$mount(root);