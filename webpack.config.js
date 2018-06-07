const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const isDev = process.env.NOOD_ENV == 'development'
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
const config = {
    target: 'web',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            '@': resolve('src')
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]

            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name].[ext]'
                        }

                    }

                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process-env': {
                NOOD_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin(),
        new VueLoaderPlugin()
    ]
}
if (isDev) {
    config.devtool = '#cheap-module-eval-source-map',
        config.devServer = {
            port: 8000,
            host: 'localhost',
            overlay: {
                errors: true
            },
            open: false,
            hot: true // 热加载
        }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports = config