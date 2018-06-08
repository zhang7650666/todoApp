module.exports = (isDev) => {
    return {
        preserveWhitepace: true, // 如果末班中写的内容有空格的话，如果不做处理会把空格给渲染出来，将这个配置设为true就会自动帮我们处理空格
        extractCss: isDev, // 默认情况下是不会把vue组件中的css打包到一个css文件中的，这样的话，可以吧vue组件中的css打包到一个css文件夹下
        cssModules: {
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]', // 生成一个编码只有对应的vue文件可以使用
            camelCase: true, // 可以把css  中.main-box  转成驼峰命名的方式
        },
        // hotReload: false, //修改一个内容会自动刷新页面（根据环境变量生成）
    }
}