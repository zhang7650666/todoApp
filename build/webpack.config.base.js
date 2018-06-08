const path = require('path')
const isDev = process.env.NOOD_ENV == 'development' // 判断是生产环境还是调试环境标识
const createVueLoaderOptions = require('./vue-loader.config.js')

const config = {
    target: 'web', // webpack 指定什么项目使用
    entry: path.join(__dirname, '../src/main.js'), // 入口文件  可以这顶一个，也可以设定多个
    output: {
        filename: 'bundle.[hash:8].js', // 输出文件名
        path: path.join(__dirname, './../dist') // 打包到那个文件夹下面
    },
    module: {
        rules: [{ // vue loader
                test: /\.(vue|js|jsx)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre' // 预处理 需要做eslint 的文件在加载之前都要先通过eslint处理
            },
            { // vue loader
                test: /\.vue$/,
                loader: 'vue-loader',
                options: createVueLoaderOptions(isDev)
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/, // 排除node_modules  文件不打包
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
                            limit: 1024, // 限制上传文件大小
                            name: 'resources/[path][name].[hash:8].[ext]' // 静态资源打包后的路径
                        }

                    }

                ]
            }
        ]
    }
}

module.exports = config