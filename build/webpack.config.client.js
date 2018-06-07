const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const isDev = process.env.NOOD_ENV == 'development'
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const defaultPlugins = [
    new webpack.DefinePlugin({
        'process-env': {
            NOOD_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin(),
    new VueLoaderPlugin()
]
const devServer = {
    port: 8000,
    host: 'localhost',
    overlay: {
        errors: true
    },
    open: false,
    hot: true // 热加载
}
let config
if (isDev) {
    config = merge(baseConfig,{
        devtool:'#cheap-module-eval-source-map',
        module:{
            rules:[
                {
                    test: /\.css$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'postcss-loader'
                    ]
                }
            ]
        },
        devServer,
        plugins:defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
        
    })
    
}else{
    config = merge(baseConfig,{
        entry:{
            app:path.join(__dirname,'../src/main.js'),
            vendor:['vue']
        },
        output:{
            filename:'[name].[chunkhash:8].js'
        },
        module:{
            rules:[
                {
                    test: /\.css$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'postcss-loader'
                    ]
                }
            ]
        },
        plugins:defaultPlugins.concat([
            new ExtractPlugin('style.[chunkhash:8].css')
        ])
        ,
        optimization:{
            splitChunks: {
              cacheGroups: {
                commons: {
                  chunks: 'initial',
                  minChunks: 2, maxInitialRequests: 5,
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