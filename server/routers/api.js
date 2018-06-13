const Router = require('koa-router')
const apiRouter = new Router({
    prefix: '/api', // '/api'开头的才会去处理
})
module.exports = apiRouter