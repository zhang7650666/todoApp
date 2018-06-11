const Koa = require('koa')
    // const send = require('koa-send')
const pageRouter = require('./routers/dev-ssr.js')
const app = new Koa()
const isDev = process.env.NOOD_ENV === 'development'
app.use(async(ctx, next) => {
    try {
        console.log('require with path' + ctx.path)
        await next()
    } catch (err) {
        console.log(err)
        ctx.status = 500
        if (isDev) {
            ctx.body = err.message
        } else {
            ctx.body = 'pleace try again later'
        }
    }
})
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())
const HOST = process.env.host || '0.0.0.0'
const PORT = process.env.PORT || 3333
app.listen(PORT, HOST, () => {
    console.log(`server is listening on ${HOST}:${PORT}`)
})