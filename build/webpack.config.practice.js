const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin') // 插件处理
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge') // 文件合并
const defaultPlugins = [ // 生产环境与开发环境都用dao的文件提取
    new webpack.DefinePlugin({ // 判断生产环境，还是开发环境
        'process-env': {
            NOOD_ENV: '"development"'
        }
    }),
    new HTMLPlugin({
        template: path.join(__dirname, 'template.html')
    }),
    new VueLoaderPlugin()
]
const devServer = { // 默认服务配置  提取出来的目的是便于查找配置
    port: 8000,
    host: 'localhost', // 默认启动本机   正常应该配置成 "0.0.0.0"
    overlay: { // shell  中显示报错信息
        errors: true
    },
    open: false, // 启动后默认代开浏览器
    hot: true // 热加载
}

let config = merge(baseConfig, { // 将webpack.config.base.js 的一些配置与开发环境的一些配置合并
    devtool: '#cheap-module-eval-source-map',
    entry: path.join(__dirname, '../demo/main.js'),
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
    resolve: {
        alias: {
            // import Vue from 'vue'  指定使用哪个vue
            'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
        }
    },
    plugins: defaultPlugins.concat([ // 将生产环境开发环境都会用到的插件 与开发环境用到的插件合并
        new webpack.HotModuleReplacementPlugin()
        // new webpack.NoEmitOnErrorsPlugin()
    ])

})
module.exports = config