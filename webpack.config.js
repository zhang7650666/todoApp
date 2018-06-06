const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const isDev = process.env.NOOD_ENV == "development"
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const config = {
    target: "web",
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
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
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ]
}
if (isDev) {
    config.devtool = "#cheap-module-eval-source-map",
        config.devServer = {
            port: 8000,
            host: "0.0.0.0",
            overlay: {
                errors: true
            },
            open: true,
            hot: true //热加载
        }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports = config;