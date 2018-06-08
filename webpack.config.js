const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const isDev = process.env.NOOD_ENV == 'development'
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
const config = {
    target: 'web',
    entry: './src/main.js',
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.resolve(__dirname, '../dist')
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
    config.module.rules.push({
        test: /\.css$/,
        use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader'
        ]
    })
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
} else {
    config.entry = {
        app: path.join(__dirname, 'src/main.js'),
        vendor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push({
        test: /\.css$/,
        use: ExtractPlugin.extract({
            fallback: "style-loader",
            use: [
                'css-loader',
                'postcss-loader'
            ]
        })
    })
    config.plugins.push(
        new ExtractPlugin('style.[chunkhash:8].css')
    )
    config.optimization = {
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

}
module.exports = config