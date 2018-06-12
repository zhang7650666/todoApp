const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const isDev = process.env.NOOD_ENV === 'development' // 判断是生产环境还是调试环境标识
const HTMLPlugin = require('html-webpack-plugin') // 插件处理
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin') // 将css文件打包到一个文件下
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge') // 文件合并
const defaultPlugins = [ // 生产环境与开发环境都用dao的文件提取
    new webpack.DefinePlugin({ // 判断生产环境，还是开发环境
        'process-env': {
            NOOD_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin({
        template: path.join(__dirname, 'template.html')
    }),
    new VueLoaderPlugin(),
    new VueClientPlugin()
]
const devServer = { // 默认服务配置  提取出来的目的是便于查找配置
    port: 8000,
    host: 'localhost', // 默认启动本机   正常应该配置成 0.0.0.0
    overlay: { // shell  中显示报错信息
        errors: true
    },
    headers: { 'Access-Control-Allow-Origin': '*' }, // 设置允许跨域
    historyApiFallback: { // 当我们在history 模式下的时候，打开页面回事 空白页 （是因为我们打开页面 向服务端请求，但是，我们的路由是前端路由，后端根本就不认识造成的，所以会是404）
        index: '/public/index.html'
    },
    open: false, // 启动后默认代开浏览器
    hot: true // 热加载
}
let config
if (isDev) { // 开发环境
    config = merge(baseConfig, { // 将webpack.config.base.js 的一些配置与开发环境的一些配置合并
        devtool: '#cheap-module-eval-source-map',
        module: { // 默认的使用 那种预处理器，提取出来   如果你的项目用的是stylus  这里就改成stylus的配置
            rules: [{
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader'

                ]
            }]
        },
        devServer, // 尚明定义的derServer常量
        plugins: defaultPlugins.concat([ // 将生产环境开发环境都会用到的插件 与开发环境用到的插件合并
            new webpack.HotModuleReplacementPlugin()
            // new webpack.NoEmitOnErrorsPlugin()
        ])

    })
} else { // 生产环境
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../src/main.js'), // 入口文件
            // app: path.join(__dirname, '../src/src-entry.js'), // 入口文件
            vendor: ['vue'], // 将一些框架插件的文件打包到一起
        },
        output: {
            filename: '[name].[chunkhash:8].js', // 储口文件
        },
        module: {
            rules: [{
                test: /\.css$/,
                use: ExtractPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader'
                    ]
                })
            }]
        },
        plugins: defaultPlugins.concat([ // 将生产环境开发环境都会用到的插件 与生产环境用到的插件合并
            new ExtractPlugin('[name].[chunkhash].css')
        ]),
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true
                    }
                }
            },
            runtimeChunk: true
        }
    })
}
module.exports = config