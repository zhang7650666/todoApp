const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge') // 文件合并
const ExtractPlugin = require('extract-text-webpack-plugin') // 将css文件打包到一个文件下
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const isDev = process.env.NODE_ENV === 'development'
let config = merge(baseConfig, { // 将webpack.config.base.js 的一些配置与开发环境的一些配置合并
    devtool: 'source-map', // 代码调试功能
    target: 'node',
    entry: {
        app: path.join(__dirname, '../src/server-entry.js'), // 入口文件
        vendor: ['vue'] // 将一些框架插件的文件打包到一起
    },
    output: {
        libraryTarget: 'commonjs2', // 储口文件
        filename: 'server-entry.js',
        path: path.join(__dirname, '../server-build')
    },
    // 将 package.json 文件中的 打包后要是用的依赖打包的一个js中
    externals: Object.keys(require('../package.json').dependencies),
    module: { // 默认的使用 那种预处理器，提取出来   如果你的项目用的是stylus  这里就改成stylus的配置
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
    plugins: [ // 将生产环境开发环境都会用到的插件 与开发环境用到的插件合并
        new ExtractPlugin('[name].[chunkhash].css'),
        new webpack.DefinePlugin({
            'process.env.NOOD_ENV': JSON.stringify(process.env.NOOD_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        new VueServerPlugin()
    ]

})
module.exports = config